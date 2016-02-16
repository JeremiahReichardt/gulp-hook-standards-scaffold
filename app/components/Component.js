'use strict';

var shell;
var gl;
var camera;
var tweeq = require('../tweeq/index');

function Dome(_shell, _camera) {

  shell = _shell;
  gl = _shell.gl;
  camera = _camera;

  this.tweeqable = {
    scale: {default: 0.02, min: 0, max: 1}
  };

  this.tweeqIt(false);
}

Dome.prototype.render = function () {
  // console.log( this.tweeqable.scale.value );
};

Dome.prototype.tweeqIt = function (addControls) {
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

module.exports = Dome;
