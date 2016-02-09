'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = extend;
exports.default = control;

var _componentEmitter = require('component-emitter');

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _deku = require('deku');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extensions = [];

/**
 * Register a control view.
 *
 * @param factory
 * @param filter
 *
 */
function extend(view) {

  extensions.push(view);
}

/**
 * Create a new control.
 *
 * @param name - The name of the control.
 * @param value - The value of the control.
 *
 */
function control(name, value, options) {

  if (options === undefined) options = {};

  // Before we do anything, look for a view extension that can render this
  // value. Reject it if we can't find one.
  var view = extensions.find(function (ext) {
    return ext.fit(value, options);
  });
  if (view === undefined) throw new Error('Unable to find a suitable control for ' + value);

  // Construct the control with its properties.
  var control = Object.create(_componentEmitter2.default.prototype, {

    name: {
      value: name,
      writable: false,
      enumerable: true
    },

    options: {
      value: Object.freeze(options),
      writable: false,
      enumerable: true
    },

    value: {
      get: function get() {
        return value;
      },
      set: function set() {
        throw new TypeError('Use control#update to modify the value of a control');
      },
      enumerable: true
    }

  });

  // Keep a reference to the rendered view. This will get wiped out when the
  // value is udpated.
  var rendered = null;

  /**
   * Modify the value of the control directly.
   */
  control.update = function (next) {

    // TODO nested equivalency on a value like { x, y, z }.
    if (value !== next) {

      value = next;

      // Wipe out the cached view so it can be rendered with the updated value.
      rendered = null;

      // Notify the user of the change.
      control.emit('change', value);

      // Notify the parent container that its tree needs to be rendered.
      control.emit('render');
    }
  };

  /**
   * A simple wrapper for attaching a change event listener.
   */
  control.changed = function () {

    console.log( arguments );

    control.on.apply(control, ['change'].concat(Array.prototype.slice.call(arguments)));
  };

  /**
   * Used by Deku to render the control.
   */
  control.render = function () {

    if (!rendered) rendered = view.render(control, _deku.element);
    return rendered;
  };

  return control;
}
