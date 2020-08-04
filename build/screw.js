(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Screw"] = factory();
	else
		root["Screw"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./EventEmitter.ts":
/*!*************************!*\
  !*** ./EventEmitter.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventEmitter; });\nclass EventEmitter {\n    constructor() {\n        this._subscribers = {};\n    }\n    on(name, cb, ctx) {\n        if (!name || !cb)\n            return this;\n        if (!this._subscribers)\n            this._subscribers = {};\n        if (!this._subscribers[name])\n            this._subscribers[name] = [];\n        if (ctx)\n            cb = cb.bind(ctx);\n        this._subscribers[name].push(cb);\n        return this;\n    }\n    emit(name, ...args) {\n        if (!name || !this._subscribers || !this._subscribers[name])\n            return this;\n        this._subscribers[name].forEach(cb => cb.apply(null, args));\n        return this;\n    }\n    off(name, cb) {\n        if (!name)\n            return this;\n        if (cb) {\n            let index = this._subscribers[name].indexOf(cb);\n            if (~index)\n                this._subscribers[name].splice(index, 1);\n        }\n        else {\n            this._subscribers[name].length = 0;\n        }\n        return this;\n    }\n}\n\n\n//# sourceURL=webpack://Screw/./EventEmitter.ts?");

/***/ }),

