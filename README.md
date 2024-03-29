# Screw

I'm not _screwing_ you, this is really small library for simple animations. Inspired by Tweenjs and animejs.

## Install

```
npm i --save @disorrder/screw
```

```
yarn add @disorrder/screw
```

## Just show me a code

With these instructions you won't _screw up_:

```javascript
import Screw, { easing } from '@disorrder/screw';

const entity = {
    visible: false,
    position: { x: 10, y: 10, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    _scale: { x: 1, y: 1 },
    getScale() { return this.scale; }
    setScale(value) { this._scale = value; }
};

const animation = new Screw()
.add({ // a keyframe
    duration: 1000, // by default
    easing: easing.QuadraticInOut, // by default
    animate: [
        {
            target: entity.position, // pick a target
            to: { x: 20 } // and set new value
        },
        { // one more simultaneous action
            target: entity.rotation,
            by: { x: 2 * Math.PI } // set relative shift instead of exact value
        }
    ],
    onBegin() {
        // run some code before keyframe start
        entity.visible = true;
    }
})
.add({
    delay: 500, // next keyframe will start after 500 ms after previous end
    duration: 500,
    animate: [{
        target() { return entity.getScale() },
        to: { x: 0, y: 0 }
    }],
    onUpdate(frame) {
        // Calls every animation update
        const scale = frame.animate[0]._target;
        entity.setScale(scale);
    },
    onComplete() {
        entity.visible = false;
    }
})
.play(); // Don't forget to start animation
```

### This animation was just a little screw in your big bucket of screws!

## API Reference

`soon or later`

## Forget about nails, just screw it:

### Screw Playcanvas

`soon`

### Screw Three.js

`later`

### Screw Babylon

`never?`

## Publish

- `yarn test`
- add commit for please-release

```bash
git commit --allow-empty -m "chore: release 2.0.0" -m "Release-As: 2.0.0"
```

- `yarn release` (use `release:minor` or `-- release-as major` if necessary, default is patch version)
- follow next instructions in console (Run `git push --follow-tags origin master && npm publish` to publish)
