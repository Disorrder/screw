import Screw from './Screw';
import * as easing from './easing';

export default Screw;
export { easing };

// export const VERSION = __VERSION;
export const VERSION = typeof __VERSION === 'string' ? __VERSION : 'dev';

function defaultAnimation(time = 0) {
    if (!Screw.useDefaultAnimation) return;
    requestAnimationFrame(defaultAnimation);
    Screw.update(time);
}
defaultAnimation(0);
