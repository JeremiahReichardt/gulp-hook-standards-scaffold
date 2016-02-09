'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deku = require('deku');

// Just wrap a control view in a row div, so we can get consistent styling.
var row = function row(view) {
  return (0, _deku.element)('div', { class: 'tweeq-row' }, view);
};

// Reuse the same icon virtual element between renders.
var icon = (0, _deku.element)('i', { class: 'icon-closed' });

function render(_ref) {
  var name = _ref.name;
  var children = _ref.children;
  var toggle = _ref.toggle;


  // Construct the opener control.
  var label = (0, _deku.element)('label', null, name);
  var opener = (0, _deku.element)('div', { class: 'tweeq-control clickable', onClick: toggle }, label, icon);

  var rows = row(opener);

  return (0, _deku.element)('div', { class: 'tweeq-group closed' }, rows);
}

exports.default = { render: render };