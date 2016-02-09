'use strict';

var _insertCss = require('insert-css');

var _insertCss2 = _interopRequireDefault(_insertCss);

var _control = require('./control');

var _control2 = _interopRequireDefault(_control);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _extensions = require('./extensions');

var _extensions2 = _interopRequireDefault(_extensions);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Inject the styles into the page.
(0, _insertCss2.default)(_styles2.default, { prepend: true });

// Register the default views.
for (var key in _extensions2.default) {

  console.log('registering ' + key + ' extension');
  (0, _control.extend)(_extensions2.default[key]);
}

// Babel compiles `export default` to `exports.default` which means that any
// CommonJS module would have to do
//
//   const tweeq = require('tweeq').default;
//
// which isn't awesome. Using `module.exports` keeps compatability.

module.exports = { container: _container2.default, control: _control2.default, extend: _control.extend };