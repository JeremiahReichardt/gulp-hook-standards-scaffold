'use strict';

var shell;
var gl;
var camera;

var createGeometry = require('gl-geometry');
var createShader = require('gl-shader');
var mat4 = require('gl-mat4');
var icosphere = require('icosphere');

var glslify = require('glslify');
var tweeq = require('../tweeq/index');

var shader;
var mesh;
var geom;
var model;
var rotationRate = 0;

function Dome(_shell, _camera) {

  shell = _shell;
  gl = _shell.gl;
  camera = _camera;

  //create our shader
  shader = require('gl-basic-shader')(gl);

  //set up a sphere geometry
  mesh = icosphere(3);
  geom = createGeometry(gl)
    .attr('position', mesh.positions)
    .faces(mesh.cells);

  //the model-space transform for our sphere
  model = mat4.create();

  this.tweeqable = {
    scale: {default: 0.022, min: 0, max: 1},
    x: {default: 0.0, min: 0, max: 1},
    y: {default: 0.0, min: 0, max: 1},
    z: {default: 0.035, min: 0, max: 1},
    rotation: {default: 0.0025, min: 0, max: 0.25}
  };

  this.tweeqIt(true);
}

Dome.prototype.tweeqIt = function (addControls) {
  var controls;
  if (addControls) {
    controls = tweeq.container();
    controls.mount(document.querySelector('#controls'));
  }
  for (var key in this.tweeqable) {
    var val = this.tweeqable[key];
    val.value = val.default;
    val._value = val.default;
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

Dome.prototype.render = function () {

  var s = this.tweeqable.scale.value * -1;

  //set up our model matrix
  mat4.identity(model);
  mat4.translate(model, model, [this.tweeqable.x.value,this.tweeqable.y.value,this.tweeqable.z.value]);
  mat4.scale(model, model, [s,s,s]);

  this.tweeqable.rotation._value -= this.tweeqable.rotation.value;

  mat4.rotateZ(model, model, this.tweeqable.rotation._value);

  //set our uniforms for the shader
  shader.bind();
  shader.uniforms.projection = camera.projection;
  shader.uniforms.view = camera.view;
  shader.uniforms.model = model;
  shader.uniforms.tint = [1, 0, 1, 1]; // RGBA

  //draw the mesh
  geom.bind(shader);
  geom.draw(gl.LINES);
  geom.unbind();
};

module.exports = Dome;
