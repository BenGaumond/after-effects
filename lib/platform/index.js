'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _os = require('./os')

var _os2 = _interopRequireDefault(_os)

var _errors = require('../errors')

var _errors2 = _interopRequireDefault(_errors)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

var platform = (function () {
  var platformName = _os2.default.platform()
  if (platformName === 'darwin') { // mac
    return require('./mac')
  } else if (platformName.includes('win')) {
    // windows 32 or 64
    return require('./win')
  } else throw new Error(_errors2.default.UnsupportedPlatform)
}())

exports.default = platform
