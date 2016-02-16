'use strict';

var shell = require('gl-now')();
var mat4 = require('gl-mat4');
var createCamera = require('perspective-camera');
var gl;
var camera;
var Dome = require('./components/Dome');
var tweeq = require('./tweeq/index');

var dome;

function App() {
  shell.on('gl-init', this.init.bind(this));
  shell.on('gl-render', this.render.bind(this));
}

App.prototype.init = function () {

  gl = shell.gl;

  gl.enable( gl.BLEND );
  gl.blendEquation( gl.FUNC_ADD );
  gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

  camera = createCamera({
    fov: Math.PI / 4,
    near: 0.01,
    far: 1000
  });

  this.tweeqable = {
    x: {default: 0.0, min: 0, max: 1},
    y: {default: 0.080, min: 0, max: 1},
    z: {default: 0.0, min: 0, max: 1}
  };

  dome = new Dome(shell, camera);

  this.tweeqIt(false);
};

App.prototype.render = function () {
  camera.identity();
  camera.translate([ this.tweeqable.x.value, this.tweeqable.y.value, this.tweeqable.z.value ]);
  camera.lookAt([0, 0, 0]);
  camera.viewport = [0, 0, shell.width, shell.height];
  camera.update();

  dome.render();
};

App.prototype.tweeqIt = function (addControls) {
  var controls;
  if (addControls) {
    controls = tweeq.container();
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

module.exports = App;

new App();
