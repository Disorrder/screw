import EventEmitter from "./EventEmitter";
import Timer from "./timer";
import { clamp } from "./utils";
import * as easing from "./easing";
import { IPlugin, IKeyframe, IScrewConstructorOptions } from "./types";

export default class Screw extends EventEmitter {
  static plugins = new Set<IPlugin>();
  static plugin(plugin: IPlugin) {
    this.plugins.add(plugin);
    if (plugin.mutateClass) plugin.mutateClass(this);
  }

  static screws = new Set<Screw>();
  static rafId?: number;

  static register(screw: Screw) {
    this.screws.add(screw);
    if (!this.rafId) {
      this.update(0);
    }
  }

  static remove(screw: Screw) {
    this.screws.delete(screw);
  }

  static update(time: number): void {
    this.rafId = requestAnimationFrame(this.update.bind(this));
    this.screws.forEach((item) => {
      item.update(time);
    });
  }

  static destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = undefined;
    this.screws.clear();
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

  constructor(options: Partial<IScrewConstructorOptions> = {}) {
    super();
    if (options.name) this.name = options.name;
    if (options.repeat) this.repeat = options.repeat;
    if (options.timeScale) this.timeScale = options.timeScale;
  }

  // Manage keyframes

  add(value: Partial<IKeyframe> | Screw): this {
    // Undocumented experimental way to pass array of these types. Tsss!
    if (Array.isArray(value)) {
      value.forEach((v) => this.add(v));
      return this;
    }

    if (value instanceof Screw) {
      this._addScrew(value);
    } else {
      this._addFrame(value);
    }
    return this;
  }

  private _addFrame(frame: Partial<IKeyframe>) {
    const newFrame: IKeyframe = {
      delay: 0,
      duration: 1000,
      repeat: 1,
      easing: easing.QuadraticInOut,
      _screw: this,
      ...frame,
    } as IKeyframe;
    this.keyframes.push(newFrame);
    this._calculateTimings();
  }

  private _addScrew(_screw: Screw) {
    // Idea: write option screw to object IKeyframe
    throw Error('Not implemented method "_addScrew"'); // TODO: Not implemented method "_addScrew"
  }

  private _calculateTimings() {
    this.duration = 0;
    this.keyframes.forEach((frame, i) => {
      const prevFrame: Partial<IKeyframe> = this.keyframes[i - 1];
      let startTime = prevFrame?._endTime || 0;

      const { offset, delay = 0, duration = 1000, repeat = 1 } = frame;

      if (offset === "prev") {
        startTime = prevFrame?._startTime || 0;
      } else if (typeof offset === "number") {
        startTime = offset;
      } else {
        startTime += delay;
      }

      frame._startTime = Math.max(startTime, 0);
      frame._endTime = startTime + duration * repeat;
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
      throw new Error(`Screw ${this.name} is already playing.`);
    }
    if (this.time === 0) {
      this._calculateTimings();
      this.promise = new Promise((resolve, reject) => {
        this.on("complete", resolve);
        this.on("stop", reject);
      });
    }

    const Class = this.constructor as typeof Screw;
    Class.register(this);

    this.active = true;
    this.timer.start();
    this.emit("play");
    this._update(0); // initial _update to trigger 1st frame's begin()

    return this;
  }

  pause() {
    this.active = false;
    this.timer.stop();
    this.emit("pause");
    return this;
  }

  stop() {
    this.active = false;
    this.time = 0;
    this.timer.stop();
    this._resetFramesState();
    this.emit("stop");

    const Class = this.constructor as typeof Screw;
    Class.remove(this);

    return this;
  }

  replay() {
    this.time = 0;
    this._resetFramesState();
    this.emit("replay");
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
      this.emit("begin");
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
        if (
          !frame._isBegan &&
          (this.time <= frame._endTime || frame.duration === 0)
        ) {
          this._frameBegin(frame);
        }
        if (dt && this.time <= frame._endTime) {
          this._frameRun(frame);
        }
      }

      if (this.time >= frame._endTime) {
        // we checked frame is not completed and already began
        // if (frame._isBegan && !frame._isCompleted) // always true here
        this._frameComplete(frame);
      }
    });

    this.emit("update", dt);

    // Check complete
    if (this.time >= this.duration) {
      this.emit("complete");
      this.stop();
    }
  }

  private _frameBegin(frame: IKeyframe) {
    if (frame.animate) {
      frame.animate.forEach((anim) => {
        anim._target =
          typeof anim.target === "function" ? anim.target() : anim.target;
        if (!anim._target)
          return console.warn(
            "Animation target is not defined",
            anim,
            frame,
            this
          );
        if (!anim.from) anim.from = {};
        anim._delta = {};

        if (anim.by) {
          // use getOwnPropertyNames to avoid properties from proto
          Object.getOwnPropertyNames(anim.by).forEach((k) => {
            if (typeof anim.by[k] !== "number") return;
            if (anim.from[k] == null) anim.from[k] = anim._target[k];
            anim._delta[k] = anim.by[k];
          });
        }
        if (anim.to) {
          Object.getOwnPropertyNames(anim.to).forEach((k) => {
            if (typeof anim.to[k] !== "number") return;
            if (anim.from[k] == null) anim.from[k] = anim._target[k];
            anim._delta[k] = anim.to[k] - anim.from[k];
          });
        }
      });
    }
    frame._isBegan = true;
    if (frame.onBegin) frame.onBegin(frame);
  }

  private _frameRun(frame: IKeyframe) {
    let time = (this.time - frame._startTime) / frame.duration;
    time = clamp(time, 0, frame.repeat);

    if (time > 1) {
      // repeating
      // TODO: add yoyo
      time %= 1;
      if (time === 0) time = 1; //?
    }

    frame._time = time;
    if (frame.animate) {
      const t = frame.easing(time);
      frame.animate.forEach((anim) => {
        if (!anim._target) return;
        for (const k in anim._delta) {
          anim._target[k] = anim.from[k] + t * anim._delta[k];
        }
        if (anim.setter) anim.setter(anim._target);
      });
    }

    if (frame.onUpdate) frame.onUpdate(frame);
    if (frame.run) frame.run(frame);
  }

  private _frameComplete(frame: IKeyframe) {
    this._frameRun(frame);
    frame._isCompleted = true;
    if (frame.onComplete) frame.onComplete(frame);
  }
}
