"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.updateProject = exports.listProjects = exports.createProject = void 0;var _projects = require("../lib/services/projects");
var _utils = require("../lib/utils/utils");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(source, true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(source).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var createProject = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {var data, project;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;

            /** Create data object */
            data = _objectSpread({}, req.body);_context.next = 4;return (
              (0, _projects.saveProjectData)(req.user._id, data));case 4:project = _context.sent;return _context.abrupt("return",
            res.status(200).json({
              error: false,
              project: project }));case 8:_context.prev = 8;_context.t0 = _context["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context.t0);case 11:case "end":return _context.stop();}}}, _callee, null, [[0, 8]]);}));return function createProject(_x, _x2) {return _ref.apply(this, arguments);};}();exports.createProject = createProject;



var listProjects = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {var _ref3, data, totalMatches;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;_context2.next = 3;return (

              (0, _projects.findProjectsQuery)({
                sortBy: req.sortBy,
                pagination: req.pagination,
                query: req.query,
                requestUser: req.user }));case 3:_ref3 = _context2.sent;data = _ref3.data;totalMatches = _ref3.totalMatches;return _context2.abrupt("return",


            res.status(200).json({
              error: false,
              data: data,
              totalMatches: totalMatches }));case 9:_context2.prev = 9;_context2.t0 = _context2["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context2.t0);case 12:case "end":return _context2.stop();}}}, _callee2, null, [[0, 9]]);}));return function listProjects(_x3, _x4) {return _ref2.apply(this, arguments);};}();exports.listProjects = listProjects;




var updateProject = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {var data, projectId, savedProject;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;

            data = _objectSpread({}, req.body);
            projectId = req.params.id;_context3.next = 5;return (
              (0, _projects.editProject)(projectId, req.user._id, data));case 5:savedProject = _context3.sent;return _context3.abrupt("return",
            res.status(200).json({
              error: false,
              project: savedProject }));case 9:_context3.prev = 9;_context3.t0 = _context3["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context3.t0);case 12:case "end":return _context3.stop();}}}, _callee3, null, [[0, 9]]);}));return function updateProject(_x5, _x6) {return _ref4.apply(this, arguments);};}();exports.updateProject = updateProject;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wcm9qZWN0cy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVQcm9qZWN0IiwicmVxIiwicmVzIiwiZGF0YSIsImJvZHkiLCJ1c2VyIiwiX2lkIiwicHJvamVjdCIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsImxpc3RQcm9qZWN0cyIsInNvcnRCeSIsInBhZ2luYXRpb24iLCJxdWVyeSIsInJlcXVlc3RVc2VyIiwidG90YWxNYXRjaGVzIiwidXBkYXRlUHJvamVjdCIsInByb2plY3RJZCIsInBhcmFtcyIsImlkIiwic2F2ZWRQcm9qZWN0Il0sIm1hcHBpbmdzIjoieUpBQUE7QUFDQSwyQzs7QUFFTyxJQUFNQSxhQUFhLGdHQUFHLGlCQUFRQyxHQUFSLEVBQWFDLEdBQWI7O0FBRXJCO0FBQ01DLFlBQUFBLElBSGUscUJBR0pGLEdBQUcsQ0FBQ0csSUFIQTtBQUlDLDZDQUFnQkgsR0FBRyxDQUFDSSxJQUFKLENBQVNDLEdBQXpCLEVBQThCSCxJQUE5QixDQUpELFNBSWZJLE9BSmU7QUFLZEwsWUFBQUEsR0FBRyxDQUFDTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLGNBQUFBLEtBQUssRUFBRSxLQURpQjtBQUV4QkgsY0FBQUEsT0FBTyxFQUFQQSxPQUZ3QixFQUFyQixDQUxjOzs7QUFVckIsMENBQWtCTCxHQUFsQixlQVZxQix5RUFBSCxtQkFBYkYsYUFBYSxtREFBbkIsQzs7OztBQWNBLElBQU1XLFlBQVksaUdBQUcsa0JBQVFWLEdBQVIsRUFBYUMsR0FBYjs7QUFFaUIsK0NBQWtCO0FBQ25EVSxnQkFBQUEsTUFBTSxFQUFFWCxHQUFHLENBQUNXLE1BRHVDO0FBRW5EQyxnQkFBQUEsVUFBVSxFQUFFWixHQUFHLENBQUNZLFVBRm1DO0FBR25EQyxnQkFBQUEsS0FBSyxFQUFFYixHQUFHLENBQUNhLEtBSHdDO0FBSW5EQyxnQkFBQUEsV0FBVyxFQUFFZCxHQUFHLENBQUNJLElBSmtDLEVBQWxCLENBRmpCLGdDQUVaRixJQUZZLFNBRVpBLElBRlksQ0FFTmEsWUFGTSxTQUVOQSxZQUZNOzs7QUFTYmQsWUFBQUEsR0FBRyxDQUFDTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLGNBQUFBLEtBQUssRUFBRSxLQURpQjtBQUV4QlAsY0FBQUEsSUFBSSxFQUFKQSxJQUZ3QjtBQUd4QmEsY0FBQUEsWUFBWSxFQUFaQSxZQUh3QixFQUFyQixDQVRhOzs7QUFlcEIsMENBQWtCZCxHQUFsQixnQkFmb0IsMkVBQUgsbUJBQVpTLFlBQVkscURBQWxCLEM7Ozs7O0FBb0JBLElBQU1NLGFBQWEsaUdBQUcsa0JBQVFoQixHQUFSLEVBQWFDLEdBQWI7O0FBRWZDLFlBQUFBLElBRmUscUJBRUpGLEdBQUcsQ0FBQ0csSUFGQTtBQUdmYyxZQUFBQSxTQUhlLEdBR0hqQixHQUFHLENBQUNrQixNQUFKLENBQVdDLEVBSFI7QUFJTSx5Q0FBWUYsU0FBWixFQUF1QmpCLEdBQUcsQ0FBQ0ksSUFBSixDQUFTQyxHQUFoQyxFQUFxQ0gsSUFBckMsQ0FKTixTQUlma0IsWUFKZTtBQUtkbkIsWUFBQUEsR0FBRyxDQUFDTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLGNBQUFBLEtBQUssRUFBRSxLQURpQjtBQUV4QkgsY0FBQUEsT0FBTyxFQUFFYyxZQUZlLEVBQXJCLENBTGM7OztBQVVyQiwwQ0FBa0JuQixHQUFsQixnQkFWcUIsMkVBQUgsbUJBQWJlLGFBQWEscURBQW5CLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzYXZlUHJvamVjdERhdGEsIGZpbmRQcm9qZWN0c1F1ZXJ5LCBlZGl0UHJvamVjdCB9IGZyb20gXCIuLi9saWIvc2VydmljZXMvcHJvamVjdHNcIlxuaW1wb3J0IHsgc2VuZEVycm9yUmVzcG9uc2UgfSBmcm9tIFwiLi4vbGliL3V0aWxzL3V0aWxzXCJcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVByb2plY3QgPSBhc3luYyAoIHJlcSwgcmVzICkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIC8qKiBDcmVhdGUgZGF0YSBvYmplY3QgKi9cbiAgICAgICAgY29uc3QgZGF0YSA9IHsuLi5yZXEuYm9keX1cbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGF3YWl0IHNhdmVQcm9qZWN0RGF0YShyZXEudXNlci5faWQsIGRhdGEpXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgICAgICBwcm9qZWN0XG4gICAgICAgIH0pXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgc2VuZEVycm9yUmVzcG9uc2UocmVzLCBlcnJvcilcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBsaXN0UHJvamVjdHMgPSBhc3luYyAoIHJlcSwgcmVzICkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YSwgdG90YWxNYXRjaGVzIH0gPSBhd2FpdCBmaW5kUHJvamVjdHNRdWVyeSh7XG4gICAgICAgICAgICBzb3J0Qnk6IHJlcS5zb3J0QnksXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiByZXEucGFnaW5hdGlvbixcbiAgICAgICAgICAgIHF1ZXJ5OiByZXEucXVlcnksXG4gICAgICAgICAgICByZXF1ZXN0VXNlcjogcmVxLnVzZXJcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgZXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHRvdGFsTWF0Y2hlc1xuICAgICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNlbmRFcnJvclJlc3BvbnNlKHJlcywgZXJyb3IpXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCB1cGRhdGVQcm9qZWN0ID0gYXN5bmMgKCByZXEsIHJlcyApID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gey4uLnJlcS5ib2R5fVxuICAgICAgICBjb25zdCBwcm9qZWN0SWQgPSByZXEucGFyYW1zLmlkXG4gICAgICAgIGNvbnN0IHNhdmVkUHJvamVjdCA9IGF3YWl0IGVkaXRQcm9qZWN0KHByb2plY3RJZCwgcmVxLnVzZXIuX2lkLCBkYXRhKVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgZXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgcHJvamVjdDogc2F2ZWRQcm9qZWN0XG4gICAgICAgIH0pXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgc2VuZEVycm9yUmVzcG9uc2UocmVzLCBlcnJvcilcbiAgICB9XG59Il19