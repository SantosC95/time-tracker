"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.userBelongsToProject = exports.getProjectAssociated = exports.editProject = exports.findProjectsQuery = exports.saveProjectData = void 0;var _projects = _interopRequireDefault(require("../../mongo/models/projects"));
var _tasks = _interopRequireDefault(require("../../mongo/models/tasks"));
var _error = require("../errors/error");
var _lodash = _interopRequireDefault(require("lodash"));
var _bluebird = _interopRequireDefault(require("bluebird"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(source, true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(source).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var saveProjectData = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId, data) {var project, data_error;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            if (!data.users.some(function (u) {return u === userId;})) {
              data.users.push(userId);
            }
            data.creator = userId;
            project = new _projects["default"](data);
            data_error = project.validateSync();if (!
            data_error) {_context.next = 6;break;}throw (
              new _error.ProjectCreationError(null, data_error.errors));case 6:return _context.abrupt("return",

            project.save());case 7:case "end":return _context.stop();}}}, _callee);}));return function saveProjectData(_x, _x2) {return _ref.apply(this, arguments);};}();exports.saveProjectData = saveProjectData;


var findProjectsQuery = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {var sortBy, pagination, query, user, q, _ref3, _ref4, data, totalMatches, projects;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:

            sortBy =



            options.sortBy, pagination = options.pagination, query = options.query, user = options.requestUser;

            q = {};
            if (query.search) {
              q.$text = {
                $search: query.search };

            }

            if (query.users === "me") {
              q.creator = user._id;
            }

            if (query.state === "active") {
              q.active = true;
            }

            if (query.state === "inactive") {
              q.active = false;
            }_context3.next = 8;return (

              Promise.all([
              _projects["default"].find(q).
              populate('creator', 'name lastname email phone img_key').
              skip(pagination.from).
              limit(pagination.size).
              select('-__v').
              collation({
                locale: 'en_US',
                strength: 1,
                caseLevel: true }).

              sort(sortBy || '-createdAt'),

              _projects["default"].find(q).
              countDocuments()]));case 8:_ref3 = _context3.sent;_ref4 = _slicedToArray(_ref3, 2);data = _ref4[0];totalMatches = _ref4[1];_context3.next = 14;return (


              _bluebird["default"].map(data, /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(d) {return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.t0 = _objectSpread;_context2.t1 = {};_context2.t2 =

                          d.toObject();_context2.next = 5;return (
                            d.getUsersAssociated(user._id));case 5:_context2.t3 = _context2.sent;_context2.t4 = { users: _context2.t3 };_context2.next = 9;return (
                            d.getTimes());case 9:_context2.t5 = _context2.sent;return _context2.abrupt("return", (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t4, _context2.t5));case 11:case "end":return _context2.stop();}}}, _callee2);}));return function (_x4) {return _ref5.apply(this, arguments);};}()));case 14:projects = _context3.sent;return _context3.abrupt("return",



            {
              data: projects,
              totalMatches: totalMatches });case 16:case "end":return _context3.stop();}}}, _callee3);}));return function findProjectsQuery(_x3) {return _ref2.apply(this, arguments);};}();exports.findProjectsQuery = findProjectsQuery;



var editProject = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(projectId, userId, data) {var project, data_error;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
              _projects["default"].findById(projectId));case 2:project = _context4.sent;if (
            project) {_context4.next = 5;break;}throw (
              new _error.ProjectNotFoundError());case 5:if (


            project.creator.equals(userId)) {_context4.next = 7;break;}throw (
              new _error.NotAllowedActionError());case 7:


            _lodash["default"].merge(project, data);
            if (data.users && Array.isArray(data.users)) {
              if (!data.users.some(function (u) {return project.creator.equals(u);})) {
                data.users.push(project.creator);
              }
              project.users = data.users;
            }

            data_error = project.validateSync();if (!
            data_error) {_context4.next = 12;break;}throw (
              new _error.ProjectCreationError(null, data_error.errors));case 12:if (


            project.active) {_context4.next = 15;break;}_context4.next = 15;return (
              _tasks["default"].updateMany({ projectId: project.id }, { active: false }));case 15:return _context4.abrupt("return",


            project.save());case 16:case "end":return _context4.stop();}}}, _callee4);}));return function editProject(_x5, _x6, _x7) {return _ref6.apply(this, arguments);};}();exports.editProject = editProject;


