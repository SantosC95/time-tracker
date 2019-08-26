"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.listRecords = exports.closeTaskRecord = exports.setNewTaskRecord = void 0;var _records = _interopRequireDefault(require("../../mongo/models/records"));
var _tasks = _interopRequireDefault(require("../../mongo/models/tasks"));
var _error = require("../errors/error");
var _moment = _interopRequireDefault(require("moment"));
var _bluebird = _interopRequireDefault(require("bluebird"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

/** Create a new time record */
var setNewTaskRecord = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {var pending;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(
            data.trackingMode === "CLOCK")) {_context.next = 12;break;}
            delete data.time;_context.next = 4;return (
              closeOtherPendingRecords(data.task));case 4:_context.next = 6;return (

              _records["default"].findOne({
                task: data.task,
                trackingMode: "CLOCK",
                end: null }));case 6:pending = _context.sent;if (


            pending) {_context.next = 11;break;}_context.next = 10;return (
              _tasks["default"].update({ _id: data.task }, { state: "WORKING" }));case 10:return _context.abrupt("return",
            saveRecordInDb(data));case 11:return _context.abrupt("return",

            pending);case 12:return _context.abrupt("return",


            saveRecordInDb(data));case 13:case "end":return _context.stop();}}}, _callee);}));return function setNewTaskRecord(_x) {return _ref.apply(this, arguments);};}();


/** Close a task's record */exports.setNewTaskRecord = setNewTaskRecord;
var closeTaskRecord = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(taskId) {var updateTaskState,record,_args2 = arguments;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:updateTaskState = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;_context2.next = 3;return (
              _records["default"].findOne({
                task: taskId,
                trackingMode: "CLOCK",
                end: null }));case 3:record = _context2.sent;if (!


            record) {_context2.next = 11;break;}if (!
            updateTaskState) {_context2.next = 8;break;}_context2.next = 8;return (
              _tasks["default"].update({ _id: taskId }, { state: "PENDING" }));case 8:

            record.end = (0, _moment["default"])().toDate();
            record.time = (0, _moment["default"])().diff((0, _moment["default"])(record.start), "seconds");return _context2.abrupt("return",
            record.save());case 11:return _context2.abrupt("return",


            null);case 12:case "end":return _context2.stop();}}}, _callee2);}));return function closeTaskRecord(_x2) {return _ref2.apply(this, arguments);};}();exports.closeTaskRecord = closeTaskRecord;


var listRecords = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {var sortBy, pagination, task, _ref4, _ref5, data, totalMatches;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:

            sortBy =


            options.sortBy, pagination = options.pagination, task = options.task;_context3.next = 3;return (

              _bluebird["default"].all([
              _records["default"].find({ task: task }).
              select('-__v').
              skip(pagination.from).
              limit(pagination.size).
              sort(sortBy || '-createdAt'),

              _records["default"].countDocuments({ task: task })]));case 3:_ref4 = _context3.sent;_ref5 = _slicedToArray(_ref4, 2);data = _ref5[0];totalMatches = _ref5[1];return _context3.abrupt("return",


            {
              data: data,
              totalMatches: totalMatches });case 8:case "end":return _context3.stop();}}}, _callee3);}));return function listRecords(_x3) {return _ref3.apply(this, arguments);};}();




/** Close other pending records from other tasks */exports.listRecords = listRecords;
var closeOtherPendingRecords = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(taskId) {var task, pendingRecords;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (

              _tasks["default"].findById(taskId).
              select('creator').
              lean());case 2:task = _context4.sent;_context4.next = 5;return (

              _records["default"].find({
                creator: task.creator,
                task: { $ne: taskId },
                trackingMode: "CLOCK",
                end: null }));case 5:pendingRecords = _context4.sent;return _context4.abrupt("return",


            _bluebird["default"].map(pendingRecords, function (record) {
              record.end = (0, _moment["default"])().toDate();
              record.time = (0, _moment["default"])().diff((0, _moment["default"])(record.start), "seconds");
              return _bluebird["default"].all([
              record.save(),
              _tasks["default"].update({ _id: record.task }, { state: "PENDING" })]);

            }));case 7:case "end":return _context4.stop();}}}, _callee4);}));return function closeOtherPendingRecords(_x4) {return _ref6.apply(this, arguments);};}();


