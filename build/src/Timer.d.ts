export default class Timer {
    startTime: number;
    time: number;
    dt: number;
    start(): void;
    stop(): void;
    setTime(time: number): void;
}
