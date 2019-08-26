"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _index = _interopRequireDefault(require("../index"));

var _moment = _interopRequireDefault(require("moment"));
var _records = _interopRequireDefault(require("./records"));
var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var Schema = _index["default"].Schema;

var Taskschema = new Schema({
  name: {
    type: String,
    trim: true,
    "default": "Task ".concat((0, _moment["default"])().toDate()) },

  description: {
    type: String,
    trim: true,
    "default": "" },

  // Seconds
  estimate: {
    type: Number,
    "default": 0 },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true },

  active: {
    type: Boolean,
    "default": true },

  state: {
    "enum": {
      values: ["FINISHED", "PENDING", "WORKING"],
      message: "Invalid state value for task" },

    type: String,
    "default": "PENDING",
    required: true },

  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project" } },

{
  timestamps: true,
  toJSON: {
    virtuals: true } });



Taskschema.methods = {
  getTimes: function () {var _getTimes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {var records;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _records["default"].find({ task: this._id }));case 2:records = _context.sent;return _context.abrupt("return",
              _lodash["default"].sumBy(records, "time"));case 4:case "end":return _context.stop();}}}, _callee, this);}));function getTimes() {return _getTimes.apply(this, arguments);}return getTimes;}() };



Taskschema.index({ name: "text", description: "text" });

