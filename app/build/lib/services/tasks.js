"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.checkTaskBelongsToUser = exports.editTaskData = exports.queryTasksToDb = exports.saveTaskData = void 0;var _tasks = _interopRequireDefault(require("../../mongo/models/tasks"));
var _error = require("../errors/error");
var _projects = require("./projects");
var _records = require("./records");
var _lodash = _interopRequireDefault(require("lodash"));
var _bluebird = _interopRequireDefault(require("bluebird"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(source, true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(source).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var saveTaskData = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId, data) {var task, data_error;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            data.creator = userId;
            /** Si se asigna projectID a la tarea */if (!
            data.projectId) {_context.next = 4;break;}_context.next = 4;return (
              (0, _projects.userBelongsToProject)(userId, data.projectId));case 4:

            task = new _tasks["default"](data);
            data_error = task.validateSync();if (!
            data_error) {_context.next = 8;break;}throw (
              new _error.TaskCreationError(null, data_error.errors));case 8:return _context.abrupt("return",

            task.save());case 9:case "end":return _context.stop();}}}, _callee);}));return function saveTaskData(_x, _x2) {return _ref.apply(this, arguments);};}();exports.saveTaskData = saveTaskData;


var queryTasksToDb = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {var sortBy, pagination, query, user, q, _ref3, _ref4, data, totalMatches;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:

            sortBy =



            options.sortBy, pagination = options.pagination, query = options.query, user = options.requestUser;

            q = { active: true };

            if (query.search) {
              q.$text = {
                $search: query.search };

            }if (!

            query.projects) {_context3.next = 10;break;}_context3.next = 6;return (

              (0, _projects.getProjectAssociated)(
              user._id,
              query.projects.split("|")));case 6:_context3.t0 = _context3.sent;q.projectId = { $in: _context3.t0 };_context3.next = 17;break;case 10:_context3.t1 =




            { creator: user._id };_context3.next = 13;return (


              (0, _projects.getProjectAssociated)(user._id));case 13:_context3.t2 = _context3.sent;_context3.t3 = { $in: _context3.t2 };_context3.t4 = { projectId: _context3.t3 };q.$or = [_context3.t1, _context3.t4];case 17:_context3.next = 19;return (





              Promise.all([
              _tasks["default"].find(q).
              skip(pagination.from).
              limit(pagination.size).
              populate('projectId', 'name description').
              populate('creator', 'name lastname img_key').
              select('-__v').
              collation({
                locale: 'en_US',
                strength: 1,
                caseLevel: true }).

              sort(sortBy || '-createdAt'),

              _tasks["default"].find(q).
              countDocuments()]));case 19:_ref3 = _context3.sent;_ref4 = _slicedToArray(_ref3, 2);data = _ref4[0];totalMatches = _ref4[1];_context3.next = 25;return (



              _bluebird["default"].map(data, /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(task) {return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.t0 = _objectSpread;_context2.t1 = {};_context2.t2 =

                          task.toObject();_context2.next = 5;return (
                            task.getTimes());case 5:_context2.t3 = _context2.sent;_context2.t4 = { loggedTime: _context2.t3 };return _context2.abrupt("return", (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t4));case 8:case "end":return _context2.stop();}}}, _callee2);}));return function (_x4) {return _ref5.apply(this, arguments);};}()));case 25:_context3.t5 = _context3.sent;_context3.t6 =


            totalMatches;return _context3.abrupt("return", { data: _context3.t5, totalMatches: _context3.t6 });case 28:case "end":return _context3.stop();}}}, _callee3);}));return function queryTasksToDb(_x3) {return _ref2.apply(this, arguments);};}();exports.queryTasksToDb = queryTasksToDb;



