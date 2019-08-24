"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

server.listen(5000, function () {
  return console.log('Server up | Port: 5000');
});