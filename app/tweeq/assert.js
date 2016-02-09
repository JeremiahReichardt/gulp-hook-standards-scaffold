"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assert;
function assert(value, message) {

  if (!value) throw new Error(message);
}
