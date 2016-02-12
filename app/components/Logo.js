'use strict';


var shell;
var gl;
var glslify = require('glslify');
var glShader = require('gl-shader');
var loaded = false;
var image;
var shader;
var positionLocation;
var texCoordLocation;
var texture;
var resolutionLocation;
var textureSizeLocation;
var positionBuffer;

function Logo( _shell ) {
  shell = _shell;
  gl = _shell.gl;
  this.loadImage();
}

Logo.prototype.render = function() {
  if ( loaded === false ){
    return;
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);

  shader.bind();

  // set the resolution
  gl.uniform2f(resolutionLocation, shell.width, shell.height);

  // set the size of the image
  gl.uniform2f(textureSizeLocation, image.width, image.height);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // move the image
  this.setRectangle(
    ( shell.width / 2 ) - ( image.width / 4 ),
    ( shell.height / 2 ) - ( image.width / 4 ),
    image.width / 2,
    image.height / 2
  );

  // Draw the rectangle.
  gl.drawArrays(gl.TRIANGLES, 0, 6 );
};

Logo.prototype.loadImage = function() {
  image = new Image();
  image.src = '../images/logo.png';
  image.onload = this.imageLoaded.bind( this );
};

Logo.prototype.imageLoaded = function() {

  // setup GLSL program
  shader = glShader(shell.gl, glslify('../shaders/logo.vert'), glslify('../shaders/logo.frag'));

  // look up where the vertex data needs to go.
  positionLocation = gl.getAttribLocation(shader.program, 'a_position');
  texCoordLocation = gl.getAttribLocation(shader.program, 'a_texCoord');

  // provide texture coordinates for the rectangle.
  var texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    0.0,  1.0,
    1.0,  0.0,
    1.0,  1.0]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the parameters so we can render any size image.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  // lookup uniforms
  resolutionLocation = gl.getUniformLocation(shader.program, 'u_resolution');
  textureSizeLocation = gl.getUniformLocation(shader.program, 'u_textureSize');

  // Create a buffer for the position of the rectangle corners.
  positionBuffer = gl.createBuffer();

  loaded = true;
};

Logo.prototype.setRectangle = function(x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2]), gl.STATIC_DRAW);
};

module.exports = Logo;
