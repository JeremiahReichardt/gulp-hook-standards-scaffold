'use strict';

var shell = require('gl-now')();
var gl;

function Component() {
  shell.on('gl-init', this.init.bind(this));
  shell.on('gl-render', this.render.bind(this));
}

Component.prototype.init = function() {
  gl = shell.gl;
};

Component.prototype.render = function() {

};

module.exports = Component;
