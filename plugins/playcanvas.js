export default {
    name: 'playcanvas',
    description: `No need to initialize this plugin. Just use helper functions: setLocalPosition, translateLocal etc.`,
};

function readValue(value) {
    return typeof value === 'function' ? value() : value;
}

export function setLocalPosition(entity, value) {
    return {
        target() {
            this.entity = readValue(entity);
            return this.entity.getLocalPosition();
        },
        to: value,
        setter(target) { this.entity.setLocalPosition(target); }
    };
}
export function translateLocal(entity, value) {
    return {
        target() {
            this.entity = readValue(entity);
            return this.entity.getLocalPosition();
        },
        by: value,
        setter(target) { this.entity.setLocalPosition(target); }
    };
}

export function setLocalEulerAngles(entity, value) {
    return {
        target() {
            this.entity = readValue(entity);
            return this.entity.getLocalEulerAngles();
        },
        to: value,
        setter(target) { this.entity.setLocalEulerAngles(target); }
    };
}
export function rotateLocal(entity, value) {
    return {
        target() {
            this.entity = readValue(entity);
            return this.entity.getLocalEulerAngles();
        },
        by: value,
        setter(target) { this.entity.setLocalEulerAngles(target); }
    };
}

export function setLocalScale(entity, value) {
    return {
        target() {
            this.entity = readValue(entity);
            return this.entity.getLocalScale();
        },
        to: value,
        setter(target) { this.entity.setLocalScale(target); }
    };
}
export function resizeLocal(entity, value) {
    return {
        target() {
            this.entity = readValue(entity);
            return this.entity.getLocalScale();
        },
        by: value,
        setter(target) { this.entity.setLocalScale(target); }
    };
}
