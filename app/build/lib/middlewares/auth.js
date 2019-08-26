"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.isActiveSession = exports.auth = void 0;var _error = require("../errors/error");
var _utils = require("../utils/utils");
var _redisServices = require("../services/redis-services");
var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var auth = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {var token, decoded;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;if (

            req.headers.authorization) {_context.next = 3;break;}throw (
              new _error.InvalidTokenError());case 3:


            /** Decode token and get access type */
            token = req.headers.authorization.split(" ")[1];_context.next = 6;return (
              (0, _utils.decodeAccessToken)(token));case 6:decoded = _context.sent;

            req.user = { _id: decoded.userId };
            req.token = token;
            next();_context.next = 15;break;case 12:_context.prev = 12;_context.t0 = _context["catch"](0);

            (0, _utils.sendErrorResponse)(res, _context.t0);case 15:case "end":return _context.stop();}}}, _callee, null, [[0, 12]]);}));return function auth(_x, _x2, _x3) {return _ref.apply(this, arguments);};}();



/** Is there a active session? */exports.auth = auth;
var isActiveSession = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {var data, _session;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;_context2.next = 3;return (

              (0, _redisServices.getAllSessions)(req.user._id));case 3:data = _context2.sent;
            _session = _lodash["default"].find(data, { token: req.token });if (

            _session) {_context2.next = 7;break;}throw (
              new _error.InvalidTokenError());case 7:


            req.session = _session.key;
            next();_context2.next = 14;break;case 11:_context2.prev = 11;_context2.t0 = _context2["catch"](0);

            (0, _utils.sendErrorResponse)(res, _context2.t0);case 14:case "end":return _context2.stop();}}}, _callee2, null, [[0, 11]]);}));return function isActiveSession(_x4, _x5, _x6) {return _ref2.apply(this, arguments);};}();exports.isActiveSession = isActiveSession;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWlkZGxld2FyZXMvYXV0aC5qcyJdLCJuYW1lcyI6WyJhdXRoIiwicmVxIiwicmVzIiwibmV4dCIsImhlYWRlcnMiLCJhdXRob3JpemF0aW9uIiwiSW52YWxpZFRva2VuRXJyb3IiLCJ0b2tlbiIsInNwbGl0IiwiZGVjb2RlZCIsInVzZXIiLCJfaWQiLCJ1c2VySWQiLCJpc0FjdGl2ZVNlc3Npb24iLCJkYXRhIiwiX3Nlc3Npb24iLCJfXyIsImZpbmQiLCJzZXNzaW9uIiwia2V5Il0sIm1hcHBpbmdzIjoiMkhBQUE7QUFDQTtBQUNBO0FBQ0Esd0Q7O0FBRU8sSUFBTUEsSUFBSSxnR0FBRyxpQkFBUUMsR0FBUixFQUFhQyxHQUFiLEVBQWtCQyxJQUFsQjs7QUFFUEYsWUFBQUEsR0FBRyxDQUFDRyxPQUFKLENBQVlDLGFBRkw7QUFHRixrQkFBSUMsd0JBQUosRUFIRTs7O0FBTVo7QUFDTUMsWUFBQUEsS0FQTSxHQU9FTixHQUFHLENBQUNHLE9BQUosQ0FBWUMsYUFBWixDQUEwQkcsS0FBMUIsQ0FBZ0MsR0FBaEMsRUFBcUMsQ0FBckMsQ0FQRjtBQVFVLDRDQUFrQkQsS0FBbEIsQ0FSVixTQVFORSxPQVJNOztBQVVaUixZQUFBQSxHQUFHLENBQUNTLElBQUosR0FBVyxFQUFFQyxHQUFHLEVBQUVGLE9BQU8sQ0FBQ0csTUFBZixFQUFYO0FBQ0FYLFlBQUFBLEdBQUcsQ0FBQ00sS0FBSixHQUFZQSxLQUFaO0FBQ0FKLFlBQUFBLElBQUksR0FaUTs7QUFjWiwwQ0FBa0JELEdBQWxCLGVBZFksMEVBQUgsbUJBQUpGLElBQUksd0RBQVY7Ozs7QUFrQlAsaUM7QUFDTyxJQUFNYSxlQUFlLGlHQUFHLGtCQUFRWixHQUFSLEVBQWFDLEdBQWIsRUFBa0JDLElBQWxCOztBQUVKLGlEQUFlRixHQUFHLENBQUNTLElBQUosQ0FBU0MsR0FBeEIsQ0FGSSxTQUVqQkcsSUFGaUI7QUFHakJDLFlBQUFBLFFBSGlCLEdBR05DLG1CQUFHQyxJQUFILENBQVFILElBQVIsRUFBYyxFQUFFUCxLQUFLLEVBQUVOLEdBQUcsQ0FBQ00sS0FBYixFQUFkLENBSE07O0FBS2xCUSxZQUFBQSxRQUxrQjtBQU1iLGtCQUFJVCx3QkFBSixFQU5hOzs7QUFTdkJMLFlBQUFBLEdBQUcsQ0FBQ2lCLE9BQUosR0FBY0gsUUFBUSxDQUFDSSxHQUF2QjtBQUNBaEIsWUFBQUEsSUFBSSxHQVZtQjs7QUFZdkIsMENBQWtCRCxHQUFsQixnQkFadUIsNEVBQUgsbUJBQWZXLGVBQWUsMERBQXJCLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnZhbGlkVG9rZW5FcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvZXJyb3JcIlxuaW1wb3J0IHsgc2VuZEVycm9yUmVzcG9uc2UsIGRlY29kZUFjY2Vzc1Rva2VuIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCJcbmltcG9ydCB7IGdldEFsbFNlc3Npb25zIH0gZnJvbSBcIi4uL3NlcnZpY2VzL3JlZGlzLXNlcnZpY2VzXCJcbmltcG9ydCBfXyBmcm9tIFwibG9kYXNoXCJcblxuZXhwb3J0IGNvbnN0IGF1dGggPSBhc3luYyAoIHJlcSwgcmVzLCBuZXh0ICkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICghcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRUb2tlbkVycm9yKClcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiBEZWNvZGUgdG9rZW4gYW5kIGdldCBhY2Nlc3MgdHlwZSAqL1xuICAgICAgICBjb25zdCB0b2tlbiA9IHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24uc3BsaXQoXCIgXCIpWzFdO1xuICAgICAgICBjb25zdCBkZWNvZGVkID0gYXdhaXQgZGVjb2RlQWNjZXNzVG9rZW4odG9rZW4pO1xuXG4gICAgICAgIHJlcS51c2VyID0geyBfaWQ6IGRlY29kZWQudXNlcklkIH07XG4gICAgICAgIHJlcS50b2tlbiA9IHRva2VuO1xuICAgICAgICBuZXh0KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgc2VuZEVycm9yUmVzcG9uc2UocmVzLCBlcnJvcilcbiAgICB9XG59XG5cbi8qKiBJcyB0aGVyZSBhIGFjdGl2ZSBzZXNzaW9uPyAqL1xuZXhwb3J0IGNvbnN0IGlzQWN0aXZlU2Vzc2lvbiA9IGFzeW5jICggcmVxLCByZXMsIG5leHQgKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldEFsbFNlc3Npb25zKHJlcS51c2VyLl9pZCk7XG4gICAgICAgIGNvbnN0IF9zZXNzaW9uID0gX18uZmluZChkYXRhLCB7IHRva2VuOiByZXEudG9rZW4gfSk7XG4gICAgXG4gICAgICAgIGlmICghX3Nlc3Npb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkVG9rZW5FcnJvcigpXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmVxLnNlc3Npb24gPSBfc2Vzc2lvbi5rZXk7XG4gICAgICAgIG5leHQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBzZW5kRXJyb3JSZXNwb25zZShyZXMsIGVycm9yKVxuICAgIH1cbn0iXX0=