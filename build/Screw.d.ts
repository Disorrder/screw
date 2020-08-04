import EventEmitter from './EventEmitter';
import Timer from "./Timer";
import * as easing from './easing';
export interface IKeyframe {
    offset?: number | 'prev';
    delay?: number;
    duration: number;
    repeat: number;
    easing: easing.Easing;
    animate: IAnimatable[];
    run?: (frame: IKeyframe) => void;
    begin?: (frame: IKeyframe) => void;
    complete?: (frame: IKeyframe) => void;
    _screw: Screw;
    _time: number;
    _startTime: number;
    _endTime: number;
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
    static useDefaultAnimation: boolean;
    static items: Set<Screw>;
    static update(time: number): void;
    name: string;
    active: boolean;
    keyframes: IKeyframe[];
    time: number;
    timeEnd: number;
    timeScale: number;
    repeat: number;
    duration: number;
    timer: Timer;
    promise?: Promise<void>;
    constructor(options?: Partial<IOptions>);
    add(value: IKeyframe | Screw): this;
    private _addFrame;
    private _addScrew;
    private _calculateTimings;
    private _resetFramesState;
    play(): this;
    pause(): this;
    stop(): this;
    replay(): this;
    update(time: number): void;
    private _update;
    private _frameBegin;
    private _frameRun;
    private _frameComplete;
}
