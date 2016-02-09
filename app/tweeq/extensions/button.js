'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function fit(value) {

  return value === undefined;
}

function render(control, el) {
  var name = control.name;
  var value = control.value;


  var onClick = function onClick(event) {
    return control.emit('change');
  };

  var label = el('label', null, name);

  return el('div', { class: 'tweeq-control', onClick: onClick }, label);
}

exports.default = { fit: fit, render: render };