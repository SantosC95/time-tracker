"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _index = _interopRequireDefault(require("../index"));
var _user = _interopRequireDefault(require("./user"));
var _tasks = _interopRequireDefault(require("./tasks"));
var _records = _interopRequireDefault(require("./records"));
var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
var Schema = _index["default"].Schema;

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a project name'],
    trim: true },

  description: {
    type: String,
    trim: true,
    "default": "" },

  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User" },

  active: {
    type: Boolean,
    "default": true } },

{
  timestamps: true,
  toJSON: {
    virtuals: true } });



ProjectSchema.methods = {
  getUsersAssociated: function () {var _getUsersAssociated = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userRequest) {var users, isAssociated;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              users = [];
              isAssociated = this.users.some(function (u) {return u.equals(userRequest);});if (!
              isAssociated) {_context.next = 6;break;}_context.next = 5;return (
                _user["default"].find({ _id: { $in: this.users } }).
                select('name lastname email phone img_key'));case 5:users = _context.sent;case 6:return _context.abrupt("return",

              users);case 7:case "end":return _context.stop();}}}, _callee, this);}));function getUsersAssociated(_x) {return _getUsersAssociated.apply(this, arguments);}return getUsersAssociated;}(),

  getTimes: function () {var _getTimes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {var tasks, totalEstimate, records, totalSpent;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _tasks["default"].find({ projectId: this._id }).
                select('estimate').
                lean());case 2:tasks = _context2.sent;

              totalEstimate = _lodash["default"].sumBy(tasks, "estimate");_context2.next = 6;return (
                _records["default"].find({
                  task: {
                    $in: tasks.map(function (t) {return t._id;}) } }));case 6:records = _context2.sent;



              totalSpent = _lodash["default"].sumBy(records, "time");return _context2.abrupt("return",
              {
                totalEstimate: totalEstimate,
                totalSpent: totalSpent });case 9:case "end":return _context2.stop();}}}, _callee2, this);}));function getTimes() {return _getTimes.apply(this, arguments);}return getTimes;}() };




ProjectSchema.index({ name: "text", description: "text" });

