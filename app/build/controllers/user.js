"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.logout = exports.login = exports.updateUser = exports.getUsers = exports.createUser = void 0;var _user = require("../lib/services/user");
var _utils = require("../lib/utils/utils");
var _redisServices = require("../lib/services/redis-services");
var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(source, true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(source).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

/** User creation handler */
var createUser = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {var data, file, user, token;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;

            data = _objectSpread({}, req.body);
            file = _objectSpread({}, req.file);
            /** Save user data */_context.next = 5;return (
              (0, _user.saveNewUser)(data, file));case 5:user = _context.sent;_context.next = 8;return (
              (0, _utils.generateAccessToken)(user._id.toString(), "2 hours"));case 8:token = _context.sent;_context.next = 11;return (
              (0, _redisServices.setSession)(user._id.toString(), token, req.ip));case 11:return _context.abrupt("return",
            res.status(200).json({ error: false, user: user, token: token }));case 14:_context.prev = 14;_context.t0 = _context["catch"](0);

            (0, _utils.sendErrorResponse)(res, _context.t0);case 17:case "end":return _context.stop();}}}, _callee, null, [[0, 14]]);}));return function createUser(_x, _x2) {return _ref.apply(this, arguments);};}();



/** Get users */exports.createUser = createUser;
var getUsers = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {var options, _ref3, data, totalMatches;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;

            options = {
              sortBy: req.sortBy,
              pagination: req.pagination,
              query: req.query,
              requestUser: req.user };_context2.next = 4;return (


              (0, _user.queryForUsers)(options));case 4:_ref3 = _context2.sent;data = _ref3.data;totalMatches = _ref3.totalMatches;return _context2.abrupt("return",
            res.status(200).json({
              error: false,
              data: data,
              totalMatches: totalMatches }));case 10:_context2.prev = 10;_context2.t0 = _context2["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context2.t0);case 13:case "end":return _context2.stop();}}}, _callee2, null, [[0, 10]]);}));return function getUsers(_x3, _x4) {return _ref2.apply(this, arguments);};}();



/** Edit user information */exports.getUsers = getUsers;
var updateUser = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {var data, file, user;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;

            data = _objectSpread({}, req.body);
            file = _objectSpread({}, req.file);_context3.next = 5;return (
              (0, _user.updateUserData)(req.user._id, data, file));case 5:user = _context3.sent;return _context3.abrupt("return",
            res.status(200).json({
              error: false,
              user: user }));case 9:_context3.prev = 9;_context3.t0 = _context3["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context3.t0);case 12:case "end":return _context3.stop();}}}, _callee3, null, [[0, 9]]);}));return function updateUser(_x5, _x6) {return _ref4.apply(this, arguments);};}();



/** Get session token */exports.updateUser = updateUser;
var login = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {var data, user, token;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.prev = 0;

            data = _objectSpread({}, req.body);_context4.next = 4;return (
              (0, _user.validateCredentials)(data));case 4:user = _context4.sent;_context4.next = 7;return (
              (0, _utils.generateAccessToken)(String(user._id), "2 hours"));case 7:token = _context4.sent;_context4.next = 10;return (
              (0, _redisServices.checkUserSessions)(user._id.toString()));case 10:_context4.next = 12;return (
              (0, _redisServices.setSession)(user._id.toString(), token, req.ip));case 12:return _context4.abrupt("return",
            res.status(200).json({
              error: false,
              user: user,
              token: token }));case 15:_context4.prev = 15;_context4.t0 = _context4["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context4.t0);case 18:case "end":return _context4.stop();}}}, _callee4, null, [[0, 15]]);}));return function login(_x7, _x8) {return _ref5.apply(this, arguments);};}();



/** Delete session */exports.login = login;
var logout = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {var user, token, data, _session;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.prev = 0;

            user = req.user;
            token = req.token;_context5.next = 5;return (
              (0, _redisServices.getAllSessions)(user._id));case 5:data = _context5.sent;
            _session = _lodash["default"].find(data, { token: token });if (!
            _session) {_context5.next = 10;break;}_context5.next = 10;return (
              (0, _redisServices.deleteSession)(_session.key));case 10:return _context5.abrupt("return",

            res.status(200).json({ error: false, message: "Successfull logout" }));case 13:_context5.prev = 13;_context5.t0 = _context5["catch"](0);

            (0, _utils.sendErrorResponse)(res, _context5.t0);case 16:case "end":return _context5.stop();}}}, _callee5, null, [[0, 13]]);}));return function logout(_x9, _x10) {return _ref6.apply(this, arguments);};}();exports.logout = logout;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyLmpzIl0sIm5hbWVzIjpbImNyZWF0ZVVzZXIiLCJyZXEiLCJyZXMiLCJkYXRhIiwiYm9keSIsImZpbGUiLCJ1c2VyIiwiX2lkIiwidG9TdHJpbmciLCJ0b2tlbiIsImlwIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiZ2V0VXNlcnMiLCJvcHRpb25zIiwic29ydEJ5IiwicGFnaW5hdGlvbiIsInF1ZXJ5IiwicmVxdWVzdFVzZXIiLCJ0b3RhbE1hdGNoZXMiLCJ1cGRhdGVVc2VyIiwibG9naW4iLCJTdHJpbmciLCJsb2dvdXQiLCJfc2Vzc2lvbiIsIl9fIiwiZmluZCIsImtleSIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiJnTEFBQTtBQUNBO0FBQ0E7QUFDQSx3RDs7QUFFQTtBQUNPLElBQU1BLFVBQVUsZ0dBQUcsaUJBQVFDLEdBQVIsRUFBYUMsR0FBYjs7QUFFWkMsWUFBQUEsSUFGWSxxQkFFREYsR0FBRyxDQUFDRyxJQUZIO0FBR1pDLFlBQUFBLElBSFkscUJBR0RKLEdBQUcsQ0FBQ0ksSUFISDtBQUlsQixpQ0FKa0I7QUFLQyxxQ0FBWUYsSUFBWixFQUFrQkUsSUFBbEIsQ0FMRCxTQUtaQyxJQUxZO0FBTUUsOENBQW9CQSxJQUFJLENBQUNDLEdBQUwsQ0FBU0MsUUFBVCxFQUFwQixFQUF5QyxTQUF6QyxDQU5GLFNBTVpDLEtBTlk7QUFPWiw2Q0FBV0gsSUFBSSxDQUFDQyxHQUFMLENBQVNDLFFBQVQsRUFBWCxFQUFnQ0MsS0FBaEMsRUFBdUNSLEdBQUcsQ0FBQ1MsRUFBM0MsQ0FQWTtBQVFYUixZQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQixFQUFFQyxLQUFLLEVBQUUsS0FBVCxFQUFnQlAsSUFBSSxFQUFKQSxJQUFoQixFQUFzQkcsS0FBSyxFQUFMQSxLQUF0QixFQUFyQixDQVJXOztBQVVsQiwwQ0FBa0JQLEdBQWxCLGVBVmtCLDBFQUFILG1CQUFWRixVQUFVLG1EQUFoQjs7OztBQWNQLGdCO0FBQ08sSUFBTWMsUUFBUSxpR0FBRyxrQkFBUWIsR0FBUixFQUFhQyxHQUFiOztBQUVWYSxZQUFBQSxPQUZVLEdBRUE7QUFDWkMsY0FBQUEsTUFBTSxFQUFFZixHQUFHLENBQUNlLE1BREE7QUFFWkMsY0FBQUEsVUFBVSxFQUFFaEIsR0FBRyxDQUFDZ0IsVUFGSjtBQUdaQyxjQUFBQSxLQUFLLEVBQUVqQixHQUFHLENBQUNpQixLQUhDO0FBSVpDLGNBQUFBLFdBQVcsRUFBRWxCLEdBQUcsQ0FBQ0ssSUFKTCxFQUZBOzs7QUFTcUIsdUNBQWNTLE9BQWQsQ0FUckIsZ0NBU1JaLElBVFEsU0FTUkEsSUFUUSxDQVNGaUIsWUFURSxTQVNGQSxZQVRFO0FBVVRsQixZQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUN4QkMsY0FBQUEsS0FBSyxFQUFFLEtBRGlCO0FBRXhCVixjQUFBQSxJQUFJLEVBQUpBLElBRndCO0FBR3hCaUIsY0FBQUEsWUFBWSxFQUFaQSxZQUh3QixFQUFyQixDQVZTOzs7QUFnQmhCLDBDQUFrQmxCLEdBQWxCLGdCQWhCZ0IsNEVBQUgsbUJBQVJZLFFBQVEscURBQWQ7Ozs7QUFvQlAsNEI7QUFDTyxJQUFNTyxVQUFVLGlHQUFHLGtCQUFRcEIsR0FBUixFQUFhQyxHQUFiOztBQUVaQyxZQUFBQSxJQUZZLHFCQUVERixHQUFHLENBQUNHLElBRkg7QUFHWkMsWUFBQUEsSUFIWSxxQkFHREosR0FBRyxDQUFDSSxJQUhIO0FBSUMsd0NBQWVKLEdBQUcsQ0FBQ0ssSUFBSixDQUFTQyxHQUF4QixFQUE2QkosSUFBN0IsRUFBbUNFLElBQW5DLENBSkQsU0FJWkMsSUFKWTtBQUtYSixZQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUN4QkMsY0FBQUEsS0FBSyxFQUFFLEtBRGlCO0FBRXhCUCxjQUFBQSxJQUFJLEVBQUpBLElBRndCLEVBQXJCLENBTFc7OztBQVVsQiwwQ0FBa0JKLEdBQWxCLGdCQVZrQiwyRUFBSCxtQkFBVm1CLFVBQVUscURBQWhCOzs7O0FBY1Asd0I7QUFDTyxJQUFNQyxLQUFLLGlHQUFHLGtCQUFRckIsR0FBUixFQUFhQyxHQUFiOztBQUVQQyxZQUFBQSxJQUZPLHFCQUVJRixHQUFHLENBQUNHLElBRlI7QUFHTSw2Q0FBb0JELElBQXBCLENBSE4sU0FHUEcsSUFITztBQUlPLDhDQUFvQmlCLE1BQU0sQ0FBQ2pCLElBQUksQ0FBQ0MsR0FBTixDQUExQixFQUFzQyxTQUF0QyxDQUpQLFNBSVBFLEtBSk87QUFLUCxvREFBa0JILElBQUksQ0FBQ0MsR0FBTCxDQUFTQyxRQUFULEVBQWxCLENBTE87QUFNUCw2Q0FBV0YsSUFBSSxDQUFDQyxHQUFMLENBQVNDLFFBQVQsRUFBWCxFQUFnQ0MsS0FBaEMsRUFBdUNSLEdBQUcsQ0FBQ1MsRUFBM0MsQ0FOTztBQU9OUixZQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUN4QkMsY0FBQUEsS0FBSyxFQUFFLEtBRGlCO0FBRXhCUCxjQUFBQSxJQUFJLEVBQUpBLElBRndCO0FBR3hCRyxjQUFBQSxLQUFLLEVBQUxBLEtBSHdCLEVBQXJCLENBUE07OztBQWFiLDBDQUFrQlAsR0FBbEIsZ0JBYmEsNEVBQUgsbUJBQUxvQixLQUFLLHFEQUFYOzs7O0FBaUJQLHFCO0FBQ08sSUFBTUUsTUFBTSxpR0FBRyxrQkFBUXZCLEdBQVIsRUFBYUMsR0FBYjs7QUFFUkksWUFBQUEsSUFGUSxHQUVETCxHQUFHLENBQUNLLElBRkg7QUFHUkcsWUFBQUEsS0FIUSxHQUdBUixHQUFHLENBQUNRLEtBSEo7QUFJSyxpREFBZUgsSUFBSSxDQUFDQyxHQUFwQixDQUpMLFNBSVJKLElBSlE7QUFLUnNCLFlBQUFBLFFBTFEsR0FLR0MsbUJBQUdDLElBQUgsQ0FBUXhCLElBQVIsRUFBYyxFQUFFTSxLQUFLLEVBQUxBLEtBQUYsRUFBZCxDQUxIO0FBTVZnQixZQUFBQSxRQU5VO0FBT0osZ0RBQWNBLFFBQVEsQ0FBQ0csR0FBdkIsQ0FQSTs7QUFTUDFCLFlBQUFBLEdBQUcsQ0FBQ1MsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCLEVBQUVDLEtBQUssRUFBRSxLQUFULEVBQWdCZ0IsT0FBTyxFQUFFLG9CQUF6QixFQUFyQixDQVRPOztBQVdkLDBDQUFrQjNCLEdBQWxCLGdCQVhjLDRFQUFILG1CQUFOc0IsTUFBTSxzREFBWixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2F2ZU5ld1VzZXIsIHZhbGlkYXRlQ3JlZGVudGlhbHMsIHF1ZXJ5Rm9yVXNlcnMsIHVwZGF0ZVVzZXJEYXRhIH0gZnJvbSBcIi4uL2xpYi9zZXJ2aWNlcy91c2VyXCJcbmltcG9ydCB7IHNlbmRFcnJvclJlc3BvbnNlLCBnZW5lcmF0ZUFjY2Vzc1Rva2VuIH0gZnJvbSBcIi4uL2xpYi91dGlscy91dGlsc1wiXG5pbXBvcnQgeyBjaGVja1VzZXJTZXNzaW9ucywgc2V0U2Vzc2lvbiwgZ2V0QWxsU2Vzc2lvbnMsIGRlbGV0ZVNlc3Npb24gfSBmcm9tIFwiLi4vbGliL3NlcnZpY2VzL3JlZGlzLXNlcnZpY2VzXCJcbmltcG9ydCBfXyBmcm9tIFwibG9kYXNoXCJcblxuLyoqIFVzZXIgY3JlYXRpb24gaGFuZGxlciAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVVzZXIgPSBhc3luYyAoIHJlcSwgcmVzICkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7Li4ucmVxLmJvZHl9XG4gICAgICAgIGNvbnN0IGZpbGUgPSB7Li4ucmVxLmZpbGV9XG4gICAgICAgIC8qKiBTYXZlIHVzZXIgZGF0YSAqL1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgc2F2ZU5ld1VzZXIoZGF0YSwgZmlsZSlcbiAgICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZW5lcmF0ZUFjY2Vzc1Rva2VuKHVzZXIuX2lkLnRvU3RyaW5nKCksIFwiMiBob3Vyc1wiKVxuICAgICAgICBhd2FpdCBzZXRTZXNzaW9uKHVzZXIuX2lkLnRvU3RyaW5nKCksIHRva2VuLCByZXEuaXApXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGVycm9yOiBmYWxzZSwgdXNlciwgdG9rZW4gfSlcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBzZW5kRXJyb3JSZXNwb25zZShyZXMsIGVycm9yKVxuICAgIH1cbn1cblxuLyoqIEdldCB1c2VycyAqL1xuZXhwb3J0IGNvbnN0IGdldFVzZXJzID0gYXN5bmMgKCByZXEsIHJlcyApID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgc29ydEJ5OiByZXEuc29ydEJ5LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogcmVxLnBhZ2luYXRpb24sXG4gICAgICAgICAgICBxdWVyeTogcmVxLnF1ZXJ5LFxuICAgICAgICAgICAgcmVxdWVzdFVzZXI6IHJlcS51c2VyXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IGRhdGEsIHRvdGFsTWF0Y2hlcyB9ID0gYXdhaXQgcXVlcnlGb3JVc2VycyhvcHRpb25zKVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgZXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHRvdGFsTWF0Y2hlc1xuICAgICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNlbmRFcnJvclJlc3BvbnNlKHJlcywgZXJyb3IpXG4gICAgfVxufVxuXG4vKiogRWRpdCB1c2VyIGluZm9ybWF0aW9uICovXG5leHBvcnQgY29uc3QgdXBkYXRlVXNlciA9IGFzeW5jICggcmVxLCByZXMgKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsuLi5yZXEuYm9keX1cbiAgICAgICAgY29uc3QgZmlsZSA9IHsuLi5yZXEuZmlsZX1cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHVwZGF0ZVVzZXJEYXRhKHJlcS51c2VyLl9pZCwgZGF0YSwgZmlsZSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXIsXG4gICAgICAgIH0pXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgc2VuZEVycm9yUmVzcG9uc2UocmVzLCBlcnJvcilcbiAgICB9XG59XG5cbi8qKiBHZXQgc2Vzc2lvbiB0b2tlbiAqL1xuZXhwb3J0IGNvbnN0IGxvZ2luID0gYXN5bmMgKCByZXEsIHJlcyApID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gey4uLnJlcS5ib2R5fVxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdmFsaWRhdGVDcmVkZW50aWFscyhkYXRhKVxuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdlbmVyYXRlQWNjZXNzVG9rZW4oU3RyaW5nKHVzZXIuX2lkKSwgXCIyIGhvdXJzXCIpXG4gICAgICAgIGF3YWl0IGNoZWNrVXNlclNlc3Npb25zKHVzZXIuX2lkLnRvU3RyaW5nKCkpXG4gICAgICAgIGF3YWl0IHNldFNlc3Npb24odXNlci5faWQudG9TdHJpbmcoKSwgdG9rZW4sIHJlcS5pcClcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXIsXG4gICAgICAgICAgICB0b2tlblxuICAgICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNlbmRFcnJvclJlc3BvbnNlKHJlcywgZXJyb3IpXG4gICAgfVxufVxuXG4vKiogRGVsZXRlIHNlc3Npb24gKi9cbmV4cG9ydCBjb25zdCBsb2dvdXQgPSBhc3luYyAoIHJlcSwgcmVzICkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSByZXEudXNlcjtcbiAgICAgICAgY29uc3QgdG9rZW4gPSByZXEudG9rZW47XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRBbGxTZXNzaW9ucyh1c2VyLl9pZCk7XG4gICAgICAgIGNvbnN0IF9zZXNzaW9uID0gX18uZmluZChkYXRhLCB7IHRva2VuIH0pO1xuICAgICAgICBpZiAoX3Nlc3Npb24pIHtcbiAgICAgICAgICAgIGF3YWl0IGRlbGV0ZVNlc3Npb24oX3Nlc3Npb24ua2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBlcnJvcjogZmFsc2UsIG1lc3NhZ2U6IFwiU3VjY2Vzc2Z1bGwgbG9nb3V0XCIgfSlcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBzZW5kRXJyb3JSZXNwb25zZShyZXMsIGVycm9yKVxuICAgIH1cbn0iXX0=