"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.updateUserData = exports.queryForUsers = exports.validateCredentials = exports.saveNewUser = void 0;var _user = _interopRequireDefault(require("../../mongo/models/user"));
var _error = require("../errors/error");






var _s2 = require("../services/s3");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _utils = require("../utils/utils");
var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var saveNewUser = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, file) {var user, count, data_error, key;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            user = new _user["default"](data);
            /** Validate data */if (
            (0, _utils.validatePassword)(data.password)) {_context.next = 3;break;}throw (
              new _error.InvalidPassword());case 3:_context.next = 5;return (



              _user["default"].countDocuments({ email: data.email }));case 5:count = _context.sent;if (!(
            count > 0)) {_context.next = 8;break;}throw (
              new _error.DuplicateEmailError());case 8:


            data_error = user.validateSync();if (!
            data_error) {_context.next = 11;break;}throw (
              new _error.UserCreationError(null, data_error.errors));case 11:if (


            _lodash["default"].isEmpty(file)) {_context.next = 18;break;}
            key = (0, _utils.generateS3Key)(file);_context.next = 15;return (
              (0, _s2.saveImage)(file.path, key));case 15:_context.next = 17;return (
              _fsExtra["default"].remove(file.path));case 17:
            user.img_key = key;case 18:_context.next = 20;return (


              user.generateHash(data.password));case 20:return _context.abrupt("return",
            user.save());case 21:case "end":return _context.stop();}}}, _callee);}));return function saveNewUser(_x, _x2) {return _ref.apply(this, arguments);};}();exports.saveNewUser = saveNewUser;


var validateCredentials = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(credentials) {var email, password, user;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            email = credentials.email, password = credentials.password;_context2.next = 3;return (

              _user["default"].findOne({ email: email }));case 3:user = _context2.sent;if (
            user) {_context2.next = 6;break;}throw (
              new _error.UserNotFoundError());case 6:_context2.next = 8;return (


              user.validatePassword(password));case 8:if (_context2.sent) {_context2.next = 10;break;}throw (
              new _error.InvalidCredentialsError());case 10:return _context2.abrupt("return",


            user);case 11:case "end":return _context2.stop();}}}, _callee2);}));return function validateCredentials(_x3) {return _ref2.apply(this, arguments);};}();exports.validateCredentials = validateCredentials;


var queryForUsers = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {var sortBy, pagination, query, user, q, _ref4, _ref5, data, totalMatches;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:

            sortBy =



            options.sortBy, pagination = options.pagination, query = options.query, user = options.requestUser;

            q = {};
            if (query.search) {
              q.$text = {
                $search: query.search };

            }

            if (query.users === "me") {
              q._id = user._id;
            }_context3.next = 6;return (

              Promise.all([
              _user["default"].find(q).
              skip(pagination.from).
              limit(pagination.size).
              select('-__v -password_hash').
              collation({
                locale: 'en_US',
                strength: 1,
                caseLevel: true }).

              sort(sortBy || '-createdAt'),

              _user["default"].find(q).
              countDocuments()]));case 6:_ref4 = _context3.sent;_ref5 = _slicedToArray(_ref4, 2);data = _ref5[0];totalMatches = _ref5[1];return _context3.abrupt("return",


            {
              data: data,
              totalMatches: totalMatches });case 11:case "end":return _context3.stop();}}}, _callee3);}));return function queryForUsers(_x4) {return _ref3.apply(this, arguments);};}();exports.queryForUsers = queryForUsers;