var getProjectAssociated = /*#__PURE__*/function () {var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userId) {var filter,projects,_args5 = arguments;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:filter = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : [];_context5.next = 3;return (
              _projects["default"].find({ users: userId }).
              select('_id').
              lean());case 3:projects = _context5.sent;

            if (filter.length !== 0) {
              projects = projects.filter(function (p) {return filter.some(function (f) {return p._id.equals(f);});});
            }return _context5.abrupt("return",

            projects.map(function (p) {return p._id;}));case 6:case "end":return _context5.stop();}}}, _callee5);}));return function getProjectAssociated(_x8) {return _ref7.apply(this, arguments);};}();exports.getProjectAssociated = getProjectAssociated;


var userBelongsToProject = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId, projectId) {var project;return regeneratorRuntime.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
              _projects["default"].findOne({ users: userId, _id: projectId }));case 2:project = _context6.sent;if (
            project) {_context6.next = 5;break;}throw (
              new _error.ProjectAssociationError());case 5:case "end":return _context6.stop();}}}, _callee6);}));return function userBelongsToProject(_x9, _x10) {return _ref8.apply(this, arguments);};}();exports.userBelongsToProject = userBelongsToProject;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZXMvcHJvamVjdHMuanMiXSwibmFtZXMiOlsic2F2ZVByb2plY3REYXRhIiwidXNlcklkIiwiZGF0YSIsInVzZXJzIiwic29tZSIsInUiLCJwdXNoIiwiY3JlYXRvciIsInByb2plY3QiLCJQcm9qZWN0IiwiZGF0YV9lcnJvciIsInZhbGlkYXRlU3luYyIsIlByb2plY3RDcmVhdGlvbkVycm9yIiwiZXJyb3JzIiwic2F2ZSIsImZpbmRQcm9qZWN0c1F1ZXJ5Iiwib3B0aW9ucyIsInNvcnRCeSIsInBhZ2luYXRpb24iLCJxdWVyeSIsInVzZXIiLCJyZXF1ZXN0VXNlciIsInEiLCJzZWFyY2giLCIkdGV4dCIsIiRzZWFyY2giLCJfaWQiLCJzdGF0ZSIsImFjdGl2ZSIsIlByb21pc2UiLCJhbGwiLCJmaW5kIiwicG9wdWxhdGUiLCJza2lwIiwiZnJvbSIsImxpbWl0Iiwic2l6ZSIsInNlbGVjdCIsImNvbGxhdGlvbiIsImxvY2FsZSIsInN0cmVuZ3RoIiwiY2FzZUxldmVsIiwic29ydCIsImNvdW50RG9jdW1lbnRzIiwidG90YWxNYXRjaGVzIiwiX19Qcm9taXNlX18iLCJtYXAiLCJkIiwidG9PYmplY3QiLCJnZXRVc2Vyc0Fzc29jaWF0ZWQiLCJnZXRUaW1lcyIsInByb2plY3RzIiwiZWRpdFByb2plY3QiLCJwcm9qZWN0SWQiLCJmaW5kQnlJZCIsIlByb2plY3ROb3RGb3VuZEVycm9yIiwiZXF1YWxzIiwiTm90QWxsb3dlZEFjdGlvbkVycm9yIiwiX18iLCJtZXJnZSIsIkFycmF5IiwiaXNBcnJheSIsIlRhc2siLCJ1cGRhdGVNYW55IiwiaWQiLCJnZXRQcm9qZWN0QXNzb2NpYXRlZCIsImZpbHRlciIsImxlYW4iLCJsZW5ndGgiLCJwIiwiZiIsInVzZXJCZWxvbmdzVG9Qcm9qZWN0IiwiZmluZE9uZSIsIlByb2plY3RBc3NvY2lhdGlvbkVycm9yIl0sIm1hcHBpbmdzIjoiNE5BQUE7QUFDQTtBQUNBO0FBQ0E7QUFD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QXRCLEVBQWhCLENBRFUsU0FDMUI3QyxPQUQwQjtBQUUzQkEsWUFBQUEsT0FGMkI7QUFHdEIsa0JBQUlpRSw4QkFBSixFQUhzQiw0REFBSCxtQkFBcEJGLG9CQUFvQixzREFBMUIsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9qZWN0IGZyb20gXCIuLi8uLi9tb25nby9tb2RlbHMvcHJvamVjdHNcIlxuaW1wb3J0IFRhc2sgZnJvbSBcIi4uLy4uL21vbmdvL21vZGVscy90YXNrc1wiXG5pbXBvcnQgeyBQcm9qZWN0Q3JlYXRpb25FcnJvciwgUHJvamVjdE5vdEZvdW5kRXJyb3IsIE5vdEFsbG93ZWRBY3Rpb25FcnJvciwgUHJvamVjdEFzc29jaWF0aW9uRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL2Vycm9yXCJcbmltcG9ydCBfXyBmcm9tIFwibG9kYXNoXCJcbmltcG9ydCBfX1Byb21pc2VfXyBmcm9tIFwiYmx1ZWJpcmRcIlxuXG5leHBvcnQgY29uc3Qgc2F2ZVByb2plY3REYXRhID0gYXN5bmMgKCB1c2VySWQsIGRhdGEgKSA9PiB7XG4gICAgaWYgKCFkYXRhLnVzZXJzLnNvbWUodSA9PiB1ID09PSB1c2VySWQpKSB7XG4gICAgICAgIGRhdGEudXNlcnMucHVzaCh1c2VySWQpICBcbiAgICB9XG4gICAgZGF0YS5jcmVhdG9yID0gdXNlcklkXG4gICAgbGV0IHByb2plY3QgPSBuZXcgUHJvamVjdChkYXRhKVxuICAgIGNvbnN0IGRhdGFfZXJyb3IgPSBwcm9qZWN0LnZhbGlkYXRlU3luYygpO1xuICAgIGlmIChkYXRhX2Vycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBQcm9qZWN0Q3JlYXRpb25FcnJvcihudWxsLCBkYXRhX2Vycm9yLmVycm9ycylcbiAgICB9XG4gICAgcmV0dXJuIHByb2plY3Quc2F2ZSgpXG59XG5cbmV4cG9ydCBjb25zdCBmaW5kUHJvamVjdHNRdWVyeSA9IGFzeW5jICggb3B0aW9ucyApICA9PiB7XG4gICAgY29uc3QgeyBcbiAgICAgICAgc29ydEJ5LCBcbiAgICAgICAgcGFnaW5hdGlvbiwgXG4gICAgICAgIHF1ZXJ5LCBcbiAgICAgICAgcmVxdWVzdFVzZXI6IHVzZXJcbiAgICB9ID0gb3B0aW9uc1xuXG4gICAgbGV0IHEgPSB7IH1cbiAgICBpZiAocXVlcnkuc2VhcmNoKSB7XG4gICAgICAgIHEuJHRleHQgPSB7XG4gICAgICAgICAgICAkc2VhcmNoOiBxdWVyeS5zZWFyY2hcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChxdWVyeS51c2VycyA9PT0gXCJtZVwiKSB7XG4gICAgICAgIHEuY3JlYXRvciA9IHVzZXIuX2lkXG4gICAgfVxuXG4gICAgaWYgKHF1ZXJ5LnN0YXRlID09PSBcImFjdGl2ZVwiKSB7XG4gICAgICAgIHEuYWN0aXZlID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChxdWVyeS5zdGF0ZSA9PT0gXCJpbmFjdGl2ZVwiKSB7XG4gICAgICAgIHEuYWN0aXZlID0gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBbIGRhdGEsIHRvdGFsTWF0Y2hlcyBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBQcm9qZWN0LmZpbmQocSlcbiAgICAgICAgICAgIC5wb3B1bGF0ZSgnY3JlYXRvcicsICduYW1lIGxhc3RuYW1lIGVtYWlsIHBob25lIGltZ19rZXknKVxuICAgICAgICAgICAgLnNraXAocGFnaW5hdGlvbi5mcm9tKVxuICAgICAgICAgICAgLmxpbWl0KHBhZ2luYXRpb24uc2l6ZSlcbiAgICAgICAgICAgIC5zZWxlY3QoJy1fX3YnKVxuICAgICAgICAgICAgLmNvbGxhdGlvbih7XG4gICAgICAgICAgICAgICAgbG9jYWxlOiAnZW5fVVMnLFxuICAgICAgICAgICAgICAgIHN0cmVuZ3RoOiAxLFxuICAgICAgICAgICAgICAgIGNhc2VMZXZlbDogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zb3J0KHNvcnRCeSB8fCAnLWNyZWF0ZWRBdCcpLFxuXG4gICAgICAgIFByb2plY3QuZmluZChxKVxuICAgICAgICAgICAgLmNvdW50RG9jdW1lbnRzKClcbiAgICBdKVxuXG4gICAgY29uc3QgcHJvamVjdHMgPSBhd2FpdCBfX1Byb21pc2VfXy5tYXAoZGF0YSwgYXN5bmMgKCBkICkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZC50b09iamVjdCgpLFxuICAgICAgICAgICAgdXNlcnM6IGF3YWl0IGQuZ2V0VXNlcnNBc3NvY2lhdGVkKHVzZXIuX2lkKSxcbiAgICAgICAgICAgIC4uLiBhd2FpdCBkLmdldFRpbWVzKClcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogcHJvamVjdHMsXG4gICAgICAgIHRvdGFsTWF0Y2hlc1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGVkaXRQcm9qZWN0ID0gYXN5bmMgKCBwcm9qZWN0SWQsIHVzZXJJZCwgZGF0YSApID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gYXdhaXQgUHJvamVjdC5maW5kQnlJZChwcm9qZWN0SWQpXG4gICAgaWYgKCFwcm9qZWN0KSB7XG4gICAgICAgIHRocm93IG5ldyBQcm9qZWN0Tm90Rm91bmRFcnJvcigpXG4gICAgfVxuXG4gICAgaWYgKCFwcm9qZWN0LmNyZWF0b3IuZXF1YWxzKHVzZXJJZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IE5vdEFsbG93ZWRBY3Rpb25FcnJvcigpXG4gICAgfVxuXG4gICAgX18ubWVyZ2UocHJvamVjdCwgZGF0YSlcbiAgICBpZiAoZGF0YS51c2VycyAmJiBBcnJheS5pc0FycmF5KGRhdGEudXNlcnMpKSB7XG4gICAgICAgIGlmICghZGF0YS51c2Vycy5zb21lKHUgPT4gcHJvamVjdC5jcmVhdG9yLmVxdWFscyh1KSkpIHtcbiAgICAgICAgICAgIGRhdGEudXNlcnMucHVzaChwcm9qZWN0LmNyZWF0b3IpICBcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0LnVzZXJzID0gZGF0YS51c2VycztcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhX2Vycm9yID0gcHJvamVjdC52YWxpZGF0ZVN5bmMoKTtcbiAgICBpZiAoZGF0YV9lcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgUHJvamVjdENyZWF0aW9uRXJyb3IobnVsbCwgZGF0YV9lcnJvci5lcnJvcnMpXG4gICAgfVxuXG4gICAgaWYgKCFwcm9qZWN0LmFjdGl2ZSkge1xuICAgICAgICBhd2FpdCBUYXNrLnVwZGF0ZU1hbnkoeyBwcm9qZWN0SWQ6IHByb2plY3QuaWQgfSwgeyBhY3RpdmU6IGZhbHNlIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2plY3Quc2F2ZSgpXG59XG5cbmV4cG9ydCBjb25zdCBnZXRQcm9qZWN0QXNzb2NpYXRlZCA9IGFzeW5jICggdXNlcklkLCBmaWx0ZXIgPSBbXSApID0+IHtcbiAgICBsZXQgcHJvamVjdHMgPSBhd2FpdCBQcm9qZWN0LmZpbmQoeyB1c2VyczogdXNlcklkIH0pXG4gICAgICAgIC5zZWxlY3QoJ19pZCcpXG4gICAgICAgIC5sZWFuKClcblxuICAgIGlmIChmaWx0ZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKHAgPT4gZmlsdGVyLnNvbWUoZiA9PiBwLl9pZC5lcXVhbHMoZikpKVxuICAgIH1cblxuICAgIHJldHVybiBwcm9qZWN0cy5tYXAocCA9PiBwLl9pZClcbn1cblxuZXhwb3J0IGNvbnN0IHVzZXJCZWxvbmdzVG9Qcm9qZWN0ID0gYXN5bmMgKCB1c2VySWQsIHByb2plY3RJZCApID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gYXdhaXQgUHJvamVjdC5maW5kT25lKHsgdXNlcnM6IHVzZXJJZCwgX2lkOiBwcm9qZWN0SWQgfSlcbiAgICBpZiAoIXByb2plY3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IFByb2plY3RBc3NvY2lhdGlvbkVycm9yKClcbiAgICB9XG59Il19