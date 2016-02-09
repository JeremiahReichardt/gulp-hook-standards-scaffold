'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deku = require('deku');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Just wrap a control view in a row div, so we can get consistent styling.
var row = function row(view) {
  return (0, _deku.element)('div', { class: 'tweeq-row' }, view);
};

// Reuse the same icon virtual element between renders.
var icon = (0, _deku.element)('i', { class: 'icon-opened' });

function render(_ref) {
  var name = _ref.name;
  var children = _ref.children;
  var toggle = _ref.toggle;


  // Render each child to a VDOM node.
  var views = children.map(_deku.element);

  // Construct the closer control.
  var label = (0, _deku.element)('label', null, name);
  var closer = (0, _deku.element)('div', { class: 'tweeq-control clickable', onClick: toggle }, label, icon);

  // Wrap each view in a row node, so we can get consistent layout.
  var rows = [closer].concat(_toConsumableArray(views)).map(row);

  return (0, _deku.element)('div', { class: 'tweeq-group opened' }, rows);
}

exports.default = { render: render };