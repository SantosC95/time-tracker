"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.listRecordsByTask = exports.closeRecord = exports.createRecord = exports.updateTask = exports.listTasks = exports.createTask = void 0;var _tasks = require("../lib/services/tasks");
var _records = require("../lib/services/records");
var _utils = require("../lib/utils/utils");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(source, true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(source).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var createTask = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {var data, task;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;

            data = _objectSpread({}, req.body);_context.next = 4;return (
              (0, _tasks.saveTaskData)(req.user._id, data));case 4:task = _context.sent;return _context.abrupt("return",
            res.status(200).json({
              error: false,
              task: task }));case 8:_context.prev = 8;_context.t0 = _context["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context.t0);case 11:case "end":return _context.stop();}}}, _callee, null, [[0, 8]]);}));return function createTask(_x, _x2) {return _ref.apply(this, arguments);};}();exports.createTask = createTask;



var listTasks = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {var options, _ref3, data, totalMatches;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;

            options = {
              sortBy: req.sortBy,
              pagination: req.pagination,
              query: req.query,
              requestUser: req.user };_context2.next = 4;return (


              (0, _tasks.queryTasksToDb)(options));case 4:_ref3 = _context2.sent;data = _ref3.data;totalMatches = _ref3.totalMatches;return _context2.abrupt("return",
            res.status(200).json({
              error: false,
              tasks: data,
              totalMatches: totalMatches }));case 10:_context2.prev = 10;_context2.t0 = _context2["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context2.t0);case 13:case "end":return _context2.stop();}}}, _callee2, null, [[0, 10]]);}));return function listTasks(_x3, _x4) {return _ref2.apply(this, arguments);};}();exports.listTasks = listTasks;



var updateTask = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {var data, taskId, updatedTask;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;

            data = _objectSpread({}, req.body);
            taskId = req.params.id;_context3.next = 5;return (
              (0, _tasks.editTaskData)(taskId, req.user._id, data));case 5:updatedTask = _context3.sent;return _context3.abrupt("return",
            res.status(200).json({
              error: false,
              task: updatedTask }));case 9:_context3.prev = 9;_context3.t0 = _context3["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context3.t0);case 12:case "end":return _context3.stop();}}}, _callee3, null, [[0, 9]]);}));return function updateTask(_x5, _x6) {return _ref4.apply(this, arguments);};}();



/** Actions related to time tracking for tasks */exports.updateTask = updateTask;
var createRecord = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {var data, taskId, record;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.prev = 0;

            data = _objectSpread({}, req.body);
            taskId = data.task;_context4.next = 5;return (
              (0, _tasks.checkTaskBelongsToUser)(taskId, req.user._id));case 5:_context4.next = 7;return (
              (0, _records.setNewTaskRecord)(_objectSpread({}, data, { creator: req.user._id })));case 7:record = _context4.sent;return _context4.abrupt("return",
            res.status(200).json({
              error: false,
              record: record }));case 11:_context4.prev = 11;_context4.t0 = _context4["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context4.t0);case 14:case "end":return _context4.stop();}}}, _callee4, null, [[0, 11]]);}));return function createRecord(_x7, _x8) {return _ref5.apply(this, arguments);};}();



/** Stop counter: close open record [Only for reporting using a clock] */exports.createRecord = createRecord;
var closeRecord = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {var taskId, record;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.prev = 0;

            taskId = req.params.taskId;_context5.next = 4;return (
              (0, _tasks.checkTaskBelongsToUser)(taskId, req.user._id));case 4:_context5.next = 6;return (
              (0, _records.closeTaskRecord)(taskId));case 6:record = _context5.sent;return _context5.abrupt("return",
            res.status(200).json({
              error: false,
              record: record }));case 10:_context5.prev = 10;_context5.t0 = _context5["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context5.t0);case 13:case "end":return _context5.stop();}}}, _callee5, null, [[0, 10]]);}));return function closeRecord(_x9, _x10) {return _ref6.apply(this, arguments);};}();



/** Listar registros/reportes de tiempo por tarea */exports.closeRecord = closeRecord;
var listRecordsByTask = /*#__PURE__*/function () {var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {var taskId, _ref8, data, totalMatches;return regeneratorRuntime.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.prev = 0;

            taskId = req.params.taskId;_context6.next = 4;return (
              (0, _tasks.checkTaskBelongsToUser)(taskId, req.user._id));case 4:_context6.next = 6;return (
              (0, _records.listRecords)({
                sortBy: req.sortBy,
                pagination: req.pagination,
                task: taskId }));case 6:_ref8 = _context6.sent;data = _ref8.data;totalMatches = _ref8.totalMatches;return _context6.abrupt("return",


            res.status(200).json({
              error: false,
              records: data,
              totalMatches: totalMatches }));case 12:_context6.prev = 12;_context6.t0 = _context6["catch"](0);


            (0, _utils.sendErrorResponse)(res, _context6.t0);case 15:case "end":return _context6.stop();}}}, _callee6, null, [[0, 12]]);}));return function listRecordsByTask(_x11, _x12) {return _ref7.apply(this, arguments);};}();exports.listRecordsByTask = listRecordsByTask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy90YXNrcy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVUYXNrIiwicmVxIiwicmVzIiwiZGF0YSIsImJvZHkiLCJ1c2VyIiwiX2lkIiwidGFzayIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsImxpc3RUYXNrcyIsIm9wdGlvbnMiLCJzb3J0QnkiLCJwYWdpbmF0aW9uIiwicXVlcnkiLCJyZXF1ZXN0VXNlciIsInRvdGFsTWF0Y2hlcyIsInRhc2tzIiwidXBkYXRlVGFzayIsInRhc2tJZCIsInBhcmFtcyIsImlkIiwidXBkYXRlZFRhc2siLCJjcmVhdGVSZWNvcmQiLCJjcmVhdG9yIiwicmVjb3JkIiwiY2xvc2VSZWNvcmQiLCJsaXN0UmVjb3Jkc0J5VGFzayIsInJlY29yZHMiXSwibWFwcGluZ3MiOiJ5TkFBQTtBQUNBO0FBQ0EsMkM7O0FBRU8sSUFBTUEsVUFBVSxnR0FBRyxpQkFBUUMsR0FBUixFQUFhQyxHQUFiOztBQUVaQyxZQUFBQSxJQUZZLHFCQUVERixHQUFHLENBQUNHLElBRkg7QUFHQyx1Q0FBYUgsR0FBRyxDQUFDSSxJQUFKLENBQVNDLEdBQXRCLEVBQTJCSCxJQUEzQixDQUhELFNBR1pJLElBSFk7QUFJWEwsWUFBQUEsR0FBRyxDQUFDTSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLGNBQUFBLEtBQUssRUFBRSxLQURpQjtBQUV4QkgsY0FBQUEsSUFBSSxFQUFKQSxJQUZ3QixFQUFyQixDQUpXOzs7QUFTbEIsMENBQWtCTCxHQUFsQixlQVRrQix5RUFBSCxtQkFBVkYsVUFBVSxtREFBaEIsQzs7OztBQWFBLElBQU1XLFNBQVMsaUdBQUcsa0JBQVFWLEdBQVIsRUFBYUMsR0FBYjs7QUFFWFUsWUFBQUEsT0FGVyxHQUVEO0FBQ1pDLGNBQUFBLE1BQU0sRUFBRVosR0FBRyxDQUFDWSxNQURBO0FBRVpDLGNBQUFBLFVBQVUsRUFBRWIsR0FBRyxDQUFDYSxVQUZKO0FBR1pDLGNBQUFBLEtB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QjtBQUlZLHdDQUFZO0FBQzdDTyxnQkFBQUEsTUFBTSxFQUFFWixHQUFHLENBQUNZLE1BRGlDO0FBRTdDQyxnQkFBQUEsVUFBVSxFQUFFYixHQUFHLENBQUNhLFVBRjZCO0FBRzdDUCxnQkFBQUEsSUFBSSxFQUFFYSxNQUh1QyxFQUFaLENBSlosZ0NBSWpCakIsSUFKaUIsU0FJakJBLElBSmlCLENBSVhjLFlBSlcsU0FJWEEsWUFKVzs7O0FBVWxCZixZQUFBQSxHQUFHLENBQUNNLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUN4QkMsY0FBQUEsS0FBSyxFQUFFLEtBRGlCO0FBRXhCbUIsY0FBQUEsT0FBTyxFQUFFMUIsSUFGZTtBQUd4QmMsY0FBQUEsWUFBWSxFQUFaQSxZQUh3QixFQUFyQixDQVZrQjs7O0FBZ0J6QiwwQ0FBa0JmLEdBQWxCLGdCQWhCeUIsNEVBQUgsbUJBQWpCMEIsaUJBQWlCLHVEQUF2QixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2F2ZVRhc2tEYXRhLCBxdWVyeVRhc2tzVG9EYiwgZWRpdFRhc2tEYXRhLCBjaGVja1Rhc2tCZWxvbmdzVG9Vc2VyIH0gZnJvbSBcIi4uL2xpYi9zZXJ2aWNlcy90YXNrc1wiXG5pbXBvcnQgeyBzZXROZXdUYXNrUmVjb3JkLCBjbG9zZVRhc2tSZWNvcmQsIGxpc3RSZWNvcmRzIH0gZnJvbSBcIi4uL2xpYi9zZXJ2aWNlcy9yZWNvcmRzXCJcbmltcG9ydCB7IHNlbmRFcnJvclJlc3BvbnNlIH0gZnJvbSBcIi4uL2xpYi91dGlscy91dGlsc1wiXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVUYXNrID0gYXN5bmMgKCByZXEsIHJlcyApID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gey4uLnJlcS5ib2R5fVxuICAgICAgICBjb25zdCB0YXNrID0gYXdhaXQgc2F2ZVRhc2tEYXRhKHJlcS51c2VyLl9pZCwgZGF0YSlcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgIHRhc2tcbiAgICAgICAgfSlcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBzZW5kRXJyb3JSZXNwb25zZShyZXMsIGVycm9yKVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxpc3RUYXNrcyA9IGFzeW5jICggcmVxLCByZXMgKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHNvcnRCeTogcmVxLnNvcnRCeSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHJlcS5wYWdpbmF0aW9uLFxuICAgICAgICAgICAgcXVlcnk6IHJlcS5xdWVyeSxcbiAgICAgICAgICAgIHJlcXVlc3RVc2VyOiByZXEudXNlclxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBkYXRhLCB0b3RhbE1hdGNoZXMgfSA9IGF3YWl0IHF1ZXJ5VGFza3NUb0RiKG9wdGlvbnMpXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgICAgICB0YXNrczogZGF0YSxcbiAgICAgICAgICAgIHRvdGFsTWF0Y2hlc1xuICAgICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNlbmRFcnJvclJlc3BvbnNlKHJlcywgZXJyb3IpXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlVGFzayA9IGFzeW5jICggcmVxLCByZXMgKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgLi4ucmVxLmJvZHkgfVxuICAgICAgICBjb25zdCB0YXNrSWQgPSByZXEucGFyYW1zLmlkXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRUYXNrID0gYXdhaXQgZWRpdFRhc2tEYXRhKHRhc2tJZCwgcmVxLnVzZXIuX2lkLCBkYXRhKVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgZXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgdGFzazogdXBkYXRlZFRhc2tcbiAgICAgICAgfSlcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBzZW5kRXJyb3JSZXNwb25zZShyZXMsIGVycm9yKVxuICAgIH1cbn1cblxuLyoqIEFjdGlvbnMgcmVsYXRlZCB0byB0aW1lIHRyYWNraW5nIGZvciB0YXNrcyAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVJlY29yZCA9IGFzeW5jICggcmVxLCByZXMgKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgLi4ucmVxLmJvZHkgfVxuICAgICAgICBjb25zdCB0YXNrSWQgPSBkYXRhLnRhc2tcbiAgICAgICAgYXdhaXQgY2hlY2tUYXNrQmVsb25nc1RvVXNlcih0YXNrSWQsIHJlcS51c2VyLl9pZClcbiAgICAgICAgY29uc3QgcmVjb3JkID0gYXdhaXQgc2V0TmV3VGFza1JlY29yZCh7IC4uLmRhdGEsIGNyZWF0b3I6IHJlcS51c2VyLl9pZCB9KVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgZXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgcmVjb3JkXG4gICAgICAgIH0pXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgc2VuZEVycm9yUmVzcG9uc2UocmVzLCBlcnJvcilcbiAgICB9XG59XG5cbi8qKiBTdG9wIGNvdW50ZXI6IGNsb3NlIG9wZW4gcmVjb3JkIFtPbmx5IGZvciByZXBvcnRpbmcgdXNpbmcgYSBjbG9ja10gKi9cbmV4cG9ydCBjb25zdCBjbG9zZVJlY29yZCA9IGFzeW5jICggcmVxLCByZXMgKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdGFza0lkID0gcmVxLnBhcmFtcy50YXNrSWRcbiAgICAgICAgYXdhaXQgY2hlY2tUYXNrQmVsb25nc1RvVXNlcih0YXNrSWQsIHJlcS51c2VyLl9pZClcbiAgICAgICAgY29uc3QgcmVjb3JkID0gYXdhaXQgY2xvc2VUYXNrUmVjb3JkKHRhc2tJZClcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgIHJlY29yZFxuICAgICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNlbmRFcnJvclJlc3BvbnNlKHJlcywgZXJyb3IpXG4gICAgfVxufVxuXG4vKiogTGlzdGFyIHJlZ2lzdHJvcy9yZXBvcnRlcyBkZSB0aWVtcG8gcG9yIHRhcmVhICovXG5leHBvcnQgY29uc3QgbGlzdFJlY29yZHNCeVRhc2sgPSBhc3luYyAoIHJlcSwgcmVzICkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRhc2tJZCA9IHJlcS5wYXJhbXMudGFza0lkXG4gICAgICAgIGF3YWl0IGNoZWNrVGFza0JlbG9uZ3NUb1VzZXIodGFza0lkLCByZXEudXNlci5faWQpXG4gICAgICAgIGNvbnN0IHsgZGF0YSwgdG90YWxNYXRjaGVzIH0gPSBhd2FpdCBsaXN0UmVjb3Jkcyh7XG4gICAgICAgICAgICBzb3J0Qnk6IHJlcS5zb3J0QnksXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiByZXEucGFnaW5hdGlvbixcbiAgICAgICAgICAgIHRhc2s6IHRhc2tJZFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgICAgICByZWNvcmRzOiBkYXRhLFxuICAgICAgICAgICAgdG90YWxNYXRjaGVzXG4gICAgICAgIH0pXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgc2VuZEVycm9yUmVzcG9uc2UocmVzLCBlcnJvcilcbiAgICB9XG59XG4iXX0=