var __Model__ = _index["default"].model('Task', Taskschema, 'tasks');var _default =
__Model__;exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb25nby9tb2RlbHMvdGFza3MuanMiXSwibmFtZXMiOlsiU2NoZW1hIiwibW9uZ29vc2UiLCJUYXNrc2NoZW1hIiwibmFtZSIsInR5cGUiLCJTdHJpbmciLCJ0cmltIiwidG9EYXRlIiwiZGVzY3JpcHRpb24iLCJlc3RpbWF0ZSIsIk51bWJlciIsImNyZWF0b3IiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwicmVxdWlyZWQiLCJhY3RpdmUiLCJCb29sZWFuIiwic3RhdGUiLCJ2YWx1ZXMiLCJtZXNzYWdlIiwicHJvamVjdElkIiwidGltZXN0YW1wcyIsInRvSlNPTiIsInZpcnR1YWxzIiwibWV0aG9kcyIsImdldFRpbWVzIiwiUmVjb3JkIiwiZmluZCIsInRhc2siLCJfaWQiLCJyZWNvcmRzIiwiX18iLCJzdW1CeSIsImluZGV4IiwiX19Nb2RlbF9fIiwibW9kZWwiXSwibWFwcGluZ3MiOiJ1R0FBQTs7QUFFQTtBQUNBO0FBQ0Esd0QsaXRCQUhBLElBQU1BLE1BQU0sR0FBR0Msa0JBQVNELE1BQXhCOztBQUtBLElBQUlFLFVBQVUsR0FBRyxJQUFJRixNQUFKLENBQVc7QUFDeEJHLEVBQUFBLElBQUksRUFBRTtBQUNGQyxJQUFBQSxJQUFJLEVBQUVDLE1BREo7QUFFRkMsSUFBQUEsSUFBSSxFQUFFLElBRko7QUFHRiw4QkFBaUIsMEJBQVNDLE1BQVQsRUFBakIsQ0FIRSxFQURrQjs7QUFNeEJDLEVBQUFBLFdBQVcsRUFBRTtBQUNUSixJQUFBQSxJQUFJLEVBQUVDLE1BREc7QUFFVEMsSUFBQUEsSUFBSSxFQUFFLElBRkc7QUFHVCxlQUFTLEVBSEEsRUFOVzs7QUFXeEI7QUFDQUcsRUFBQUEsUUFBUSxFQUFFO0FBQ05MLElBQUFBLElBQUksRUFBRU0sTUFEQTtBQUVOLGVBQVMsQ0FGSCxFQVpjOztBQWdCeEJDLEVBQUFBLE9BQU8sRUFBRTtBQUNMUCxJQUFBQSxJQUFJLEVBQUVKLE1BQU0sQ0FBQ1ksS0FBUCxDQUFhQyxRQURkO0FBRUxDLElBQUFBLEdBQUcsRUFBRSxNQUZBO0FBR0xDLElBQUFBLFFBQVEsRUFBRSxJQUhMLEVBaEJlOztBQXFCeEJDLEVBQUFBLE1BQU0sRUFBRTtBQUNKWixJQUFBQSxJQUFJLEVBQUVhLE9BREY7QUFFSixlQUFTLElBRkwsRUFyQmdCOztBQXlCeEJDLEVBQUFBLEtBQUssRUFBRTtBQUNILFlBQU07QUFDRkMsTUFBQUEsTUFBTSxFQUFFLENBQUUsVUFBRixFQUFjLFNBQWQsRUFBeUIsU0FBekIsQ0FETjtBQUVGQyxNQUFBQSxPQUFPLEVBQUUsOEJBRlAsRUFESDs7QUFLSGhCLElBQUFBLElBQUksRUFBRUMsTUFMSDtBQU1ILGVBQVMsU0FOTjtBQU9IVSxJQUFBQSxRQUFRLEVBQUUsSUFQUCxFQXpCaUI7O0FBa0N4Qk0sRUFBQUEsU0FBUyxFQUFFO0FBQ1BqQixJQUFBQSxJQUFJLEVBQUVKLE1BQU0sQ0FBQ1ksS0FBUCxDQUFhQyxRQURaO0FBRVBDLElBQUFBLEdBQUcsRUFBRSxTQUZFLEVBbENhLEVBQVg7O0FBc0NkO0FBQ0NRLEVBQUFBLFVBQVUsRUFBRSxJQURiO0FBRUNDLEVBQUFBLE1BQU0sRUFBRTtBQUNKQyxJQUFBQSxRQUFRLEVBQUUsSUFETixFQUZULEVBdENjLENBQWpCOzs7O0FBNkNBdEIsVUFBVSxDQUFDdUIsT0FBWCxHQUFxQjtBQUNYQyxFQUFBQSxRQURXO0FBRVNDLG9DQUFPQyxJQUFQLENBQVksRUFBRUMsSUFBSSxFQUFFLEtBQUtDLEdBQWIsRUFBWixDQUZULFNBRVBDLE9BRk87QUFHTkMsaUNBQUdDLEtBQUgsQ0FBU0YsT0FBVCxFQUFrQixNQUFsQixDQUhNLHNKQUFyQjs7OztBQU9BN0IsVUFBVSxDQUFDZ0MsS0FBWCxDQUFpQixFQUFFL0IsSUFBSSxFQUFFLE1BQVIsRUFBZ0JLLFdBQVcsRUFBRSxNQUE3QixFQUFqQjs7QUFFQSxJQUFNMkIsU0FBUyxHQUFHbEMsa0JBQVNtQyxLQUFULENBQWUsTUFBZixFQUF1QmxDLFVBQXZCLEVBQW1DLE9BQW5DLENBQWxCLEM7QUFDZWlDLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIi4uL2luZGV4XCJcbmNvbnN0IFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYVxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCJcbmltcG9ydCBSZWNvcmQgZnJvbSBcIi4vcmVjb3Jkc1wiXG5pbXBvcnQgX18gZnJvbSBcImxvZGFzaFwiXG5cbmxldCBUYXNrc2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gICAgbmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHRyaW06IHRydWUsXG4gICAgICAgIGRlZmF1bHQ6IGBUYXNrICR7bW9tZW50KCkudG9EYXRlKCl9YFxuICAgIH0sXG4gICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICB0cmltOiB0cnVlLFxuICAgICAgICBkZWZhdWx0OiBcIlwiXG4gICAgfSxcbiAgICAvLyBTZWNvbmRzXG4gICAgZXN0aW1hdGU6IHtcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICBjcmVhdG9yOiB7XG4gICAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICAgICAgcmVmOiBcIlVzZXJcIixcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIGFjdGl2ZToge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzdGF0ZToge1xuICAgICAgICBlbnVtOiB7XG4gICAgICAgICAgICB2YWx1ZXM6IFsgXCJGSU5JU0hFRFwiLCBcIlBFTkRJTkdcIiwgXCJXT1JLSU5HXCIgXSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW52YWxpZCBzdGF0ZSB2YWx1ZSBmb3IgdGFza1wiXG4gICAgICAgIH0sXG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogXCJQRU5ESU5HXCIsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBwcm9qZWN0SWQ6IHtcbiAgICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgICAgICByZWY6IFwiUHJvamVjdFwiXG4gICAgfVxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWUsXG4gICAgdG9KU09OOiB7XG4gICAgICAgIHZpcnR1YWxzOiB0cnVlXG4gICAgfVxufSlcblxuVGFza3NjaGVtYS5tZXRob2RzID0ge1xuICAgIGFzeW5jIGdldFRpbWVzICgpIHtcbiAgICAgICAgY29uc3QgcmVjb3JkcyA9IGF3YWl0IFJlY29yZC5maW5kKHsgdGFzazogdGhpcy5faWQgfSlcbiAgICAgICAgcmV0dXJuIF9fLnN1bUJ5KHJlY29yZHMsIFwidGltZVwiKVxuICAgIH1cbn1cblxuVGFza3NjaGVtYS5pbmRleCh7IG5hbWU6IFwidGV4dFwiLCBkZXNjcmlwdGlvbjogXCJ0ZXh0XCIgfSlcblxuY29uc3QgX19Nb2RlbF9fID0gbW9uZ29vc2UubW9kZWwoJ1Rhc2snLCBUYXNrc2NoZW1hLCAndGFza3MnKTsgXG5leHBvcnQgZGVmYXVsdCBfX01vZGVsX18iXX0=