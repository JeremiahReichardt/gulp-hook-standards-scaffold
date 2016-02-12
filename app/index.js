'use strict';

var shell = require('gl-now')();
var Background = require('./components/Background');
var Dome = require('./components/Dome');
var Logo = require('./components/Logo');
var Logo3D = require('./components/Logo3D');

var ID = 'Index';
var gl;
var dome;
var logo;
var logo3D;
var background;

function App() {
  shell.on('gl-init', this.init.bind(this));
  shell.on('gl-render', this.render.bind(this));
}

App.prototype.init = function () {

  gl = shell.gl;

  background = new Background(shell);
  dome = new Dome(shell);
  logo = new Logo(shell);
  logo3D = new Logo3D(shell);

};

App.prototype.render = function () {

  gl.enable( gl.BLEND );
  gl.blendEquation( gl.FUNC_ADD );
  gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

  background.render();

  dome.render();

  logo.render();

  gl.enable( gl.BLEND );
  gl.blendEquation( gl.FUNC_ADD );
  gl.blendFunc( gl.SRC_COLOR, gl.ONE_MINUS_SRC_COLOR  );

  logo3D.render();
};

module.exports = App;

new App();
