'use strict';

var shell = require('gl-now')();
var createBackground = require('gl-vignette-background');
var tweeq = require('../tweeq/index');

function Background() {

  this.tweeqable = {
    scale1:{ default: 0.25, min: -1, max: 1 },
    aspect:{ default: 1, min: 0, max: 1 },
    scale2:{ default: 0.25, min: -1, max: 1 },
    red1: {  default: 1, min: 0, max: 1 },
    green1: { default: 1, min: 0, max: 1 },
    blue1: { default: 1, min: 0, max: 1 },
    red2: {  default: 0, min: 0, max: 1 },
    green2: { default: 0, min: 0, max: 1 },
    blue2: { default: 0, min: 0, max: 1 },
    smoothing1: { default: 0.10, min: 0, max: 1 },
    smoothing2: { default: 0.5, min: 0, max: 1 },
    noiseAlpha: { default: 0, min: 0, max: 1 },
    offset1: { default: -0.05, min: -1, max: 1 },
    offset2: { default: -0.15, min: -1, max: 1 }
  };

  var controls = tweeq.container();
  controls.mount(document.querySelector('#controls'));

  for ( var key in this.tweeqable ) {
    var val = this.tweeqable[key];
    val.value = val.default;
    var obj = {};
    obj.func = function( value ){
      this.val.value = value;
    };
    obj.val = val;
    controls.add( key, val.default, { min: val.min, max: val.max }).changed( obj.func.bind( obj ) );
  }

  shell.on('gl-init', this.init.bind( this ));
  shell.on('gl-render', this.render.bind( this ));
}

Background.prototype.init = function() {
  this.background = createBackground(shell.gl);
};

Background.prototype.render = function() {
  this.background.style({
    scale: [this.tweeqable.scale1.value, this.tweeqable.scale2.value],
    aspect: this.tweeqable.aspect.value,
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
