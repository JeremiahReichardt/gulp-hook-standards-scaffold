'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.clamp');

var _lodash2 = _interopRequireDefault(_lodash);

var _events = require('../events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fit(value, options) {

  return Number.isFinite(value) && options.hasOwnProperty('min') && options.hasOwnProperty('max') && Number.isFinite(options.min) && Number.isFinite(options.max);
}

function render(control, el) {
  var name = control.name;
  var value = control.value;
  var options = control.options;

  // This is reused by both the click and the drag interaction to map the mouse
  // position to a control value. It uses the absolute position of both the
  // slider element and the mouse. We don't use event.offsetX or anything like
  // that because it would limit the drag interaction to the bounds of the
  // slider. By using absolute positions, the user can keep dragging the control
  // anywhere on the page. It's just easier to use that way.

  var update = function update(target) {

    var bounds = target.getBoundingClientRect();
    var offset = (0, _lodash2.default)(event.pageX, bounds.left, bounds.right) - bounds.left;

    var percent = offset / bounds.width;
    var absolute = options.min + (options.max - options.min) * percent;

    control.update(absolute);
  };

  // This is the simpler event handler because it doesn't need to maintain any
  // references across renders. Just update the control based on the position
  // of the mouse in the slider.
  var onClick = function onClick(event) {
    return update(event.currentTarget);
  };

  // This is attached to the slider element and starts the dragging interaction.
  // It creates two additional event listeners, for mouse movement and mouse
  // button up. They are scoped to the closure because we don't want to keep
  // any persistant state in the view.
  var onMouseDown = function onMouseDown(event) {

    var target = event.currentTarget;

    var onMouseMove = function onMouseMove(event) {
      return update(target);
    };
    _events2.default.on(window, 'mousemove', onMouseMove);

    var onMouseUp = function onMouseUp(event) {
      return _events2.default.off(window, 'mousemove', onMouseMove);
    };
    _events2.default.once(window, 'mouseup', onMouseUp);
  };

  var controlLabel = el('label', null, name);
  var valueLabel = el('div', { style: 'position: absolute; left: 0; right: 0; text-align: center;' }, value.toPrecision(2));

  var background = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 0; background: black;' });
  var foreground = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: ' + (100 - 100 * (value / options.max - options.min)) + '%; background: #4C6767;' });

  var slider = el('div', { class: 'clickable', style: 'flex: 1; position: relative', onClick: onClick, onMouseDown: onMouseDown }, background, foreground, valueLabel);

  return el('div', { class: 'tweeq-control' }, controlLabel, slider);
}

exports.default = { fit: fit, render: render };