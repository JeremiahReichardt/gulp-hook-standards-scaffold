'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = container;

var _deku = require('deku');

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _componentEmitter = require('component-emitter');

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _control = require('./control');

var _control2 = _interopRequireDefault(_control);

var _views = require('./views');

var _views2 = _interopRequireDefault(_views);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function container() {
  var name = arguments.length <= 0 || arguments[0] === undefined ? 'default' : arguments[0];


  var container = Object.create(_componentEmitter2.default.prototype);

  var children = [];

  // Echoes render events from the children.
  var echo = function echo(event) {
    return container.emit('render');
  };

  // Toggles the open-ness of the container and rerenders the container.
  var toggle = function toggle(event) {
    open = !open;container.emit('render');
  };

  // Tracks whether the container view is open or closed.
  var open = false;

  /**
   * Add children to the container.
   */
  container.add = function (child) {

    if (typeof child === 'string') child = _control2.default.apply(undefined, arguments);

    children = children.concat(child);
    child.on('render', echo);

    return child;
  };

  /**
   * Remove children from the container.
   */
  container.remove = function (child) {

    children = children.filter(function (item) {
      return item === child;
    });
    child.off('render', echo);
  };

  /**
   * Render the container and all of its children as a DOM tree, and append it to the provided element.
   */
  container.mount = function (target) {

    var renderer = (0, _deku.createApp)(target);

    var render = function render() {

      var rendered = (0, _deku.element)(container);
      var rootnode = (0, _deku.element)('div', { class: 'tweeq-root' }, rendered);

      renderer(rootnode);
    };

    // Subscribe to render events. Debouncing prevents wasted renders when
    // multiple controls are updated in the same frame.
    container.on('render', (0, _lodash2.default)(render, 0));

    // Do the initial render.
    render();
  };

  /**
   * Remove the container from the provided element.
   */
  container.unmount = function (target) {

    console.log('unmounting');
  };

  container.render = function () {

    var view = open ? _views2.default.groupOpened : _views2.default.groupClosed;

    // Render the view with some named parameters.
    return view.render({ name: name, children: children, toggle: toggle });
  };

  return container;
}
