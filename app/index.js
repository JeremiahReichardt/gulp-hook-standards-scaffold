'use strict';

var config = require('./config');
var createGL = require('webgl-context');
var createLoop = require('canvas-loop');

var Background = require('./components/Background');

function App() {
  var gl = createGL();
  var canvas = gl.canvas;

  console.log( new Background() );

  document.body.appendChild(canvas);

  var app = createLoop(canvas, {
    scale: window.devicePixelRatio
  });

  app.on('tick', function(dt) {
    // do some rendering
    gl.clear(gl.COLOR_BUFFER_BIT);
  });
}

module.exports = App;

new App();