var updateUserData = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userId, data, file) {var user, count, data_error, key;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
              _user["default"].findById(userId));case 2:user = _context4.sent;if (
            user) {_context4.next = 5;break;}throw (
              new _error.UserNotFoundError());case 5:_context4.next = 7;return (



              _user["default"].countDocuments({
                email: data.email,
                _id: { $ne: userId } }));case 7:count = _context4.sent;if (!(


            count > 0)) {_context4.next = 10;break;}throw (
              new _error.DuplicateEmailError());case 10:


            _lodash["default"].merge(user, data);

            data_error = user.validateSync();if (!
            data_error) {_context4.next = 14;break;}throw (
              new _error.UserCreationError(null, data_error.errors));case 14:if (


            _lodash["default"].isEmpty(file)) {_context4.next = 23;break;}
            key = (0, _utils.generateS3Key)(file);_context4.next = 18;return (
              (0, _s2.saveImage)(file.path, key));case 18:_context4.next = 20;return (
              _fsExtra["default"].remove(file.path));case 20:_context4.next = 22;return (
              (0, _s2.deleteImage)(user.img_key));case 22:
            user.img_key = key;case 23:return _context4.abrupt("return",


            user.save());case 24:case "end":return _context4.stop();}}}, _callee4);}));return function updateUserData(_x5, _x6, _x7) {return _ref6.apply(this, arguments);};}();exports.updateUserData = updateUserData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZXMvdXNlci5qcyJdLCJuYW1lcyI6WyJzYXZlTmV3VXNlciIsImRhdGEiLCJmaWxlIiwidXNlciIsIlVzZXIiLCJwYXNzd29yZCIsIkludmFsaWRQYXNzd29yZCIsImNvdW50RG9jdW1lbnRzIiwiZW1haWwiLCJjb3VudCIsIkR1cGxpY2F0ZUVtYWlsRXJyb3IiLCJkYXRhX2Vycm9yIiwidmFsaWRhdGVTeW5jIiwiVXNlckNyZWF0aW9uRXJyb3IiLCJlcnJvcnMiLCJfXyIsImlzRW1wdHkiLCJrZXkiLCJwYXRoIiwiZnMiLCJyZW1vdmUiLCJpbWdfa2V5IiwiZ2VuZXJhdGVIYXNoIiwic2F2ZSIsInZhbGlkYXRlQ3JlZGVudGlhbHMiLCJjcmVkZW50aWFscyIsImZpbmRPbmUiLCJVc2VyTm90Rm91bmRFcnJvciIsInZhbGlkYXRlUGFzc3dvcmQiLCJJbnZhbGlkQ3JlZGVudGlhbHNFcnJvciIsInF1ZXJ5Rm9yVXNlcnMiLCJvcHRpb25zIiwic29ydEJ5IiwicGFnaW5hdGlvbiIsInF1ZXJ5IiwicmVxdWVzdFVzZXIiLCJxIiwic2VhcmNoIiwiJHRleHQiLCIkc2VhcmNoIiwidXNlcnMiLCJfaWQiLCJQcm9taXNlIiwiYWxsIiwiZmluZCIsInNraXAiLCJmcm9tIiwibGltaXQiLCJzaXplIiwic2VsZWN0IiwiY29sbGF0aW9uIiwibG9jYWxlIiwic3RyZW5ndGgiLCJjYXNlTGV2ZWwiLCJzb3J0IiwidG90YWxNYXRjaGVzIiwidXBkYXRlVXNlckRhdGEiLCJ1c2VySWQiLCJmaW5kQnlJZCIsIiRuZSIsIm1lcmdlIl0sIm1hcHBpbmdzIjoidUxBQUE7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBLHdEOztBQUVPLElBQU1BLFdBQVcsZ0dBQUcsaUJBQVFDLElBQVIsRUFBY0MsSUFBZDtBQUNuQkMsWUFBQUEsSUFEbUIsR0FDWixJQUFJQyxnQkFBSixDQUFTSCxJQUFULENBRFk7QUFFdkIsZ0NBRnVCO0FBR2xC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SSxDQUFDZ0IsSUFBZixFQUFxQkQsR0FBckIsQ0F6QmdCO0FBMEJoQkUsa0NBQUdDLE1BQUgsQ0FBVWxCLElBQUksQ0FBQ2dCLElBQWYsQ0ExQmdCO0FBMkJoQixtQ0FBWWYsSUFBSSxDQUFDa0IsT0FBakIsQ0EzQmdCO0FBNEJ0QmxCLFlBQUFBLElBQUksQ0FBQ2tCLE9BQUwsR0FBZUosR0FBZixDQTVCc0I7OztBQStCbkJkLFlBQUFBLElBQUksQ0FBQ29CLElBQUwsRUEvQm1CLDZEQUFILG1CQUFkaUMsY0FBYywwREFBcEIsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2VyIGZyb20gXCIuLi8uLi9tb25nby9tb2RlbHMvdXNlclwiXG5pbXBvcnQgeyBcbiAgICBVc2VyQ3JlYXRpb25FcnJvciwgXG4gICAgSW52YWxpZFBhc3N3b3JkLCBcbiAgICBEdXBsaWNhdGVFbWFpbEVycm9yLCBcbiAgICBVc2VyTm90Rm91bmRFcnJvcixcbiAgICBJbnZhbGlkQ3JlZGVudGlhbHNFcnJvclxufSBmcm9tIFwiLi4vZXJyb3JzL2Vycm9yXCJcbmltcG9ydCB7IHNhdmVJbWFnZSwgZGVsZXRlSW1hZ2UgfSBmcm9tIFwiLi4vc2VydmljZXMvczNcIlxuaW1wb3J0IGZzIGZyb20gXCJmcy1leHRyYVwiXG5pbXBvcnQgeyB2YWxpZGF0ZVBhc3N3b3JkLCBnZW5lcmF0ZVMzS2V5IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCJcbmltcG9ydCBfXyBmcm9tIFwibG9kYXNoXCJcblxuZXhwb3J0IGNvbnN0IHNhdmVOZXdVc2VyID0gYXN5bmMgKCBkYXRhLCBmaWxlICkgPT4ge1xuICAgIGxldCB1c2VyID0gbmV3IFVzZXIoZGF0YSlcbiAgICAvKiogVmFsaWRhdGUgZGF0YSAqL1xuICAgIGlmICghdmFsaWRhdGVQYXNzd29yZChkYXRhLnBhc3N3b3JkKSkge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFBhc3N3b3JkKClcbiAgICB9XG4gICAgXG4gICAgLyoqIENoZWNrIGR1cGxpY2F0ZXMgKi9cbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IFVzZXIuY291bnREb2N1bWVudHMoeyBlbWFpbDogZGF0YS5lbWFpbCB9KVxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IER1cGxpY2F0ZUVtYWlsRXJyb3IoKVxuICAgIH1cblxuICAgIGNvbnN0IGRhdGFfZXJyb3IgPSB1c2VyLnZhbGlkYXRlU3luYygpO1xuICAgIGlmIChkYXRhX2Vycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBVc2VyQ3JlYXRpb25FcnJvcihudWxsLCBkYXRhX2Vycm9yLmVycm9ycylcbiAgICB9XG5cbiAgICBpZiAoIV9fLmlzRW1wdHkoZmlsZSkpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2VuZXJhdGVTM0tleShmaWxlKVxuICAgICAgICBhd2FpdCBzYXZlSW1hZ2UoZmlsZS5wYXRoLCBrZXkpXG4gICAgICAgIGF3YWl0IGZzLnJlbW92ZShmaWxlLnBhdGgpXG4gICAgICAgIHVzZXIuaW1nX2tleSA9IGtleVxuICAgIH0gXG5cbiAgICBhd2FpdCB1c2VyLmdlbmVyYXRlSGFzaChkYXRhLnBhc3N3b3JkKVxuICAgIHJldHVybiB1c2VyLnNhdmUoKVxufVxuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDcmVkZW50aWFscyA9IGFzeW5jICggY3JlZGVudGlhbHMgKSA9PiB7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IGNyZWRlbnRpYWxzXG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWwgfSlcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVzZXJOb3RGb3VuZEVycm9yKClcbiAgICB9XG5cbiAgICBpZiAoIWF3YWl0IHVzZXIudmFsaWRhdGVQYXNzd29yZChwYXNzd29yZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRDcmVkZW50aWFsc0Vycm9yKClcbiAgICB9XG5cbiAgICByZXR1cm4gdXNlclxufSAgIFxuXG5leHBvcnQgY29uc3QgcXVlcnlGb3JVc2VycyA9IGFzeW5jICggb3B0aW9ucyApID0+IHtcbiAgICBjb25zdCB7IFxuICAgICAgICBzb3J0QnksIFxuICAgICAgICBwYWdpbmF0aW9uLCBcbiAgICAgICAgcXVlcnksIFxuICAgICAgICByZXF1ZXN0VXNlcjogdXNlclxuICAgIH0gPSBvcHRpb25zXG5cbiAgICBsZXQgcSA9IHt9XG4gICAgaWYgKHF1ZXJ5LnNlYXJjaCkge1xuICAgICAgICBxLiR0ZXh0ID0ge1xuICAgICAgICAgICAgJHNlYXJjaDogcXVlcnkuc2VhcmNoXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocXVlcnkudXNlcnMgPT09IFwibWVcIikge1xuICAgICAgICBxLl9pZCA9IHVzZXIuX2lkXG4gICAgfVxuXG4gICAgY29uc3QgWyBkYXRhLCB0b3RhbE1hdGNoZXMgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgVXNlci5maW5kKHEpXG4gICAgICAgICAgICAuc2tpcChwYWdpbmF0aW9uLmZyb20pXG4gICAgICAgICAgICAubGltaXQocGFnaW5hdGlvbi5zaXplKVxuICAgICAgICAgICAgLnNlbGVjdCgnLV9fdiAtcGFzc3dvcmRfaGFzaCcpXG4gICAgICAgICAgICAuY29sbGF0aW9uKHtcbiAgICAgICAgICAgICAgICBsb2NhbGU6ICdlbl9VUycsXG4gICAgICAgICAgICAgICAgc3RyZW5ndGg6IDEsXG4gICAgICAgICAgICAgICAgY2FzZUxldmVsOiB0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnNvcnQoc29ydEJ5IHx8ICctY3JlYXRlZEF0JyksXG5cbiAgICAgICAgVXNlci5maW5kKHEpXG4gICAgICAgICAgICAuY291bnREb2N1bWVudHMoKVxuICAgIF0pXG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgdG90YWxNYXRjaGVzXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlVXNlckRhdGEgPSBhc3luYyAoIHVzZXJJZCwgZGF0YSwgZmlsZSApID0+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZCh1c2VySWQpXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIHRocm93IG5ldyBVc2VyTm90Rm91bmRFcnJvcigpXG4gICAgfVxuXG4gICAgLyoqIENoZWNrIGR1cGxpY2F0ZXMgKi9cbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IFVzZXIuY291bnREb2N1bWVudHMoeyBcbiAgICAgICAgZW1haWw6IGRhdGEuZW1haWwsIFxuICAgICAgICBfaWQ6IHsgJG5lOiB1c2VySWQgfVxuICAgIH0pXG5cbiAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgIHRocm93IG5ldyBEdXBsaWNhdGVFbWFpbEVycm9yKClcbiAgICB9XG5cbiAgICBfXy5tZXJnZSh1c2VyLCBkYXRhKVxuXG4gICAgY29uc3QgZGF0YV9lcnJvciA9IHVzZXIudmFsaWRhdGVTeW5jKCk7XG4gICAgaWYgKGRhdGFfZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVzZXJDcmVhdGlvbkVycm9yKG51bGwsIGRhdGFfZXJyb3IuZXJyb3JzKVxuICAgIH1cblxuICAgIGlmICghX18uaXNFbXB0eShmaWxlKSkge1xuICAgICAgICBjb25zdCBrZXkgPSBnZW5lcmF0ZVMzS2V5KGZpbGUpXG4gICAgICAgIGF3YWl0IHNhdmVJbWFnZShmaWxlLnBhdGgsIGtleSlcbiAgICAgICAgYXdhaXQgZnMucmVtb3ZlKGZpbGUucGF0aClcbiAgICAgICAgYXdhaXQgZGVsZXRlSW1hZ2UodXNlci5pbWdfa2V5KVxuICAgICAgICB1c2VyLmltZ19rZXkgPSBrZXlcbiAgICB9ICAgICBcblxuICAgIHJldHVybiB1c2VyLnNhdmUoKVxufSJdfQ==