var __Model__ = _index["default"].model('Project', ProjectSchema, 'projects');var _default =
__Model__;exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb25nby9tb2RlbHMvcHJvamVjdHMuanMiXSwibmFtZXMiOlsiU2NoZW1hIiwibW9uZ29vc2UiLCJQcm9qZWN0U2NoZW1hIiwibmFtZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInRyaW0iLCJkZXNjcmlwdGlvbiIsInVzZXJzIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsImNyZWF0b3IiLCJhY3RpdmUiLCJCb29sZWFuIiwidGltZXN0YW1wcyIsInRvSlNPTiIsInZpcnR1YWxzIiwibWV0aG9kcyIsImdldFVzZXJzQXNzb2NpYXRlZCIsInVzZXJSZXF1ZXN0IiwiaXNBc3NvY2lhdGVkIiwic29tZSIsInUiLCJlcXVhbHMiLCJVc2VyIiwiZmluZCIsIl9pZCIsIiRpbiIsInNlbGVjdCIsImdldFRpbWVzIiwiVGFzayIsInByb2plY3RJZCIsImxlYW4iLCJ0YXNrcyIsInRvdGFsRXN0aW1hdGUiLCJfXyIsInN1bUJ5IiwiUmVjb3JkIiwidGFzayIsIm1hcCIsInQiLCJyZWNvcmRzIiwidG90YWxTcGVudCIsImluZGV4IiwiX19Nb2RlbF9fIiwibW9kZWwiXSwibWFwcGluZ3MiOiJ1R0FBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEO0FBQ0EsSUFBTUEsTUFBTSxHQUFHQyxrQkFBU0QsTUFBeEI7O0FBRUEsSUFBSUUsYUFBYSxHQUFHLElBQUlGLE1BQUosQ0FBVztBQUMzQkcsRUFBQUEsSUFBSSxFQUFFO0FBQ0ZDLElBQUFBLElBQUksRUFBRUMsTUFESjtBQUVGQyxJQUFBQSxRQUFRLEVBQUUsQ0FBQyxJQUFELEVBQU8sK0JBQVAsQ0FGUjtBQUdGQyxJQUFBQSxJQUFJLEVBQUUsSUFISixFQURxQjs7QUFNM0JDLEVBQUFBLFdBQVcsRUFBRTtBQUNUSixJQUFBQSxJQUFJLEVBQUVDLE1BREc7QUFFVEUsSUFBQUEsSUFBSSxFQUFFLElBRkc7QUFHVCxlQUFTLEVBSEEsRUFOYzs7QUFXM0JFLEVBQUFBLEtBQUssRUFBRSxDQUFDLEVBQUVMLElBQUksRUFBRUosTUFBTSxDQUFDVSxLQUFQLENBQWFDLFFBQXJCLEVBQStCQyxHQUFHLEVBQUUsTUFBcEMsRUFBRCxDQVhvQjtBQVkzQkMsRUFBQUEsT0FBTyxFQUFFO0FBQ0xULElBQUFBLElBQUksRUFBRUosTUFBTSxDQUFDVSxLQUFQLENBQWFDLFFBRGQ7QUFFTEMsSUFBQUEsR0FBRyxFQUFFLE1BRkEsRUFaa0I7O0FBZ0IzQkUsRUFBQUEsTUFBTSxFQUFFO0FBQ0pWLElBQUFBLElBQUksRUFBRVcsT0FERjtBQUVKLGVBQVMsSUFGTCxFQWhCbUIsRUFBWDs7QUFvQmpCO0FBQ0NDLEVBQUFBLFVBQVUsRUFBRSxJQURiO0FBRUNDLEVBQUFBLE1BQU0sRUFBRTtBQUNKQyxJQUFBQSxRQUFRLEVBQUUsSUFETixFQUZULEVBcEJpQixDQUFwQjs7OztBQTJCQWhCLGFBQWEsQ0FBQ2lCLE9BQWQsR0FBd0I7QUFDZEMsRUFBQUEsa0JBRGMsa0hBQ09DLFdBRFA7QUFFWlosY0FBQUEsS0FGWSxHQUVKLEVBRkk7QUFHVmEsY0FBQUEsWUFIVSxHQUdLLEtBQUtiLEtBQUwsQ0FBV2MsSUFBWCxDQUFnQixVQUFBQyxDQUFDLFVBQUlBLENBQUMsQ0FBQ0MsTUFBRixDQUFTSixXQUFULENBQUosRUFBakIsQ0FITDtBQUlaQyxjQUFBQSxZQUpZO0FBS0VJLGlDQUFLQyxJQUFMLENBQVUsRUFBRUMsR0FBRyxFQUFFLEVBQUVDLEdBQUcsRUFBRSxLQUFLcEIsS0FBWixFQUFQLEVBQVY7QUFDVHFCLGdCQUFBQSxNQURTLENBQ0YsbUNBREUsQ0FMRixTQUtackIsS0FMWTs7QUFRVEEsY0FBQUEsS0FSUzs7QUFVZHNCLEVBQUFBLFFBVmM7QUFXSUMsa0NBQUtMLElBQUwsQ0FBVSxFQUFFTSxTQUFTLEVBQUUsS0FBS0wsR0FBbEIsRUFBVjtBQUNmRSxnQkFBQUEsTUFEZSxDQUNSLFVBRFE7QUFFZkksZ0JBQUFBLElBRmUsRUFYSixTQVdWQyxLQVhVOztBQWVWQyxjQUFBQSxhQWZVLEdBZU1DLG1CQUFHQyxLQUFILENBQVNILEtBQVQsRUFBZ0IsVUFBaEIsQ0FmTjtBQWdCTUksb0NBQU9aLElBQVAsQ0FBWTtBQUM5QmEsa0JBQUFBLElBQUksRUFBRTtBQUNGWCxvQkFBQUEsR0FBRyxFQUFFTSxLQUFLLENBQUNNLEdBQU4sQ0FBVSxVQUFBQyxDQUFDLFVBQUlBLENBQUMsQ0FBQ2QsR0FBTixFQUFYLENBREgsRUFEd0IsRUFBWixDQWhCTixTQWdCVmUsT0FoQlU7Ozs7QUFzQlZDLGNBQUFBLFVBdEJVLEdBc0JHUCxtQkFBR0MsS0FBSCxDQUFTSyxPQUFULEVBQWtCLE1BQWxCLENBdEJIO0FBdUJUO0FBQ0hQLGdCQUFBQSxhQUFhLEVBQWJBLGFBREc7QUFFSFEsZ0JBQUFBLFVBQVUsRUFBVkEsVUFGRyxFQXZCUyx3SkFBeEI7Ozs7O0FBOEJBMUMsYUFBYSxDQUFDMkMsS0FBZCxDQUFvQixFQUFFMUMsSUFBSSxFQUFFLE1BQVIsRUFBZ0JLLFdBQVcsRUFBRSxNQUE3QixFQUFwQjs7QUFFQSxJQUFNc0MsU0FBUyxHQUFHN0Msa0JBQVM4QyxLQUFULENBQWUsU0FBZixFQUEwQjdDLGFBQTFCLEVBQXlDLFVBQXpDLENBQWxCLEM7QUFDZTRDLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIi4uL2luZGV4XCJcbmltcG9ydCBVc2VyIGZyb20gXCIuL3VzZXJcIlxuaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza3NcIlxuaW1wb3J0IFJlY29yZCBmcm9tIFwiLi9yZWNvcmRzXCJcbmltcG9ydCBfXyBmcm9tIFwibG9kYXNoXCJcbmNvbnN0IFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYVxuXG5sZXQgUHJvamVjdFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogW3RydWUsICdQbGVhc2UgcHJvdmlkZSBhIHByb2plY3QgbmFtZSddLFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHRyaW06IHRydWUsXG4gICAgICAgIGRlZmF1bHQ6IFwiXCJcbiAgICB9LFxuICAgIHVzZXJzOiBbeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogXCJVc2VyXCIgfV0sXG4gICAgY3JlYXRvcjoge1xuICAgICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gICAgICAgIHJlZjogXCJVc2VyXCJcbiAgICB9LFxuICAgIGFjdGl2ZToge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWUsXG4gICAgdG9KU09OOiB7XG4gICAgICAgIHZpcnR1YWxzOiB0cnVlXG4gICAgfVxufSlcblxuUHJvamVjdFNjaGVtYS5tZXRob2RzID0ge1xuICAgIGFzeW5jIGdldFVzZXJzQXNzb2NpYXRlZCAoIHVzZXJSZXF1ZXN0ICkge1xuICAgICAgICBsZXQgdXNlcnMgPSBbXVxuICAgICAgICBjb25zdCBpc0Fzc29jaWF0ZWQgPSB0aGlzLnVzZXJzLnNvbWUodSA9PiB1LmVxdWFscyh1c2VyUmVxdWVzdCkpXG4gICAgICAgIGlmIChpc0Fzc29jaWF0ZWQpIHtcbiAgICAgICAgICAgIHVzZXJzID0gYXdhaXQgVXNlci5maW5kKHsgX2lkOiB7ICRpbjogdGhpcy51c2VycyB9fSlcbiAgICAgICAgICAgICAgICAuc2VsZWN0KCduYW1lIGxhc3RuYW1lIGVtYWlsIHBob25lIGltZ19rZXknKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2Vyc1xuICAgIH0sXG4gICAgYXN5bmMgZ2V0VGltZXMgKCkge1xuICAgICAgICBjb25zdCB0YXNrcyA9IGF3YWl0IFRhc2suZmluZCh7IHByb2plY3RJZDogdGhpcy5faWQgfSlcbiAgICAgICAgICAgIC5zZWxlY3QoJ2VzdGltYXRlJylcbiAgICAgICAgICAgIC5sZWFuKClcblxuICAgICAgICBjb25zdCB0b3RhbEVzdGltYXRlID0gX18uc3VtQnkodGFza3MsIFwiZXN0aW1hdGVcIilcbiAgICAgICAgY29uc3QgcmVjb3JkcyA9IGF3YWl0IFJlY29yZC5maW5kKHtcbiAgICAgICAgICAgIHRhc2s6IHtcbiAgICAgICAgICAgICAgICAkaW46IHRhc2tzLm1hcCh0ID0+IHQuX2lkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHRvdGFsU3BlbnQgPSBfXy5zdW1CeShyZWNvcmRzLCBcInRpbWVcIilcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvdGFsRXN0aW1hdGUsXG4gICAgICAgICAgICB0b3RhbFNwZW50XG4gICAgICAgIH1cbiAgICB9XG59XG5cblByb2plY3RTY2hlbWEuaW5kZXgoeyBuYW1lOiBcInRleHRcIiwgZGVzY3JpcHRpb246IFwidGV4dFwiIH0pXG5cbmNvbnN0IF9fTW9kZWxfXyA9IG1vbmdvb3NlLm1vZGVsKCdQcm9qZWN0JywgUHJvamVjdFNjaGVtYSwgJ3Byb2plY3RzJyk7IFxuZXhwb3J0IGRlZmF1bHQgX19Nb2RlbF9fIl19