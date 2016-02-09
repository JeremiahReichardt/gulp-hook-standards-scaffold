"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.off = off;
exports.once = once;
function on(target, type, handler) {

  target.addEventListener(type, handler);
}

function off(target, type, handler) {

  target.removeEventListener(type, handler);
}

function once(target, type, handler) {

  var closure = function closure(event) {
    handler.call(target, event);
    target.removeEventListener(type, closure);
  };

  target.addEventListener(type, closure);
}

exports.default = { on: on, off: off, once: once };