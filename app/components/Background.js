'use strict';

var shell;
var gl;
var createBackground = require('gl-vignette-background');
var tweeq = require('../tweeq/index');

function Background(_shell) {

  shell = _shell;
  gl = _shell.gl;

  this.tweeqable = {
    scale: {default: 0.096, min: 0, max: 1},
    scale2: {default: 0.25, min: -1, max: 1},
    red1: {default: 0.80, min: 0, max: 1},
    green1: {default: 0, min: 0, max: 1},
    blue1: {default: 0.97, min: 0, max: 1},
    red2: {default: 0, min: 0, max: 1},
    green2: {default: 0, min: 0, max: 1},
    blue2: {default: 0.13, min: 0, max: 1},
    smoothing1: {default: 0.20, min: 0, max: 1},
    smoothing2: {default: 0.30, min: 0, max: 1},
    noiseAlpha: {default: 0.15, min: 0, max: 1},
    offset1: {default: -0.05, min: -1, max: 1},
    offset2: {default: -2, min: -2, max: 2}
  };

  this.tweeqIt(false);

  this.background = createBackground(shell.gl);
}

Background.prototype.tweeqIt = function (addControls) {
  if (addControls) {
    var controls = tweeq.container();
    controls.mount(document.querySelector('#controls'));
  }
  for (var key in this.tweeqable) {
    var val = this.tweeqable[key];
    val.value = val.default;
    if (addControls) {
      var obj = {};
      obj.func = function (value) {
        this.val.value = value;
      };
      obj.val = val;
      controls.add(key, val.default, {
        min: val.min,
        max: val.max
      }).changed(obj.func.bind(obj));
    }
  }
};

Background.prototype.render = function () {

  var radius = Math.max(shell.width, shell.height) * this.tweeqable.scale.value;

  this.background.style({
    scale: [1 / shell.width * radius, 1 / shell.height * radius],
    aspect: 1,
    color1: [this.tweeqable.red1.value, this.tweeqable.green1.value, this.tweeqable.blue1.value],
    color2: [this.tweeqable.red2.value, this.tweeqable.green2.value, this.tweeqable.blue2.value],
    smoothing: [this.tweeqable.smoothing1.value, this.tweeqable.smoothing2.value],
    noiseAlpha: this.tweeqable.noiseAlpha.value,
    coloredNoise: true,
    offset: [this.tweeqable.offset1.value, this.tweeqable.offset2.value]
  });
  this.background.draw();
};

module.exports = Background;