var editTaskData = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(taskId, userId, data) {var task, data_error;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
              _tasks["default"].findById(taskId));case 2:task = _context4.sent;if (
            task) {_context4.next = 5;break;}throw (
              new _error.TaskNotFoundError());case 5:if (


            task.creator.equals(userId)) {_context4.next = 7;break;}throw (
              new _error.NotAllowedActionError());case 7:if (!



            data.projectId) {_context4.next = 10;break;}_context4.next = 10;return (
              (0, _projects.userBelongsToProject)(userId, data.projectId));case 10:if (!(


            data.state === "FINISHED")) {_context4.next = 13;break;}_context4.next = 13;return (
              (0, _records.closeTaskRecord)(task._id, false));case 13:


            _lodash["default"].merge(task, data);
            data_error = task.validateSync();if (!
            data_error) {_context4.next = 17;break;}throw (
              new _error.TaskCreationError(null, data_error.errors));case 17:return _context4.abrupt("return",


            task.save());case 18:case "end":return _context4.stop();}}}, _callee4);}));return function editTaskData(_x5, _x6, _x7) {return _ref6.apply(this, arguments);};}();exports.editTaskData = editTaskData;


var checkTaskBelongsToUser = /*#__PURE__*/function () {var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(taskId, userId) {var task;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              _tasks["default"].findOne({
                _id: taskId,
                creator: userId }));case 2:task = _context5.sent;if (


            task) {_context5.next = 5;break;}throw (
              new _error.NotAllowedActionError());case 5:case "end":return _context5.stop();}}}, _callee5);}));return function checkTaskBelongsToUser(_x8, _x9) {return _ref7.apply(this, arguments);};}();exports.checkTaskBelongsToUser = checkTaskBelongsToUser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZXMvdGFza3MuanMiXSwibmFtZXMiOlsic2F2ZVRhc2tEYXRhIiwidXNlcklkIiwiZGF0YSIsImNyZWF0b3IiLCJwcm9qZWN0SWQiLCJ0YXNrIiwiVGFza3MiLCJkYXRhX2Vycm9yIiwidmFsaWRhdGVTeW5jIiwiVGFza0NyZWF0aW9uRXJyb3IiLCJlcnJvcnMiLCJzYXZlIiwicXVlcnlUYXNrc1RvRGIiLCJvcHRpb25zIiwic29ydEJ5IiwicGFnaW5hdGlvbiIsInF1ZXJ5IiwidXNlciIsInJlcXVlc3RVc2VyIiwicSIsImFjdGl2ZSIsInNlYXJjaCIsIiR0ZXh0IiwiJHNlYXJjaCIsInByb2plY3RzIiwiX2lkIiwic3BsaXQiLCIkaW4iLCIkb3IiLCJQcm9taXNlIiwiYWxsIiwiZmluZCIsInNraXAiLCJmcm9tIiwibGltaXQiLCJzaXplIiwicG9wdWxhdGUiLCJzZWxlY3QiLCJjb2xsYXRpb24iLCJsb2NhbGUiLCJzdHJlbmd0aCIsImNhc2VMZXZlbCIsInNvcnQiLCJjb3VudERvY3VtZW50cyIsInRvdGFsTWF0Y2hlcyIsIl9fUHJvbWlzZV9fIiwibWFwIiwidG9PYmplY3QiLCJnZXRUaW1lcyIsImxvZ2dlZFRpbWUiLCJlZGl0VGFza0RhdGEiLCJ0YXNrSWQiLCJmaW5kQnlJZCIsIlRhc2tOb3RGb3VuZEVycm9yIiwiZXF1YWxzIiwiTm90QWxsb3dlZEFjdGlvbkVycm9yIiwic3RhdGUiLCJfXyIsIm1lcmdlIiwiY2hlY2tUYXNrQmVsb25nc1RvVXNlciIsImZpbmRPbmUiXSwibWFwcGluZ3MiOiIwTEFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEQ7O0FBRU8sSUFBTUEsWUFBWSxnR0FBRyxpQkFBUUMsTUFBUixFQUFnQkMsSUFBaEI7QUFDeEJBLFlBQUFBLElBQUksQ0FBQ0MsT0FBTCxHQUFlRixNQUFmO0FBQ0Esb0RBRndCO0FBR3BCQyxZQUFBQSxJQUFJLENBQUNFLFNBSGU7QUFJZCxrREFBcUJI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b2RlbHMvdGFza3NcIlxuaW1wb3J0IHsgVGFza0NyZWF0aW9uRXJyb3IsIFRhc2tOb3RGb3VuZEVycm9yLCBOb3RBbGxvd2VkQWN0aW9uRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL2Vycm9yXCJcbmltcG9ydCB7IGdldFByb2plY3RBc3NvY2lhdGVkLCB1c2VyQmVsb25nc1RvUHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RzXCJcbmltcG9ydCB7IGNsb3NlVGFza1JlY29yZCB9IGZyb20gXCIuL3JlY29yZHNcIlxuaW1wb3J0IF9fIGZyb20gXCJsb2Rhc2hcIlxuaW1wb3J0IF9fUHJvbWlzZV9fIGZyb20gXCJibHVlYmlyZFwiXG5cbmV4cG9ydCBjb25zdCBzYXZlVGFza0RhdGEgPSBhc3luYyAoIHVzZXJJZCwgZGF0YSApID0+IHtcbiAgICBkYXRhLmNyZWF0b3IgPSB1c2VySWRcbiAgICAvKiogU2kgc2UgYXNpZ25hIHByb2plY3RJRCBhIGxhIHRhcmVhICovXG4gICAgaWYgKGRhdGEucHJvamVjdElkKSB7XG4gICAgICAgIGF3YWl0IHVzZXJCZWxvbmdzVG9Qcm9qZWN0KHVzZXJJZCwgZGF0YS5wcm9qZWN0SWQpXG4gICAgfVxuICAgIGxldCB0YXNrID0gbmV3IFRhc2tzKGRhdGEpXG4gICAgY29uc3QgZGF0YV9lcnJvciA9IHRhc2sudmFsaWRhdGVTeW5jKCk7XG4gICAgaWYgKGRhdGFfZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFRhc2tDcmVhdGlvbkVycm9yKG51bGwsIGRhdGFfZXJyb3IuZXJyb3JzKVxuICAgIH1cbiAgICByZXR1cm4gdGFzay5zYXZlKClcbn1cblxuZXhwb3J0IGNvbnN0IHF1ZXJ5VGFza3NUb0RiID0gYXN5bmMgKCBvcHRpb25zICkgPT4ge1xuICAgIGNvbnN0IHsgXG4gICAgICAgIHNvcnRCeSwgXG4gICAgICAgIHBhZ2luYXRpb24sIFxuICAgICAgICBxdWVyeSwgXG4gICAgICAgIHJlcXVlc3RVc2VyOiB1c2VyXG4gICAgfSA9IG9wdGlvbnNcblxuICAgIGxldCBxID0geyBhY3RpdmU6IHRydWUgfVxuXG4gICAgaWYgKHF1ZXJ5LnNlYXJjaCkge1xuICAgICAgICBxLiR0ZXh0ID0ge1xuICAgICAgICAgICAgJHNlYXJjaDogcXVlcnkuc2VhcmNoXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocXVlcnkucHJvamVjdHMpIHtcbiAgICAgICAgcS5wcm9qZWN0SWQgPSB7XG4gICAgICAgICAgICAkaW46IGF3YWl0IGdldFByb2plY3RBc3NvY2lhdGVkKFxuICAgICAgICAgICAgICAgIHVzZXIuX2lkLCBcbiAgICAgICAgICAgICAgICBxdWVyeS5wcm9qZWN0cy5zcGxpdChcInxcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHEuJG9yID0gW1xuICAgICAgICAgICAgeyBjcmVhdG9yOiB1c2VyLl9pZCB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHByb2plY3RJZDoge1xuICAgICAgICAgICAgICAgICAgICAkaW46IGF3YWl0IGdldFByb2plY3RBc3NvY2lhdGVkKHVzZXIuX2lkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cblxuICAgIGNvbnN0IFsgZGF0YSwgdG90YWxNYXRjaGVzIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIFRhc2tzLmZpbmQocSlcbiAgICAgICAgICAgIC5za2lwKHBhZ2luYXRpb24uZnJvbSlcbiAgICAgICAgICAgIC5saW1pdChwYWdpbmF0aW9uLnNpemUpXG4gICAgICAgICAgICAucG9wdWxhdGUoJ3Byb2plY3RJZCcsICduYW1lIGRlc2NyaXB0aW9uJylcbiAgICAgICAgICAgIC5wb3B1bGF0ZSgnY3JlYXRvcicsICduYW1lIGxhc3RuYW1lIGltZ19rZXknKVxuICAgICAgICAgICAgLnNlbGVjdCgnLV9fdicpXG4gICAgICAgICAgICAuY29sbGF0aW9uKHtcbiAgICAgICAgICAgICAgICBsb2NhbGU6ICdlbl9VUycsXG4gICAgICAgICAgICAgICAgc3RyZW5ndGg6IDEsXG4gICAgICAgICAgICAgICAgY2FzZUxldmVsOiB0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnNvcnQoc29ydEJ5IHx8ICctY3JlYXRlZEF0JyksXG5cbiAgICAgICAgVGFza3MuZmluZChxKVxuICAgICAgICAgICAgLmNvdW50RG9jdW1lbnRzKClcbiAgICBdKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogYXdhaXQgX19Qcm9taXNlX18ubWFwKGRhdGEsIGFzeW5jICggdGFzayApID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4udGFzay50b09iamVjdCgpLFxuICAgICAgICAgICAgICAgIGxvZ2dlZFRpbWU6IGF3YWl0IHRhc2suZ2V0VGltZXMoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgdG90YWxNYXRjaGVzXG4gICAgfVxufSBcblxuZXhwb3J0IGNvbnN0IGVkaXRUYXNrRGF0YSA9IGFzeW5jICggdGFza0lkLCB1c2VySWQsIGRhdGEgKSA9PiB7XG4gICAgY29uc3QgdGFzayA9IGF3YWl0IFRhc2tzLmZpbmRCeUlkKHRhc2tJZClcbiAgICBpZiAoIXRhc2spIHtcbiAgICAgICAgdGhyb3cgbmV3IFRhc2tOb3RGb3VuZEVycm9yKClcbiAgICB9XG5cbiAgICBpZiAoIXRhc2suY3JlYXRvci5lcXVhbHModXNlcklkKSkge1xuICAgICAgICB0aHJvdyBuZXcgTm90QWxsb3dlZEFjdGlvbkVycm9yKClcbiAgICB9XG5cbiAgICAvKiogU2kgc2UgYXNpZ25hIHByb2plY3RJRCBhIGxhIHRhcmVhICovXG4gICAgaWYgKGRhdGEucHJvamVjdElkKSB7XG4gICAgICAgIGF3YWl0IHVzZXJCZWxvbmdzVG9Qcm9qZWN0KHVzZXJJZCwgZGF0YS5wcm9qZWN0SWQpXG4gICAgfVxuXG4gICAgaWYgKGRhdGEuc3RhdGUgPT09IFwiRklOSVNIRURcIikge1xuICAgICAgICBhd2FpdCBjbG9zZVRhc2tSZWNvcmQodGFzay5faWQsIGZhbHNlKVxuICAgIH1cblxuICAgIF9fLm1lcmdlKHRhc2ssIGRhdGEpXG4gICAgY29uc3QgZGF0YV9lcnJvciA9IHRhc2sudmFsaWRhdGVTeW5jKCk7XG4gICAgaWYgKGRhdGFfZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFRhc2tDcmVhdGlvbkVycm9yKG51bGwsIGRhdGFfZXJyb3IuZXJyb3JzKVxuICAgIH1cblxuICAgIHJldHVybiB0YXNrLnNhdmUoKVxufVxuXG5leHBvcnQgY29uc3QgY2hlY2tUYXNrQmVsb25nc1RvVXNlciA9IGFzeW5jICggdGFza0lkLCB1c2VySWQgKSA9PiB7XG4gICAgY29uc3QgdGFzayA9IGF3YWl0IFRhc2tzLmZpbmRPbmUoe1xuICAgICAgICBfaWQ6IHRhc2tJZCxcbiAgICAgICAgY3JlYXRvcjogdXNlcklkXG4gICAgfSlcblxuICAgIGlmICghdGFzaykge1xuICAgICAgICB0aHJvdyBuZXcgTm90QWxsb3dlZEFjdGlvbkVycm9yKClcbiAgICB9XG59Il19