/***/ "./Screw.ts":
/*!******************!*\
  !*** ./Screw.ts ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Screw; });\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ \"./EventEmitter.ts\");\n/* harmony import */ var _Timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Timer */ \"./Timer.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./utils.ts\");\n/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./easing */ \"./easing.ts\");\n\n\n\n\nclass Screw extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(options = {}) {\n        super();\n        this.name = \"Unnamed\";\n        this.active = false;\n        this.keyframes = [];\n        this.time = 0;\n        this.timeEnd = 0;\n        this.timeScale = 1;\n        this.repeat = 1;\n        this.duration = 0;\n        this.timer = new _Timer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        if (options.name)\n            this.name = options.name;\n        if (options.repeat)\n            this.repeat = options.repeat;\n        if (options.timeScale)\n            this.timeScale = options.timeScale;\n        const Class = this.constructor;\n        Class.items.add(this);\n    }\n    static update(time) {\n        this.items.forEach(item => {\n            item.update(time);\n        });\n    }\n    // Manage keyframes\n    add(value) {\n        // Undocumented experimental way to pass array of these types. Tsss!\n        if (Array.isArray(value)) {\n            value.forEach(v => this.add(v));\n            return this;\n        }\n        if (value instanceof Screw) {\n            this._addScrew(value);\n        }\n        else {\n            this._addFrame(value);\n        }\n        return this;\n    }\n    _addFrame(frame) {\n        frame = Object.assign({ delay: 0, duration: 1000, repeat: 1, easing: _easing__WEBPACK_IMPORTED_MODULE_3__[\"QuadraticInOut\"] }, frame);\n        frame._screw = this;\n        this.keyframes.push(frame);\n        this._calculateTimings();\n    }\n    _addScrew(screw) {\n        // Idea: write screw to object I\n        throw Error('Not implemented method \"_addScrew\"');\n    }\n    _calculateTimings() {\n        this.duration = 0;\n        this.keyframes.forEach((frame, i) => {\n            const prevFrame = this.keyframes[i - 1] || {};\n            let startTime = prevFrame._endTime || 0;\n            if (frame.delay)\n                startTime += frame.delay;\n            if (typeof frame.offset === 'number')\n                startTime = frame.offset;\n            if (frame.offset === 'prev')\n                startTime = prevFrame._startTime || 0;\n            frame._startTime = Math.max(startTime, 0);\n            frame._endTime = startTime + frame.duration * frame.repeat;\n            frame._isBegan = false;\n            frame._isCompleted = false;\n            this.duration = Math.max(frame._endTime, this.duration);\n        });\n    }\n    _resetFramesState() {\n        this.keyframes.forEach((frame) => {\n            frame._isBegan = false;\n            frame._isCompleted = false;\n        });\n    }\n    // Manage time state\n    play() {\n        if (this.active) {\n            throw new Error(`Screw ${this.name} is already playing.`);\n        }\n        if (this.time === 0) {\n            this._calculateTimings();\n            this.promise = new Promise((resolve, reject) => {\n                this.on('complete', resolve);\n                this.on('stop', reject);\n            });\n        }\n        this.active = true;\n        this.timer.start();\n        this.emit('play');\n        this._update(0); // initial _update to trigger 1st frame's begin()\n        return this;\n    }\n    pause() {\n        this.active = false;\n        this.timer.stop();\n        this.emit('pause');\n        return this;\n    }\n    stop() {\n        this.active = false;\n        this.time = 0;\n        this.timer.stop();\n        this._resetFramesState();\n        this.emit('stop');\n        return this;\n    }\n    replay() {\n        this.time = 0;\n        this._resetFramesState();\n        this.emit('replay');\n        return this.play();\n    }\n    update(time) {\n        if (this.active === false)\n            return;\n        this.timer.setTime(time);\n        this._update(this.timer.dt);\n    }\n    _update(dt) {\n        if (!this.active)\n            return;\n        dt *= this.timeScale;\n        // Calculate time\n        if (this.time <= 0) {\n            this.emit('begin');\n        }\n        this.time += dt;\n        // Check repeat\n        if (this.time >= this.duration) {\n            if (--this.repeat > 0) {\n                // replay\n                this.time %= this.duration;\n                this.time = Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"clamp\"])(this.time, 0, this.duration);\n                this._resetFramesState();\n                return;\n            }\n        }\n        // Update frames\n        this.keyframes.forEach((frame) => {\n            if (frame._isCompleted)\n                return;\n            if (this.time >= frame._startTime) {\n                if (!frame._isBegan && (this.time <= frame._endTime || frame.duration === 0))\n                    this._frameBegin(frame);\n                if (dt && this.time <= frame._endTime)\n                    this._frameRun(frame);\n            }\n            if (this.time >= frame._endTime) {\n                // we checked frame is not completed and already began\n                // if (frame._isBegan && !frame._isCompleted) // always true here\n                this._frameComplete(frame);\n            }\n        });\n        this.emit('update', dt);\n        // Check complete\n        if (this.time >= this.duration) {\n            this.emit('complete');\n            this.stop();\n        }\n    }\n    _frameBegin(frame) {\n        if (frame.animate) {\n            frame.animate.forEach(anim => {\n                anim._target = typeof anim.target === 'function' ? anim.target() : anim.target;\n                if (!anim._target)\n                    return console.warn('Animation target is not defined', anim, frame, this);\n                if (!anim.from)\n                    anim.from = {};\n                anim._delta = {};\n                if (anim.by) {\n                    for (const k in anim.by) {\n                        if (anim.from[k] == null)\n                            anim.from[k] = anim._target[k];\n                        anim._delta[k] = anim.by[k];\n                    }\n                }\n                if (anim.to) {\n                    for (const k in anim.to) {\n                        if (anim.from[k] == null)\n                            anim.from[k] = anim._target[k];\n                        anim._delta[k] = anim.to[k] - anim.from[k];\n                    }\n                }\n            });\n        }\n        frame._isBegan = true;\n        if (frame.begin)\n            frame.begin(frame);\n    }\n    _frameRun(frame) {\n        let time = (this.time - frame._startTime) / frame.duration;\n        time = Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"clamp\"])(time, 0, frame.repeat);\n        if (time > 1) { // repeating. TODO: add yoyo\n            time %= 1;\n            if (time === 0)\n                time = 1;\n        }\n        frame._time = time;\n        if (frame.animate) {\n            const t = frame.easing(time);\n            frame.animate.forEach(anim => {\n                if (!anim._target)\n                    return;\n                for (const k in anim._delta) {\n                    anim._target[k] = anim.from[k] + t * anim._delta[k];\n                }\n            });\n        }\n        if (frame.run)\n            frame.run(frame);\n    }\n    _frameComplete(frame) {\n        this._frameRun(frame);\n        frame._isCompleted = true;\n        if (frame.complete)\n            frame.complete(frame);\n    }\n}\nScrew.useDefaultAnimation = true;\nScrew.items = new Set();\n\n\n//# sourceURL=webpack://Screw/./Screw.ts?");

/***/ }),

/***/ "./Timer.ts":
/*!******************!*\
  !*** ./Timer.ts ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Timer; });\nclass Timer {\n    constructor() {\n        this.startTime = 0;\n        this.time = 0;\n        this.dt = 0;\n    }\n    start() {\n        this.startTime = performance.now();\n        ;\n        this.time = this.startTime;\n        this.dt = 0;\n    }\n    stop() {\n        this.startTime = 0;\n        this.time = 0;\n        this.dt = 0;\n    }\n    setTime(time) {\n        this.dt = time - this.time;\n        this.time = time;\n    }\n}\n\n\n//# sourceURL=webpack://Screw/./Timer.ts?");

/***/ }),

