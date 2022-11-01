import Screw from "./screw"; // to test build
// import Screw from '../src'; // to change sources while testing

const TIME_ERROR = 35;

// at top
declare const global: any;

// before test
global.requestAnimationFrame = (cb: any) =>
  setImmediate(() => cb(performance.now()));

// test
test("basic example", (done) => {
  let initTime = performance.now();
  console.log("init", initTime);

  const target = { x: 10, y: 10 };
  const animation = new Screw()
    .add({
      animate: [
        {
          target,
          to: { x: 20 },
          by: { y: 10 },
        },
      ],
      onBegin(frame) {
        const dt = performance.now() - initTime;
        expect(dt).toBeLessThan(TIME_ERROR);
        console.log("Frame 1 onBegin", dt);

        const target = frame.animate[0]._target;
        expect(target.x).toBe(10);
        expect(target.y).toBe(10);
      },
      onComplete(frame) {
        const dt = performance.now() - initTime;
        expect(dt).toBeLessThan(1000 + TIME_ERROR);
        console.log("Frame 1 onComplete", dt);

        const target = frame.animate[0]._target;
        expect(target.x).toBe(20);
        expect(target.y).toBe(20);
      },
    })
    .add({
      delay: 200,
      duration: 300,
      animate: [
        {
          target,
          by: { x: -20 },
        },
      ],
      onBegin() {
        const dt = performance.now() - initTime;
        expect(dt).toBeLessThan(1200 + TIME_ERROR);
        console.log("Frame 2 onBegin", dt);

        expect(target.x).toBe(20);
        // expect(target.y).toBe(20);
        // y will be modified in next frame
      },
      onComplete() {
        const dt = performance.now() - initTime;
        expect(dt).toBeLessThan(1500 + TIME_ERROR);
        console.log("Frame 2 onComplete", dt);

        expect(target.x).toBe(0);
        // expect(target.y).toBe(20);
      },
    })
    .add({
      delay: -500,
      duration: 500,
      animate: [
        {
          target,
          to: { y: 0 },
        },
      ],
      onBegin() {
        const dt = performance.now() - initTime;
        expect(dt).toBeLessThan(1000 + TIME_ERROR);
        console.log("Frame 3 onBegin", dt);

        expect(target.x).toBe(20);
        expect(target.y).toBe(20);
      },
      onComplete() {
        const dt = performance.now() - initTime;
        expect(dt).toBeLessThan(1600 + TIME_ERROR);
        console.log("Frame 3 onComplete", dt);

        expect(target.x).toBe(0);
        expect(target.y).toBe(0);
      },
    })
    .add({
      offset: 1100,
      duration: 0,
      onBegin() {
        const dt = performance.now() - initTime;
        expect(dt).toBeLessThan(1100 + TIME_ERROR);
        console.log("Frame 4 onBegin", dt);
      },
      onComplete() {
        const dt = performance.now() - initTime;
        expect(dt).toBeLessThan(1100 + TIME_ERROR);
        console.log("Frame 4 onComplete", dt);
      },
    })
    .add({
      offset: "prev",
      duration: 0,
      onBegin() {
        const dt = performance.now() - initTime;
        expect(dt).toBeLessThan(1100 + TIME_ERROR);
        console.log("Frame 5 onBegin", dt);
      },
      onComplete() {
        const dt = performance.now() - initTime;
        expect(dt).toBeLessThan(1100 + TIME_ERROR);
        console.log("Frame 5 onComplete", dt);
      },
    })
    .play();

  animation.on("complete", () => {
    const dt = performance.now() - initTime;
    expect(dt).toBeLessThan(1600 + TIME_ERROR);
    console.log("Animation onComplete", dt);
    done();
  });
});
