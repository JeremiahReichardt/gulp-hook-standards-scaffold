'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boolean = require('./boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _numberGeneric = require('./number-generic');

var _numberGeneric2 = _interopRequireDefault(_numberGeneric);

var _numberSlider = require('./number-slider');

var _numberSlider2 = _interopRequireDefault(_numberSlider);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

var _vector = require('./vector');

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

exports.default = {

  boolean: _boolean2.default,
  button: _button2.default,
  slider: _numberSlider2.default,
  number: _numberGeneric2.default,
  string: _string2.default,
  vector: _vector2.default

};
