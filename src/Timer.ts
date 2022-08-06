export default class Timer {
  startTime = 0;
  time = 0;
  dt = 0;

  start() {
    this.startTime = performance.now();
    this.time = this.startTime;
    this.dt = 0;
  }

  stop() {
    this.startTime = 0;
    this.time = 0;
    this.dt = 0;
  }

  setTime(time: number) {
    this.dt = time - this.time;
    this.time = time;
  }
}
