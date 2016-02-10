'use strict';

var shell = require('gl-now')();
var createGeom = require('gl-geometry');
var wire = require('gl-wireframe');
var mat4 = require('gl-mat4');

var icosphere;
var projection = mat4.create();
var rotation = mat4.create();
var view = mat4.create();
var geom;
var shader;

function Dome(gl) {
  shell.on('gl-init', this.init.bind(this));
  shell.on('gl-render', this.render.bind(this));
}

Dome.prototype.init = function () {
  icosphere = require('icosphere')(3);
  icosphere.cells = wire(icosphere.cells);
  geom = createGeom(shell.gl)
    .attr('positions', icosphere.positions)
    .faces(icosphere.cells);

  shader = require('gl-basic-shader')(shell.gl);

  mat4.translate(view, view, [0, -1.3, -3]);

  mat4.rotateZ(rotation, rotation, 0.005);

  console.log(shell);
};

Dome.prototype.render = function () {
  var width = shell.width;
  var height = shell.height;

  shell.gl.clear(shell.gl.COLOR_BUFFER_BIT);
  shell.gl.disable(shell.gl.DEPTH_TEST);

  var aspect = width / height;
  mat4.perspective(projection, Math.PI / 4, aspect, 1, 1000);

  //rotate model matrix around Y axis
  mat4.rotateY(rotation, rotation, 0.0005);

  shader.bind();
  shader.uniforms.projection = projection;
  shader.uniforms.view = view; //zoom out so we can see it
  shader.uniforms.model = rotation;
  shader.uniforms.tint = [1, 0, 1, 1]; // RGBA white

  geom.bind(shader);
  geom.draw(shell.gl.LINES);
  geom.unbind();
};

module.exports = Dome;
