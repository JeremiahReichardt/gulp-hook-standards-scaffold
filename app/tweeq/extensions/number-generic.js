'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function fit(value) {

  return Number.isFinite(value);
}

function render(control, el) {
  var name = control.name;
  var value = control.value;


  var onChange = function onChange(event) {
    return control.update(event.target.value);
  };

  var label = el('label', null, name);
  var input = el('input', {type: 'text', value: value, onChange: onChange});

  return el('div', {class: 'tweeq-control'}, label, input);
}

exports.default = {fit: fit, render: render};
