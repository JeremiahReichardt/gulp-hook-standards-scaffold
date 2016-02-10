'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function fit(value) {

  return value === true || value === false;
}

function render(control, el) {
  var name = control.name;
  var value = control.value;


  var onClick = function onClick(event) {
    return control.update(!value);
  };

  var label = el('label', null, name);
  var input = el('input', {type: 'checkbox', checked: value});

  return el('div', {class: 'tweeq-control', onClick: onClick}, label, input);
}

exports.default = {fit: fit, render: render};
