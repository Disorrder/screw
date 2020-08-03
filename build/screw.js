!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Screw=e():t.Screw=e()}(window,(function(){return function(t){var e={};function i(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(s,r,function(e){return t[e]}.bind(null,r));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e),i.d(e,"VERSION",(function(){return a})),i.d(e,"items",(function(){return o})),i.d(e,"update",(function(){return h})),i.d(e,"default",(function(){return m}));class s{constructor(){this.startTime=0,this.time=0,this.dt=0}start(){this.startTime=performance.now(),this.time=this.startTime,this.dt=0}stop(){this.startTime=0,this.time=0,this.dt=0}setTime(t){this.dt=t-this.time,this.time=t}}function r(t,e,i){return Math.max(e,Math.min(t,i))}function n(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}const a="1.0.0",o=new Set;function h(t){o.forEach(e=>{e.update(t)})}!function t(e=0){m.useDefaultAnimation&&(requestAnimationFrame(t),h(e))}(0);class m extends class{constructor(){this._subscribers={}}on(t,e,i){return t&&e?(this._subscribers||(this._subscribers={}),this._subscribers[t]||(this._subscribers[t]=[]),i&&(e=e.bind(i)),this._subscribers[t].push(e),this):this}emit(t,...e){return t&&this._subscribers&&this._subscribers[t]?(this._subscribers[t].forEach(t=>t.apply(null,e)),this):this}off(t,e){if(!t)return this;if(e){let i=this._subscribers[t].indexOf(e);~i&&this._subscribers[t].splice(i,1)}else this._subscribers[t].length=0;return this}}{constructor(t={}){super(),this.name="Unnamed",this.active=!1,this.keyframes=[],this.time=0,this.timeEnd=0,this.timeScale=0,this.repeat=1,this.duration=0,this.timer=new s,t.name&&(this.name=t.name),t.repeat&&(this.repeat=t.repeat),t.timeScale&&(this.timeScale=t.timeScale)}add(t){return Array.isArray(t)?(t.forEach(t=>this.add(t)),this):(t instanceof m?this._addScrew(t):this._addFrame(t),this)}_addFrame(t){(t=Object.assign({delay:0,duration:1e3,repeat:1,easing:n},t))._screw=this,this.keyframes.push(t),this._calculateTimings()}_addScrew(t){throw Error('Not implemented method "_addScrew"')}_calculateTimings(){this.duration=0,this.keyframes.forEach((t,e)=>{const i=this.keyframes[e-1]||{};let s=i._endTime||0;t.delay&&(s+=t.delay),"number"==typeof t.offset&&(s=t.offset),"prev"===t.offset&&(s=i._startTime||0),t._startTime=Math.max(s,0),t._endTime=s+t.duration*t.repeat,t._isBegan=!1,t._isCompleted=!1,this.keyframes.push(t),this.duration=Math.max(t._endTime,this.duration)})}_resetFramesState(){this.keyframes.forEach(t=>{t._isBegan=!1,t._isCompleted=!1})}play(){if(this.active)throw new Error(`Screw ${this.name} is already playing.`);return 0===this.time&&(this._calculateTimings(),this.promise=new Promise((t,e)=>{this.on("complete",t),this.on("stop",e)})),this.active=!0,this.timer.start(),this.emit("play"),this._update(0),this}pause(){return this.active=!1,this.timer.stop(),this.emit("pause"),this}stop(){return this.active=!1,this.time=0,this.timer.stop(),this._resetFramesState(),this.emit("stop"),this}replay(){return this.time=0,this._resetFramesState(),this.emit("replay"),this.play()}update(t){!1!==this.active&&(this.timer.setTime(t),this._update(this.timer.dt))}_update(t){if(this.active){if(t*=this.timeScale,this.time<=0&&this.emit("begin"),this.time+=t,this.time>=this.duration&&--this.repeat>0)return this.time%=this.duration,this.time=r(this.time,0,this.duration),void this._resetFramesState();this.keyframes.forEach(e=>{e._isCompleted||(this.time>=e._startTime&&(!e._isBegan&&(this.time<=e._endTime||0===e.duration)&&this._frameBegin(e),t&&this.time<=e._endTime&&this._frameRun(e)),this.time>=e._endTime&&this._frameComplete(e))}),this.emit("update",t),this.time>=this.duration&&(this.emit("complete"),this.stop())}}_frameBegin(t){t.animate&&t.animate.forEach(e=>{if(e._target="function"==typeof e.target?e.target():e.target,!e._target)return console.warn("Animation target is not defined",e,t,this);if(e.from||(e.from={}),e._delta={},e.by)for(const t in e.by)null==e.from[t]&&(e.from[t]=e._target[t]),e._delta[t]=e.by[t];if(e.to)for(const t in e.to)null==e.from[t]&&(e.from[t]=e._target[t]),e._delta[t]=e.to[t]-e.from[t]}),t._isBegan=!0,t.begin&&t.begin(t)}_frameRun(t){let e=(this.time-t._startTime)/t.duration;if(e=r(e,0,t.repeat),e>1&&(e%=1,0===e&&(e=1)),t._time=e,t.animate){const i=t.easing(e);t.animate.forEach(t=>{if(t._target)for(const e in t._delta)t._target[e]=t.from[e]+i*t._delta[e]})}t.run&&t.run(t)}_frameComplete(t){this._frameRun(t),t._isCompleted=!0,t.complete&&t.complete(t)}}m.useDefaultAnimation=!0}])}));