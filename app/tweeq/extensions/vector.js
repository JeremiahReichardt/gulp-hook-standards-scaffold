'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

function fit(value) {

  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.hasOwnProperty('x') && value.hasOwnProperty('y') && value.hasOwnProperty('z') && Number.isFinite(value.x) && Number.isFinite(value.y) && Number.isFinite(value.z);
}

function render(control, el) {
  var name = control.name;
  var value = control.value;


  var label = el('label', null, name);

  var xaxis = el('line', {x1: 20, y1: 20, x2: 20, y2: 0, stroke: '#00ff88', 'stroke-width': 2});
  var yaxis = el('line', {x1: 20, y1: 20, x2: 0, y2: 32, stroke: '#00ff88', 'stroke-width': 2});
  var zaxis = el('line', {x1: 20, y1: 20, x2: 40, y2: 32, stroke: '#00ff88', 'stroke-width': 2});

  var svg = el('svg', {x: 0, y: 0, width: 40, height: 40}, xaxis, yaxis, zaxis);

  return el('div', {class: 'tweeq-control'}, label, svg);
}

exports.default = {fit: fit, render: render};
