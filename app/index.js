'use strict';

var shell = require('gl-now')();
var createMesh = require('gl-mesh');
var simple3DShader = require('simple-3d-shader');
var attachCamera = require('game-shell-orbit-camera');
var glm = require('gl-matrix');

var Background = require('./components/Background');
var Dome = require('./components/Dome');

var mat4 = glm.mat4;
var shader, mesh;
var camera = attachCamera(shell);

function App() {
  camera.lookAt([0, 3, 20], [0, 3, 0], [0, 1, 0]);

  shell.on('gl-init', this.init.bind(this));
  shell.on('gl-render', this.render.bind(this));
}

App.prototype.init = function () {
  shader = simple3DShader(shell.gl);
  mesh = createMesh(shell.gl, require('bunny'));

  new Background();
  new Dome();
};

App.prototype.render = function () {
  //Bind shader
  shader.bind();

  //Set camera parameters
  var scratch = mat4.create();
  shader.uniforms.model = scratch;
  shader.uniforms.projection = mat4.perspective(scratch, Math.PI / 4.0, shell.width / shell.height, 0.1, 1000.0);
  shader.uniforms.view = camera.view(scratch);

  //Draw object
  mesh.bind(shader);
  mesh.draw();
  mesh.unbind();
};

module.exports = App;

new App();
