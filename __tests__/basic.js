import Screw from '..'; // to test build
// import Screw from '../src'; // to change sources while testing

const TIME_ERROR = 35;

test('basic example', (done) => {
    let initTime = performance.now();
    const target = { x: 10, y: 10 };
    const animation = new Screw()
    .add({
        animate: [{
            target,
            to: {x: 20},
            by: {y: 10}
        }],
        begin(frame) {
            const dt = performance.now() - initTime;
            expect(dt).toBeLessThan(2);
            
            const target = frame.animate[0]._target;
            expect(target.x).toBe(10);
            expect(target.y).toBe(10);
        },
        complete(frame) {
            const dt = performance.now() - initTime;
            expect(dt).toBeLessThan(1000 + TIME_ERROR);
    
            const target = frame.animate[0]._target;
            expect(target.x).toBe(20);
            expect(target.y).toBe(20);
        },
    })
    .add({
        delay: 200,
        duration: 300,
        animate: [{
            target,
            by: {x: -20}
        }],
        begin() {
            const dt = performance.now() - initTime;
            expect(dt).toBeLessThan(1200 + TIME_ERROR);
            
            expect(target.x).toBe(20);
            // y will be modified in next frame
        },
        complete() {
            const dt = performance.now() - initTime;
            expect(dt).toBeLessThan(1500 + TIME_ERROR);
            
            expect(target.x).toBe(0);
        }
    })
    .add({
        delay: -500,
        duration: 500,
        animate: [{
            target,
            to: {y: 0}
        }],
        begin() {
            const dt = performance.now() - initTime;
            expect(dt).toBeLessThan(1000 + TIME_ERROR);

            expect(target.x).toBe(20);
            expect(target.y).toBe(20);
        },
        complete() {
            const dt = performance.now() - initTime;
            expect(dt).toBeLessThan(1600 + TIME_ERROR);

            expect(target.x).toBe(0);
            expect(target.y).toBe(0);
        }
    })
    .add({
        offset: 1100,
        duration: 0,
        begin() {
            const dt = performance.now() - initTime;
            expect(dt).toBeLessThan(1100 + TIME_ERROR);
        },
        complete() {
            const dt = performance.now() - initTime;
            expect(dt).toBeLessThan(1100 + TIME_ERROR);
        }
    })
    .add({
        offset: 'prev',
        duration: 0,
        begin() {
            const dt = performance.now() - initTime;
            expect(dt).toBeLessThan(1100 + TIME_ERROR);
        },
        complete() {
            const dt = performance.now() - initTime;
            expect(dt).toBeLessThan(1100 + TIME_ERROR);
        }
    })
    .play();

    animation.on('complete', done);
});