/** Save in DB record data */
var saveRecordInDb = function saveRecordInDb(data) {
  var record = new _records["default"](data);
  var data_error = record.validateSync();
  if (data_error) {
    throw new _error.RecordCreationError(null, data_error.errors);
  }
  return record.save();
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZXMvcmVjb3Jkcy5qcyJdLCJuYW1lcyI6WyJzZXROZXdUYXNrUmVjb3JkIiwiZGF0YSIsInRyYWNraW5nTW9kZSIsInRpbWUiLCJjbG9zZU90aGVyUGVuZGluZ1JlY29yZHMiLCJ0YXNrIiwiUmVjb3JkIiwiZmluZE9uZSIsImVuZCIsInBlbmRpbmciLCJUYXNrIiwidXBkYXRlIiwiX2lkIiwic3RhdGUiLCJzYXZlUmVjb3JkSW5EYiIsImNsb3NlVGFza1JlY29yZCIsInRhc2tJZCIsInVwZGF0ZVRhc2tTdGF0ZSIsInJlY29yZCIsInRvRGF0ZSIsImRpZmYiLCJzdGFydCIsInNhdmUiLCJsaXN0UmVjb3JkcyIsIm9wdGlvbnMiLCJzb3J0QnkiLCJwYWdpbmF0aW9uIiwiX19Qcm9taXNlX18iLCJhbGwiLCJmaW5kIiwic2VsZWN0Iiwic2tpcCIsImZyb20iLCJsaW1pdCIsInNpemUiLCJzb3J0IiwiY291bnREb2N1bWVudHMiLCJ0b3RhbE1hdGNoZXMiLCJmaW5kQnlJZCIsImxlYW4iLCJjcmVhdG9yIiwiJG5lIiwicGVuZGluZ1JlY29yZHMiLCJtYXAiLCJkYXRhX2Vycm9yIiwidmFsaWRhdGVTeW5jIiwiUmVjb3JkQ3JlYXRpb25FcnJvciIsImVycm9ycyJdLCJtYXBwaW5ncyI6IjZKQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEQ7O0FBRUE7QUFDTyxJQUFNQSxnQkFBZ0IsZ0dBQUcsaUJBQVFDLElBQVI7QUFDeEJBLFlBQUFBLElBQUksQ0FBQ0MsWUFBTCxLQUFzQixPQURFO0FBRXhCLG1CQUFPRCxJQUFJLENBQUNFLElBQVosQ0FGd0I7QUFHbEJDLGNBQUFBLHdCQUF3QixDQUFDSCxJQUFJLENBQUNJLElBQU4sQ0FITjs7QUFLRkMsa0NBQU9DLE9BQVAsQ0FBZTtBQUNqQ0YsZ0JBQUFBLElBQUksRUFBRUosSUFBSSxDQUFDSSxJQURzQjtBQUVqQ0gsZ0JBQUFBLFlBQVksRUFBRSxPQUZtQjtBQUdqQ00sZ0JBQUFBLEdBQUcsRUFBRSxJQUg0QixFQUFmLENBTEUsU0FLbEJDLE9BTGtCOzs7QUFXbkJBLFlBQUFBLE9BWG1CO0FBWWRDLGdDQUFLQyxNQUFMLENBQVksRUFBRUMsR0FBRyxFQUFFWCxJQUFJLENBQUNJLElBQVosRUFBWixFQUFnQyxFQUFFUSxLQUFLLEVBQUUsU0FBVCxFQUFoQyxDQVpjO0FBYWJDLFlBQUFBLGNBQWMsQ0FBQ2IsSUFBRCxDQWJEOztBQWVqQlEsWUFBQUEsT0FmaUI7OztBQWtCckJLLFlBQUFBLGNBQWMsQ0FBQ2IsSUFBRCxDQWxCTywyREFBSCxtQkFBaEJELGdCQUFnQiw4Q0FBdEI7OztBQXFCUCw0QjtBQUNPLElBQU1lLGVBQWUsaUdBQUcsa0JBQVFDLE1BQVIsMktBQWdCQyxlQUFoQiw4REFBa0MsSUFBbEM7QUFDTlgsa0NBQU9DLE9BQVAsQ0FBZTtBQUNoQ0YsZ0JBQUFBLElBQUksRUFBRVcsTUFEMEI7QUFFaENkLGdCQUFBQSxZQUFZLEVBQUUsT0FGa0I7QUFHaENNLGdCQUFBQSxHQUFHLEVBQUUsSUFIMkIsRUFBZixDQURNLFNBQ3JCVSxNQURxQjs7O0FBT3ZCQSxZQUFBQSxNQVB1QjtBQVFuQkQsWUFBQUEsZUFSbUI7QUFTYlAsZ0NBQUtDLE1BQUwsQ0FBWSxFQUFFQyxHQUFHLEVBQUVJLE1BQVAsRUFBWixFQUE2QixFQUFFSCxLQUFLLEVBQUUsU0FBVCxFQUE3QixDQVRhOztBQVd2QkssWUFBQUEsTUFBTSxDQUFDVixHQUFQLEdBQWEsMEJBQVNXLE1BQVQsRUFBYjtBQUNBRCxZQUFBQSxNQUFNLENBQUNmLElBQVAsR0FBYywwQkFBU2lCLElBQVQsQ0FBYyx3QkFBT0YsTUFBTSxDQUFDRyxLQUFkLENBQWQsRUFBb0MsU0FBcEMsQ0FBZCxDQVp1QjtBQWFoQkgsWUFBQUEsTUFBTSxDQUFDSSxJQUFQLEVBYmdCOzs7QUFnQnBCLGdCQWhCb0IsNkRBQUgsbUJBQWZQLGVBQWUsZ0RBQXJCLEM7OztBQW1CQSxJQUFNUSxXQUFXLGlHQUFHLGtCQUFRQyxPQUFSOztBQUVuQkMsWUFBQUEsTUFGbUI7OztBQUtuQkQsWUFBQUEsT0FMbUIsQ0FFbkJDLE1BRm1CLEVBR25CQyxVQUhtQixHQUtuQkYsT0FMbUIsQ0FHbkJFLFVBSG1CLEVBSW5CckIsSUFKbUIsR0FLbkJtQixPQUxtQixDQUluQm5CLElBSm1COztBQU9jc0IsbUNBQVlDLEdBQVosQ0FBZ0I7QUFDakR0QixrQ0FBT3VCLElBQVAsQ0FBWSxFQUFFeEIsSUFBSSxFQUFKQSxJQUFGLEVBQVo7QUFDS3lCLGNBQUFBLE1BREwsQ0FDWSxNQURaO0FBRUtDLGNBQUFBLElBRkwsQ0FFVUwsVUFBVSxDQUFDTSxJQUZyQjtBQUdLQyxjQUFBQSxLQUhMLENBR1dQLFVBQVUsQ0FBQ1EsSUFIdEI7QUFJS0MsY0FBQUEsSUFKTCxDQUlVVixNQUFNLElBQUksWUFKcEIsQ0FEaUQ7O0FBT2pEbkIsa0NBQU84QixjQUFQLENBQXNCLEVBQUUvQixJQUFJLEVBQUpBLElBQUYsRUFBdEIsQ0FQaUQsQ0FBaEIsQ0FQZCxpRUFPZkosSUFQZSxZQU9Ub0MsWUFQUzs7O0FBaUJoQjtBQUNIcEMsY0FBQUEsSUFBSSxFQUFKQSxJQURHO0FBRUhvQyxjQUFBQSxZQUFZLEVBQVpBLFlBRkcsRUFqQmdCLDREQUFILG1CQUFYZCxXQUFXLGdEQUFqQjs7Ozs7QUF3QlAsbUQ7QUFDQSxJQUFNbkIsd0JBQXdCLGlHQUFHLGtCQUFRWSxNQUFSOztBQUVWTixnQ0FBSzRCLFFBQUwsQ0FBY3RCLE1BQWQ7QUFDZGMsY0FBQUEsTUFEYyxDQUNQLFNBRE87QUFFZFMsY0FBQUEsSUFGYyxFQUZVLFNBRXZCbEMsSUFGdUI7O0FBTUFDLGtDQUFPdUIsSUFBUCxDQUFZO0FBQ3JDVyxnQkFBQUEsT0FBTyxFQUFFbkMsSUFBSSxDQUFDbUMsT0FEdUI7QUFFckNuQyxnQkFBQUEsSUFBSSxFQUFFLEVBQUVvQyxHQUFHLEVBQUV6QixNQUFQLEVBRitCO0FBR3JDZCxnQkFBQUEsWUFBWSxFQUFFLE9BSHVCO0FBSXJDTSxnQkFBQUEsR0FBRyxFQUFFLElBSmdDLEVBQVosQ0FOQSxTQU12QmtDLGNBTnVCOzs7QUFhdEJmLGlDQUFZZ0IsR0FBWixDQUFnQkQsY0FBaEIsRUFBZ0MsVUFBRXhCLE1BQUYsRUFBYztBQUNqREEsY0FBQUEsTUFBTSxDQUFDVixHQUFQLEdBQWEsMEJBQVNXLE1BQVQsRUFBYjtBQUNBRCxjQUFBQSxNQUFNLENBQUNmLElBQVAsR0FBYywwQkFBU2lCLElBQVQsQ0FBYyx3QkFBT0YsTUFBTSxDQUFDRyxLQUFkLENBQWQsRUFBb0MsU0FBcEMsQ0FBZDtBQUNBLHFCQUFPTSxxQkFBWUMsR0FBWixDQUFnQjtBQUNuQlYsY0FBQUEsTUFBTSxDQUFDSSxJQUFQLEVBRG1CO0FBRW5CWixnQ0FBS0MsTUFBTCxDQUFZLEVBQUVDLEdBQUcsRUFBRU0sTUFBTSxDQUFDYixJQUFkLEVBQVosRUFBa0MsRUFBRVEsS0FBSyxFQUFFLFNBQVQsRUFBbEMsQ0FGbUIsQ0FBaEIsQ0FBUDs7QUFJSCxhQVBNLENBYnNCLDREQUFILG1CQUF4QlQsd0JBQXdCLGdEQUE5Qjs7O0FBdUJBO0FBQ0EsSUFBTVUsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFFYixJQUFGLEVBQVk7QUFDL0IsTUFBTWlCLE1BQU0sR0FBRyxJQUFJWixtQkFBSixDQUFXTCxJQUFYLENBQWY7QUFDQSxNQUFNMkMsVUFBVSxHQUFHMUIsTUFBTSxDQUFDMkIsWUFBUCxFQUFuQjtBQUNBLE1BQUlELFVBQUosRUFBZ0I7QUFDWixVQUFNLElBQUlFLDBCQUFKLENBQXdCLElBQXhCLEVBQThCRixVQUFVLENBQUNHLE1BQXpDLENBQU47QUFDSDtBQUNELFNBQU83QixNQUFNLENBQUNJLElBQVAsRUFBUDtBQUNILENBUEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVjb3JkIGZyb20gXCIuLi8uLi9tb25nby9tb2RlbHMvcmVjb3Jkc1wiXG5pbXBvcnQgVGFzayBmcm9tIFwiLi4vLi4vbW9uZ28vbW9kZWxzL3Rhc2tzXCJcbmltcG9ydCB7IFJlY29yZENyZWF0aW9uRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL2Vycm9yXCJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiXG5pbXBvcnQgX19Qcm9taXNlX18gZnJvbSBcImJsdWViaXJkXCJcblxuLyoqIENyZWF0ZSBhIG5ldyB0aW1lIHJlY29yZCAqL1xuZXhwb3J0IGNvbnN0IHNldE5ld1Rhc2tSZWNvcmQgPSBhc3luYyAoIGRhdGEgKSA9PiB7XG4gICAgaWYgKGRhdGEudHJhY2tpbmdNb2RlID09PSBcIkNMT0NLXCIpIHtcbiAgICAgICAgZGVsZXRlIGRhdGEudGltZVxuICAgICAgICBhd2FpdCBjbG9zZU90aGVyUGVuZGluZ1JlY29yZHMoZGF0YS50YXNrKVxuICAgICAgICAvKiogU2VhcmNoIGlmIGEgcmVjb3JkIGlzIHBlbmRpbmcgZm9yIHRoaXMgdGFzayAqL1xuICAgICAgICBjb25zdCBwZW5kaW5nID0gYXdhaXQgUmVjb3JkLmZpbmRPbmUoe1xuICAgICAgICAgICAgdGFzazogZGF0YS50YXNrLFxuICAgICAgICAgICAgdHJhY2tpbmdNb2RlOiBcIkNMT0NLXCIsXG4gICAgICAgICAgICBlbmQ6IG51bGxcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgaWYgKCFwZW5kaW5nKSB7XG4gICAgICAgICAgICBhd2FpdCBUYXNrLnVwZGF0ZSh7IF9pZDogZGF0YS50YXNrIH0sIHsgc3RhdGU6IFwiV09SS0lOR1wiIH0pXG4gICAgICAgICAgICByZXR1cm4gc2F2ZVJlY29yZEluRGIoZGF0YSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGVuZGluZ1xuICAgIH1cblxuICAgIHJldHVybiBzYXZlUmVjb3JkSW5EYihkYXRhKVxufVxuXG4vKiogQ2xvc2UgYSB0YXNrJ3MgcmVjb3JkICovXG5leHBvcnQgY29uc3QgY2xvc2VUYXNrUmVjb3JkID0gYXN5bmMgKCB0YXNrSWQsIHVwZGF0ZVRhc2tTdGF0ZSA9IHRydWUgKSA9PiB7XG4gICAgY29uc3QgcmVjb3JkID0gYXdhaXQgUmVjb3JkLmZpbmRPbmUoe1xuICAgICAgICB0YXNrOiB0YXNrSWQsXG4gICAgICAgIHRyYWNraW5nTW9kZTogXCJDTE9DS1wiLFxuICAgICAgICBlbmQ6IG51bGxcbiAgICB9KVxuXG4gICAgaWYgKHJlY29yZCkge1xuICAgICAgICBpZiAodXBkYXRlVGFza1N0YXRlKSB7XG4gICAgICAgICAgICBhd2FpdCBUYXNrLnVwZGF0ZSh7IF9pZDogdGFza0lkIH0sIHsgc3RhdGU6IFwiUEVORElOR1wiIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmVjb3JkLmVuZCA9IG1vbWVudCgpLnRvRGF0ZSgpXG4gICAgICAgIHJlY29yZC50aW1lID0gbW9tZW50KCkuZGlmZihtb21lbnQocmVjb3JkLnN0YXJ0KSwgXCJzZWNvbmRzXCIpXG4gICAgICAgIHJldHVybiByZWNvcmQuc2F2ZSgpXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0IGNvbnN0IGxpc3RSZWNvcmRzID0gYXN5bmMgKCBvcHRpb25zICkgPT4ge1xuICAgIGNvbnN0IHsgXG4gICAgICAgIHNvcnRCeSwgXG4gICAgICAgIHBhZ2luYXRpb24sIFxuICAgICAgICB0YXNrXG4gICAgfSA9IG9wdGlvbnNcblxuICAgIGNvbnN0IFsgZGF0YSwgdG90YWxNYXRjaGVzIF0gPSBhd2FpdCBfX1Byb21pc2VfXy5hbGwoW1xuICAgICAgICBSZWNvcmQuZmluZCh7IHRhc2sgfSlcbiAgICAgICAgICAgIC5zZWxlY3QoJy1fX3YnKVxuICAgICAgICAgICAgLnNraXAocGFnaW5hdGlvbi5mcm9tKVxuICAgICAgICAgICAgLmxpbWl0KHBhZ2luYXRpb24uc2l6ZSlcbiAgICAgICAgICAgIC5zb3J0KHNvcnRCeSB8fCAnLWNyZWF0ZWRBdCcpLFxuXG4gICAgICAgIFJlY29yZC5jb3VudERvY3VtZW50cyh7IHRhc2sgfSlcbiAgICBdKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgdG90YWxNYXRjaGVzXG4gICAgfVxufVxuXG5cbi8qKiBDbG9zZSBvdGhlciBwZW5kaW5nIHJlY29yZHMgZnJvbSBvdGhlciB0YXNrcyAqL1xuY29uc3QgY2xvc2VPdGhlclBlbmRpbmdSZWNvcmRzID0gYXN5bmMgKCB0YXNrSWQgKSA9PiB7XG4gICAgLyoqIExvb2sgZm9yIHRhc2sgb3duZXIvY3JlYXRvciAqL1xuICAgIGNvbnN0IHRhc2sgPSBhd2FpdCBUYXNrLmZpbmRCeUlkKHRhc2tJZClcbiAgICAgICAgLnNlbGVjdCgnY3JlYXRvcicpXG4gICAgICAgIC5sZWFuKClcblxuICAgIGNvbnN0IHBlbmRpbmdSZWNvcmRzID0gYXdhaXQgUmVjb3JkLmZpbmQoe1xuICAgICAgICBjcmVhdG9yOiB0YXNrLmNyZWF0b3IsXG4gICAgICAgIHRhc2s6IHsgJG5lOiB0YXNrSWQgfSxcbiAgICAgICAgdHJhY2tpbmdNb2RlOiBcIkNMT0NLXCIsXG4gICAgICAgIGVuZDogbnVsbFxuICAgIH0pXG5cbiAgICByZXR1cm4gX19Qcm9taXNlX18ubWFwKHBlbmRpbmdSZWNvcmRzLCAoIHJlY29yZCApID0+IHtcbiAgICAgICAgcmVjb3JkLmVuZCA9IG1vbWVudCgpLnRvRGF0ZSgpXG4gICAgICAgIHJlY29yZC50aW1lID0gbW9tZW50KCkuZGlmZihtb21lbnQocmVjb3JkLnN0YXJ0KSwgXCJzZWNvbmRzXCIpXG4gICAgICAgIHJldHVybiBfX1Byb21pc2VfXy5hbGwoW1xuICAgICAgICAgICAgcmVjb3JkLnNhdmUoKSxcbiAgICAgICAgICAgIFRhc2sudXBkYXRlKHsgX2lkOiByZWNvcmQudGFzayB9LCB7IHN0YXRlOiBcIlBFTkRJTkdcIiB9KVxuICAgICAgICBdKVxuICAgIH0pXG59XG5cbi8qKiBTYXZlIGluIERCIHJlY29yZCBkYXRhICovXG5jb25zdCBzYXZlUmVjb3JkSW5EYiA9ICggZGF0YSApID0+IHtcbiAgICBjb25zdCByZWNvcmQgPSBuZXcgUmVjb3JkKGRhdGEpXG4gICAgY29uc3QgZGF0YV9lcnJvciA9IHJlY29yZC52YWxpZGF0ZVN5bmMoKTtcbiAgICBpZiAoZGF0YV9lcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgUmVjb3JkQ3JlYXRpb25FcnJvcihudWxsLCBkYXRhX2Vycm9yLmVycm9ycylcbiAgICB9XG4gICAgcmV0dXJuIHJlY29yZC5zYXZlKClcbn0gIl19