/***/ "./easing.ts":
/*!*******************!*\
  !*** ./easing.ts ***!
  \*******************/
/*! exports provided: Linear, QuadraticIn, QuadraticOut, QuadraticInOut, CubicIn, CubicOut, CubicInOut, QuarticIn, QuarticOut, QuarticInOut, QuinticIn, QuinticOut, QuinticInOut, SineIn, SineOut, SineInOut, ExponentialIn, ExponentialOut, ExponentialInOut, CircularIn, CircularOut, CircularInOut, ElasticIn, ElasticOut, ElasticInOut, BackIn, BackOut, BackInOut, BounceIn, BounceOut, BounceInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Linear\", function() { return Linear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuadraticIn\", function() { return QuadraticIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuadraticOut\", function() { return QuadraticOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuadraticInOut\", function() { return QuadraticInOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CubicIn\", function() { return CubicIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CubicOut\", function() { return CubicOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CubicInOut\", function() { return CubicInOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuarticIn\", function() { return QuarticIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuarticOut\", function() { return QuarticOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuarticInOut\", function() { return QuarticInOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuinticIn\", function() { return QuinticIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuinticOut\", function() { return QuinticOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuinticInOut\", function() { return QuinticInOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SineIn\", function() { return SineIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SineOut\", function() { return SineOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SineInOut\", function() { return SineInOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ExponentialIn\", function() { return ExponentialIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ExponentialOut\", function() { return ExponentialOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ExponentialInOut\", function() { return ExponentialInOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CircularIn\", function() { return CircularIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CircularOut\", function() { return CircularOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CircularInOut\", function() { return CircularInOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ElasticIn\", function() { return ElasticIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ElasticOut\", function() { return ElasticOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ElasticInOut\", function() { return ElasticInOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BackIn\", function() { return BackIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BackOut\", function() { return BackOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BackInOut\", function() { return BackInOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BounceIn\", function() { return BounceIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BounceOut\", function() { return BounceOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BounceInOut\", function() { return BounceInOut; });\nfunction Linear(k) {\n    return k;\n}\n;\nfunction QuadraticIn(k) {\n    return k * k;\n}\n;\nfunction QuadraticOut(k) {\n    return k * (2 - k);\n}\n;\nfunction QuadraticInOut(k) {\n    if ((k *= 2) < 1) {\n        return 0.5 * k * k;\n    }\n    return -0.5 * (--k * (k - 2) - 1);\n}\n;\nfunction CubicIn(k) {\n    return k * k * k;\n}\n;\nfunction CubicOut(k) {\n    return --k * k * k + 1;\n}\n;\nfunction CubicInOut(k) {\n    if ((k *= 2) < 1)\n        return 0.5 * k * k * k;\n    return 0.5 * ((k -= 2) * k * k + 2);\n}\n;\nfunction QuarticIn(k) {\n    return k * k * k * k;\n}\n;\nfunction QuarticOut(k) {\n    return 1 - (--k * k * k * k);\n}\n;\nfunction QuarticInOut(k) {\n    if ((k *= 2) < 1)\n        return 0.5 * k * k * k * k;\n    return -0.5 * ((k -= 2) * k * k * k - 2);\n}\n;\nfunction QuinticIn(k) {\n    return k * k * k * k * k;\n}\n;\nfunction QuinticOut(k) {\n    return --k * k * k * k * k + 1;\n}\n;\nfunction QuinticInOut(k) {\n    if ((k *= 2) < 1)\n        return 0.5 * k * k * k * k * k;\n    return 0.5 * ((k -= 2) * k * k * k * k + 2);\n}\n;\nfunction SineIn(k) {\n    if (k === 0)\n        return 0;\n    if (k === 1)\n        return 1;\n    return 1 - Math.cos(k * Math.PI / 2);\n}\n;\nfunction SineOut(k) {\n    if (k === 0)\n        return 0;\n    if (k === 1)\n        return 1;\n    return Math.sin(k * Math.PI / 2);\n}\n;\nfunction SineInOut(k) {\n    if (k === 0)\n        return 0;\n    if (k === 1)\n        return 1;\n    return 0.5 * (1 - Math.cos(Math.PI * k));\n}\n;\nfunction ExponentialIn(k) {\n    return k === 0 ? 0 : Math.pow(1024, k - 1);\n}\n;\nfunction ExponentialOut(k) {\n    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);\n}\n;\nfunction ExponentialInOut(k) {\n    if (k === 0)\n        return 0;\n    if (k === 1)\n        return 1;\n    if ((k *= 2) < 1)\n        return 0.5 * Math.pow(1024, k - 1);\n    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);\n}\n;\nfunction CircularIn(k) {\n    return 1 - Math.sqrt(1 - k * k);\n}\n;\nfunction CircularOut(k) {\n    return Math.sqrt(1 - (--k * k));\n}\n;\nfunction CircularInOut(k) {\n    if ((k *= 2) < 1)\n        return -0.5 * (Math.sqrt(1 - k * k) - 1);\n    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);\n}\n;\nfunction ElasticIn(k) {\n    var s, a = 0.1, p = 0.4;\n    if (k === 0)\n        return 0;\n    if (k === 1)\n        return 1;\n    if (!a || a < 1) {\n        a = 1;\n        s = p / 4;\n    }\n    else\n        s = p * Math.asin(1 / a) / (2 * Math.PI);\n    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));\n}\n;\nfunction ElasticOut(k) {\n    var s, a = 0.1, p = 0.4;\n    if (k === 0)\n        return 0;\n    if (k === 1)\n        return 1;\n    if (!a || a < 1) {\n        a = 1;\n        s = p / 4;\n    }\n    else\n        s = p * Math.asin(1 / a) / (2 * Math.PI);\n    return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);\n}\n;\nfunction ElasticInOut(k) {\n    var s, a = 0.1, p = 0.4;\n    if (k === 0)\n        return 0;\n    if (k === 1)\n        return 1;\n    if (!a || a < 1) {\n        a = 1;\n        s = p / 4;\n    }\n    else\n        s = p * Math.asin(1 / a) / (2 * Math.PI);\n    if ((k *= 2) < 1)\n        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));\n    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;\n}\n;\nfunction BackIn(k) {\n    var s = 1.70158;\n    return k * k * ((s + 1) * k - s);\n}\n;\nfunction BackOut(k) {\n    var s = 1.70158;\n    return --k * k * ((s + 1) * k + s) + 1;\n}\n;\nfunction BackInOut(k) {\n    var s = 1.70158 * 1.525;\n    if ((k *= 2) < 1)\n        return 0.5 * (k * k * ((s + 1) * k - s));\n    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);\n}\n;\nfunction BounceIn(k) {\n    return 1 - BounceOut(1 - k);\n}\n;\nfunction BounceOut(k) {\n    if (k < (1 / 2.75)) {\n        return 7.5625 * k * k;\n    }\n    else if (k < (2 / 2.75)) {\n        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;\n    }\n    else if (k < (2.5 / 2.75)) {\n        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;\n    }\n    else {\n        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;\n    }\n}\n;\nfunction BounceInOut(k) {\n    if (k < 0.5)\n        return BounceIn(k * 2) * 0.5;\n    return BounceOut(k * 2 - 1) * 0.5 + 0.5;\n}\n;\n\n\n//# sourceURL=webpack://Screw/./easing.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! exports provided: default, easing, VERSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VERSION\", function() { return VERSION; });\n/* harmony import */ var _Screw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Screw */ \"./Screw.ts\");\n/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./easing */ \"./easing.ts\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"easing\", function() { return _easing__WEBPACK_IMPORTED_MODULE_1__; });\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_Screw__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n// export const VERSION = __VERSION;\nconst VERSION =  true ? \"1.0.0\" : undefined;\nfunction defaultAnimation(time = 0) {\n    if (!_Screw__WEBPACK_IMPORTED_MODULE_0__[\"default\"].useDefaultAnimation)\n        return;\n    requestAnimationFrame(defaultAnimation);\n    _Screw__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update(time);\n    // console.log('tick', time);\n}\ndefaultAnimation(0);\n\n\n//# sourceURL=webpack://Screw/./index.ts?");

/***/ }),

/***/ "./utils.ts":
/*!******************!*\
  !*** ./utils.ts ***!
  \******************/
/*! exports provided: clamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clamp\", function() { return clamp; });\n// Math\nfunction clamp(value, min, max) {\n    return Math.max(min, Math.min(value, max));\n}\n;\n\n\n//# sourceURL=webpack://Screw/./utils.ts?");

/***/ })

/******/ });
});