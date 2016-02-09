'use strict';

var shell = require('gl-now')();
var createBackground = require('gl-vignette-background');
var tweeq = require('../tweeq/index');

function Background() {

  this.background = undefined;
  this.scale = [0.25, 0.25];
  this.aspect = 1;
  this.color1 = [1, 1, 1];
  this.color2 = [0, 0, 0];
  this.smoothing = [0.10, 0.5];
  this.noiseAlpha = 0;
  this.coloredNoise = true;
  this.offset = [-0.05, -0.15];

  var controls = tweeq.container();
  controls.mount(document.querySelector('#controls'));
  controls.add('Scale 1', 0.5, { min: 0, max: 1 }).changed( this.tweeqScale1.bind( this ));
  controls.add('Scale 2', 0.5, { min: 0, max: 1 }).changed( this.tweeqScale2.bind( this ));
  controls.add('Aspect', 0.5, { min: 0, max: 1 }).changed( this.tweeqAspect.bind( this ));
  controls.add('Red 1', 0.5, { min: 0, max: 1 }).changed( this.tweeqColor1R.bind( this ));
  controls.add('Green 1', 0.5, { min: 0, max: 1 }).changed( this.tweeqColor1G.bind( this ));
  controls.add('Blue 1', 0.5, { min: 0, max: 1 }).changed( this.tweeqColor1B.bind( this ));
  controls.add('Red 2', 0.5, { min: 0, max: 1 }).changed( this.tweeqColor2R.bind( this ));
  controls.add('Green 2', 0.5, { min: 0, max: 1 }).changed( this.tweeqColor2G.bind( this ));
  controls.add('Blue 2', 0.5, { min: 0, max: 1 }).changed( this.tweeqColor2B.bind( this ));
  controls.add('Smoothing 1', 0.5, { min: 0, max: 1 }).changed( this.tweeqSmoothing1.bind( this ));
  controls.add('Smoothing 2', 0.5, { min: 0, max: 1 }).changed( this.tweeqSmoothing2.bind( this ));
  controls.add('Offset 1', 0.5, { min: -1, max: 1 }).changed( this.tweeqOffset1.bind( this ));
  controls.add('Offset 2', 0.5, { min: -1, max: 1 }).changed( this.tweeqOffset2.bind( this ));

  shell.on('gl-init', this.init.bind( this ));
  shell.on('gl-render', this.render.bind( this ));
}

Background.prototype.init = function() {
  this.background = createBackground(shell.gl);
};

Background.prototype.render = function() {
  this.background.style({
    // xy scale
    scale: this.scale,
    // aspect ratio for vignette
    aspect: this.aspect,
    // radial gradient colors A->B
    color1: this.color1,
    color2: this.color2,
    // smoothstep low/high input
    smoothing: this.smoothing,
    // % opacity of noise grain (0 -> disabled)
    noiseAlpha: this.noiseAlpha,
    // whether or not the noise is monochromatic
    coloredNoise: true,
    // offset the vignette
    offset: this.offset
  });
  this.background.draw();
};

Background.prototype.tweeqScale1 = function( value ) {
  this.scale[0] = value;
};

Background.prototype.tweeqScale2 = function( value ) {
  this.scale[1] = value;
};

Background.prototype.tweeqAspect = function( value ) {
  this.aspect = value;
};

Background.prototype.tweeqColor1R = function( value ) {
  this.color1[0] = value;
};

Background.prototype.tweeqColor1G = function( value ) {
  this.color1[1] = value;
};

Background.prototype.tweeqColor1B = function( value ) {
  this.color1[2] = value;
};

Background.prototype.tweeqColor2R = function( value ) {
  this.color2[0] = value;
};

Background.prototype.tweeqColor2G = function( value ) {
  this.color2[1] = value;
};

Background.prototype.tweeqColor2B = function( value ) {
  this.color2[2] = value;
};

Background.prototype.tweeqSmoothing1 = function( value ) {
  this.smoothing[0] = value;
};

Background.prototype.tweeqSmoothing2 = function( value ) {
  this.smoothing[1] = value;
};

Background.prototype.tweeqOffset1 = function( value ) {
  this.offset[0] = value;
};

Background.prototype.tweeqOffset2 = function( value ) {
  this.offset[1] = value;
};

module.exports = Background;
