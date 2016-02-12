'use strict';

var createMesh = require('gl-mesh');
var createShader = require('gl-shader');
var baboon = require("baboon-image");
var simple3DShader = require('simple-3d-shader');
var attachCamera = require('game-shell-orbit-camera');
var glm = require('gl-matrix');
var createTexture = require("gl-texture2d");
var mat4 = glm.mat4;
var shader, mesh;
var shell;
var gl;
var camera;
var texture;

function Logo3D(_shell) {
  shell = _shell;
  gl = _shell.gl;
  shader = simple3DShader(shell.gl);

  shader.attributes.color = [1, 0.7, 0.3];

  mesh = createMesh(shell.gl, require('../models/hookLogo.js'));
  //mesh.mode = gl.LINES;
  camera = attachCamera(shell);
  camera.lookAt([0, 3, 70], [0, 0, 0], [0, 0, -70]);
  camera.distance = 1000;

  texture = createTexture(gl, baboon);
}

Logo3D.prototype.render = function() {

  //Bind shader
  shader.bind();

  //Set camera parameters
  var scratch = mat4.create();
  shader.uniforms.texture = texture.bind();
  shader.uniforms.model = scratch;
  shader.uniforms.projection = mat4.perspective(scratch, Math.PI / 4.0, shell.width / shell.height, 0.1, 1000.0);
  shader.uniforms.view = camera.view(scratch);

  //Draw object
  mesh.bind(shader);
  mesh.draw();
  mesh.unbind();
};

module.exports = Logo3D;
