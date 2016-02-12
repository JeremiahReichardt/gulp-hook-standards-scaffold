'use strict';

var shell;
var gl;
var createGeom = require('gl-geometry');
var wire = require('gl-wireframe');
var mat4 = require('gl-mat4');
var ID = 'Dome';
var icosphere;
var projection = mat4.create();
var rotation = mat4.create();
var view = mat4.create();
var geom;
var shader;

function Dome(_shell) {

  shell = _shell;
  gl = _shell.gl;

  icosphere = require('icosphere')(3);
  icosphere.cells = wire(icosphere.cells);
  geom = createGeom(gl)
    .attr('positions', icosphere.positions)
    .faces(icosphere.cells);

  shader = require('gl-basic-shader')(gl);

  mat4.translate(view, view, [0, -1.3, -3]);

  mat4.rotateZ(rotation, rotation, 0.005);
}

Dome.prototype.render = function () {
  var width = shell.width;
  var height = shell.height;

  var aspect = width / height;

  mat4.perspective(projection, Math.PI / 4, aspect, 1, 1000);

  //rotate model matrix around Y axis
  mat4.rotateY(rotation, rotation, 0.0005);

  shader.bind();
  shader.uniforms.projection = projection;
  shader.uniforms.view = view; //zoom out so we can see it
  shader.uniforms.model = rotation;
  shader.uniforms.tint = [1, 0, 1, 1]; // RGBA

  geom.bind(shader);
  geom.draw(gl.LINES);
  geom.unbind();
};

module.exports = Dome;
