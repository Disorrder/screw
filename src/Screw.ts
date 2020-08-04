import EventEmitter from './EventEmitter';
import Timer from "./Timer";
import { clamp } from "./utils";
import * as easing from './easing';


export interface IKeyframe {
    offset?: number|'prev'; // Absolute screw time from 0. 'prev' means frame will begin simultaneously with previous frame.
    delay?: number; // Delay after prev frame completed. Can be negative. Don't use together with offset.
    duration: number;
    repeat: number;
    easing: easing.Easing;
    animate: IAnimatable[];

    run?: (frame: IKeyframe) => void;
    begin?: (frame: IKeyframe) => void;
    complete?: (frame: IKeyframe) => void;

    _screw: Screw,
    _time: number; // frame current time [0 .. 1]
    _startTime: number; // Absolute screw time from 0. Affected by prev frame and delay
    _endTime: number; // Affected by _startTime and duration
    _isBegan: boolean;
    _isCompleted: boolean;
}

export interface IAnimatable {
    target: any;
    from?: any;
    to?: any;
    by?: any;

    _target: any;
    _delta: any;
}

export interface IOptions {
    name: string;
    repeat: number;
    timeScale: number;
}

export default class Screw extends EventEmitter {
    static useDefaultAnimation = true;
    static items = new Set<Screw>();
    static update(time: number): void {
        this.items.forEach(item => {
            item.update(time);
        });
    }


    name = "Unnamed";
    active = false;
    keyframes: IKeyframe[] = [];

    time = 0;
    timeEnd = 0;
    timeScale = 1;
    repeat = 1;
    duration = 0;

    timer = new Timer();
    promise?: Promise<void>; // Don't think it's necessary

    constructor(options: Partial<IOptions> = {}) {
        super();
        if (options.name) this.name = options.name;
        if (options.repeat) this.repeat = options.repeat;
        if (options.timeScale) this.timeScale = options.timeScale;
        
        const Class = this.constructor as typeof Screw;
        Class.items.add(this);
    }

    // Manage keyframes

    add(value: IKeyframe|Screw): this {
        // Undocumented experimental way to pass array of these types. Tsss!
        if (Array.isArray(value)) {
            value.forEach(v => this.add(v));
            return this;
        }

        if (value instanceof Screw) {
            this._addScrew(value);
        } else {
            this._addFrame(value);
        }
        return this;
    }

    private _addFrame(frame: IKeyframe) {
        frame = {
            delay: 0,
            duration: 1000,
            repeat: 1,
            easing: easing.QuadraticInOut,
            ...frame
        };
        frame._screw = this;
        this.keyframes.push(frame);
        this._calculateTimings();
    }

    private _addScrew(screw: Screw) {
        // Idea: write screw to object I
        throw Error('Not implemented method "_addScrew"');
    }

    private _calculateTimings() {
        this.duration = 0;
        this.keyframes.forEach((frame, i) => {
            const prevFrame: Partial<IKeyframe> = this.keyframes[i - 1] || {};
            let startTime = prevFrame._endTime || 0;
            if (frame.delay) startTime += frame.delay;
            if (typeof frame.offset === 'number') startTime = frame.offset;
            if (frame.offset === 'prev') startTime = prevFrame._startTime || 0;
            frame._startTime = Math.max(startTime, 0);
            frame._endTime = startTime + frame.duration * frame.repeat;
            frame._isBegan = false;
            frame._isCompleted = false;
    
            this.duration = Math.max(frame._endTime, this.duration);    
        });
    }

    private _resetFramesState() {
        this.keyframes.forEach((frame) => {
            frame._isBegan = false;
            frame._isCompleted = false;
        });
    }


    // Manage time state

    play() {
        if (this.active) {
            throw new Error(`Screw ${this.name} is already playing.`)
        }
        if (this.time === 0) {
            this._calculateTimings();
            this.promise = new Promise((resolve, reject) => {
                this.on('complete', resolve);
                this.on('stop', reject);
            });
        }
        this.active = true;
        this.timer.start();
        this.emit('play');
        this._update(0); // initial _update to trigger 1st frame's begin()
        
        return this;
    }

    pause() {
        this.active = false;
        this.timer.stop();
        this.emit('pause');
        return this;
    }

    stop() {
        this.active = false;
        this.time = 0;
        this.timer.stop();
        this._resetFramesState();
        this.emit('stop');
        return this;
    }

    replay() {
        this.time = 0;
        this._resetFramesState();
        this.emit('replay');
        return this.play();
    }

    update(time: number) {
        if (this.active === false) return;
        this.timer.setTime(time);
        this._update(this.timer.dt);
    }


    private _update(dt: number) {
        if (!this.active) return;
        dt *= this.timeScale;

        // Calculate time
        if (this.time <= 0) {
            this.emit('begin');
        }
        this.time += dt;

        // Check repeat
        if (this.time >= this.duration) {
            if (--this.repeat > 0) {
                // replay
                this.time %= this.duration;
                this.time = clamp(this.time, 0, this.duration);
                this._resetFramesState();
                return;
            }
        }

        // Update frames
        this.keyframes.forEach((frame) => {
            if (frame._isCompleted) return;

            if (this.time >= frame._startTime) {
                if (!frame._isBegan && (this.time <= frame._endTime || frame.duration === 0)) this._frameBegin(frame);
                if (dt && this.time <= frame._endTime) this._frameRun(frame);
            }

            if (this.time >= frame._endTime) {
                // we checked frame is not completed and already began
                // if (frame._isBegan && !frame._isCompleted) // always true here
                this._frameComplete(frame);
            }
        });

        this.emit('update', dt);

        // Check complete
        if (this.time >= this.duration) {
            this.emit('complete');
            this.stop();
        }
    }

    private _frameBegin(frame: IKeyframe) {
        if (frame.animate) {
            frame.animate.forEach(anim => {
                anim._target = typeof anim.target === 'function' ? anim.target() : anim.target;
                if (!anim._target) return console.warn('Animation target is not defined', anim, frame, this);
                if (!anim.from) anim.from = {};
                anim._delta = {};

                if (anim.by) {
                    for (const k in anim.by) {
                        if (anim.from[k] == null) anim.from[k] = anim._target[k];
                        anim._delta[k] = anim.by[k];
                    }
                }
                if (anim.to) {
                    for (const k in anim.to) {
                        if (anim.from[k] == null) anim.from[k] = anim._target[k];
                        anim._delta[k] = anim.to[k] - anim.from[k];
                    }
                }
            });
        }
        frame._isBegan = true;
        if (frame.begin) frame.begin(frame);
    }

    private _frameRun(frame: IKeyframe) {
        let time = (this.time - frame._startTime) / frame.duration;
        time = clamp(time, 0, frame.repeat);

        if (time > 1) { // repeating. TODO: add yoyo
            time %= 1;
            if (time === 0) time = 1;
        }

        frame._time = time;
        if (frame.animate) {
            const t = frame.easing(time);
            frame.animate.forEach(anim => {
                if (!anim._target) return;
                for (const k in anim._delta) {
                    anim._target[k] = anim.from[k] + t * anim._delta[k];
                }
            });
        }

        if (frame.run) frame.run(frame);
    }

    private _frameComplete(frame: IKeyframe) {
        this._frameRun(frame);
        frame._isCompleted = true;
        if (frame.complete) frame.complete(frame);
    }
}
