"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _index = _interopRequireDefault(require("../index"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _utils = require("../../lib/utils/utils");
var _index2 = require("../../config/index");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
var Schema = _index["default"].Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide a valid email address'],
    unique: true,
    trim: true,
    validate: {
      validator: _utils.validateEmail,
      message: function message() {return 'Please provide a valid email address';} } },


  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true },

  lastname: {
    type: String,
    required: [true, 'Please provide a lastname'],
    trim: true },

  /** Outside validation */
  password_hash: {
    type: String,
    require: [true, 'Please provide a password'] },

  /** Non-required */
  img_key: {
    type: String,
    trim: true },

  phone: {
    type: String,
    trim: true,
    validate: {
      validator: _utils.validatePhone,
      message: function message() {return 'Please provide a valid phone number (without spaces or any other special character)';} } } },


{
  timestamps: true,
  toJSON: {
    virtuals: true } });



UserSchema.methods = {
  validatePassword: function validatePassword(password) {
    return _bcryptjs["default"].compare(password, this.password_hash);
  },
  generateHash: function () {var _generateHash = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _bcryptjs["default"].hash(password, 10));case 2:this.password_hash = _context.sent;case 3:case "end":return _context.stop();}}}, _callee, this);}));function generateHash(_x) {return _generateHash.apply(this, arguments);}return generateHash;}(),

  getPublicFields: function getPublicFields() {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone,
      img_key: this.img_key,
      _id: this._id };

  } };


UserSchema.virtual('full_name').get(function () {
  return this.name + " " + this.lastname;
});

UserSchema.virtual('photo_url').get(function () {
  if (this.img_key)
  return this.socialUser ? this.img_key : "".concat(_index2.s3_baseURL).concat(this.img_key);
});

UserSchema.index({ name: "text", lastname: "text" });

var __Model__ = _index["default"].model('User', UserSchema, 'users');var _default =
__Model__;exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb25nby9tb2RlbHMvdXNlci5qcyJdLCJuYW1lcyI6WyJTY2hlbWEiLCJtb25nb29zZSIsIlVzZXJTY2hlbWEiLCJlbWFpbCIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInVuaXF1ZSIsInRyaW0iLCJ2YWxpZGF0ZSIsInZhbGlkYXRvciIsInZhbGlkYXRlRW1haWwiLCJtZXNzYWdlIiwibmFtZSIsImxhc3RuYW1lIiwicGFzc3dvcmRfaGFzaCIsInJlcXVpcmUiLCJpbWdfa2V5IiwicGhvbmUiLCJ2YWxpZGF0ZVBob25lIiwidGltZXN0YW1wcyIsInRvSlNPTiIsInZpcnR1YWxzIiwibWV0aG9kcyIsInZhbGlkYXRlUGFzc3dvcmQiLCJwYXNzd29yZCIsImJjcnlwdCIsImNvbXBhcmUiLCJnZW5lcmF0ZUhhc2giLCJoYXNoIiwiZ2V0UHVibGljRmllbGRzIiwiX2lkIiwidmlydHVhbCIsImdldCIsInNvY2lhbFVzZXIiLCJzM19iYXNlVVJMIiwiaW5kZXgiLCJfX01vZGVsX18iLCJtb2RlbCJdLCJtYXBwaW5ncyI6InVHQUFBO0FBQ0E7QUFDQTtBQUNBLDRDO0FBQ0EsSUFBTUEsTUFBTSxHQUFHQyxrQkFBU0QsTUFBeEI7O0FBRUEsSUFBSUUsVUFBVSxHQUFHLElBQUlGLE1BQUosQ0FBVztBQUN4QkcsRUFBQUEsS0FBSyxFQUFFO0FBQ0hDLElBQUFBLElBQUksRUFBRUMsTUFESDtBQUVIQyxJQUFBQSxRQUFRLEVBQUUsQ0FBRSxJQUFGLEVBQVEsc0NBQVIsQ0FGUDtBQUdIQyxJQUFBQSxNQUFNLEVBQUUsSUFITDtBQUlIQyxJQUFBQSxJQUFJLEVBQUUsSUFKSDtBQUtIQyxJQUFBQSxRQUFRLEVBQUU7QUFDTkMsTUFBQUEsU0FBUyxFQUFFQyxvQkFETDtBQUVOQyxNQUFBQSxPQUFPLEVBQUUsMkJBQU0sc0NBQU4sRUFGSCxFQUxQLEVBRGlCOzs7QUFXeEJDLEVBQUFBLElBQUksRUFBRTtBQUNGVCxJQUFBQSxJQUFJLEVBQUVDLE1BREo7QUFFRkMsSUFBQUEsUUFBUSxFQUFFLENBQUMsSUFBRCxFQUFPLHVCQUFQLENBRlI7QUFHRkUsSUFBQUEsSUFBSSxFQUFFLElBSEosRUFYa0I7O0FBZ0J4Qk0sRUFBQUEsUUFBUSxFQUFFO0FBQ05WLElBQUFBLElBQUksRUFBRUMsTUFEQTtBQUVOQyxJQUFBQSxRQUFRLEVBQUUsQ0FBQyxJQUFELEVBQU8sMkJBQVAsQ0FGSjtBQUdORSxJQUFBQSxJQUFJLEVBQUUsSUFIQSxFQWhCYzs7QUFxQnhCO0FBQ0FPLEVBQUFBLGFBQWEsRUFBRTtBQUNYWCxJQUFBQSxJQUFJLEVBQUVDLE1BREs7QUFFWFcsSUFBQUEsT0FBTyxFQUFFLENBQUUsSUFBRixFQUFRLDJCQUFSLENBRkUsRUF0QlM7O0FBMEJ4QjtBQUNBQyxFQUFBQSxPQUFPLEVBQUU7QUFDTGIsSUFBQUEsSUFBSSxFQUFFQyxNQUREO0FBRUxHLElBQUFBLElBQUksRUFBRSxJQUZELEVBM0JlOztBQStCeEJVLEVBQUFBLEtBQUssRUFBRTtBQUNIZCxJQUFBQSxJQUFJLEVBQUVDLE1BREg7QUFFSEcsSUFBQUEsSUFBSSxFQUFFLElBRkg7QUFHSEMsSUFBQUEsUUFBUSxFQUFFO0FBQ05DLE1BQUFBLFNBQVMsRUFBRVMsb0JBREw7QUFFTlAsTUFBQUEsT0FBTyxFQUFFLDJCQUFNLHFGQUFOLEVBRkgsRUFIUCxFQS9CaUIsRUFBWDs7O0FBdUNkO0FBQ0NRLEVBQUFBLFVBQVUsRUFBRSxJQURiO0FBRUNDLEVBQUFBLE1BQU0sRUFBRTtBQUNKQyxJQUFBQSxRQUFRLEVBQUUsSUFETixFQUZULEVBdkNjLENBQWpCOzs7O0FBOENBcEIsVUFBVSxDQUFDcUIsT0FBWCxHQUFxQjtBQUNqQkMsRUFBQUEsZ0JBRGlCLDRCQUNDQyxRQURELEVBQ1c7QUFDeEIsV0FBT0MscUJBQU9DLE9BQVAsQ0FBZUYsUUFBZixFQUF5QixLQUFLVixhQUE5QixDQUFQO0FBQ0gsR0FIZ0I7QUFJWGEsRUFBQUEsWUFKVyw0R0FJR0gsUUFKSDtBQUtjQyxxQ0FBT0csSUFBUCxDQUFZSixRQUFaLEVBQXNCLEVBQXRCLENBTGQsU0FLYixLQUFLVixhQUxROztBQU9qQmUsRUFBQUEsZUFQaUIsNkJBT0U7QUFDZixXQUFPO0FBQ0hqQixNQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFEUjtBQUVIQyxNQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFGWjtBQUdIWCxNQUFBQSxLQUFLLEVBQUUsS0FBS0EsS0FIVDtBQUlIZSxNQUFBQSxLQUFLLEVBQUUsS0FBS0EsS0FKVDtBQUtIRCxNQUFBQSxPQUFPLEVBQUUsS0FBS0EsT0FMWDtBQU1IYyxNQUFBQSxHQUFHLEVBQUUsS0FBS0EsR0FOUCxFQUFQOztBQVFILEdBaEJnQixFQUFyQjs7O0FBbUJBN0IsVUFBVSxDQUFDOEIsT0FBWCxDQUFtQixXQUFuQixFQUFnQ0MsR0FBaEMsQ0FBb0MsWUFBWTtBQUM1QyxTQUFPLEtBQUtwQixJQUFMLEdBQVksR0FBWixHQUFrQixLQUFLQyxRQUE5QjtBQUNILENBRkQ7O0FBSUFaLFVBQVUsQ0FBQzhCLE9BQVgsQ0FBbUIsV0FBbkIsRUFBZ0NDLEdBQWhDLENBQW9DLFlBQVk7QUFDNUMsTUFBSSxLQUFLaEIsT0FBVDtBQUNJLFNBQU8sS0FBS2lCLFVBQUwsR0FBa0IsS0FBS2pCLE9BQXZCLGFBQW1Da0Isa0JBQW5DLFNBQWdELEtBQUtsQixPQUFyRCxDQUFQO0FBQ1AsQ0FIRDs7QUFLQWYsVUFBVSxDQUFDa0MsS0FBWCxDQUFpQixFQUFFdkIsSUFBSSxFQUFFLE1BQVIsRUFBZ0JDLFFBQVEsRUFBRSxNQUExQixFQUFqQjs7QUFFQSxJQUFNdUIsU0FBUyxHQUFHcEMsa0JBQVNxQyxLQUFULENBQWUsTUFBZixFQUF1QnBDLFVBQXZCLEVBQW1DLE9BQW5DLENBQWxCLEM7QUFDZW1DLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIi4uL2luZGV4XCJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCJcbmltcG9ydCB7IHZhbGlkYXRlRW1haWwsIHZhbGlkYXRlUGhvbmUgfSBmcm9tIFwiLi4vLi4vbGliL3V0aWxzL3V0aWxzXCJcbmltcG9ydCB7IHMzX2Jhc2VVUkwgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2luZGV4XCJcbmNvbnN0IFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYTtcblxubGV0IFVzZXJTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgICBlbWFpbDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiBbIHRydWUsICdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnIF0sXG4gICAgICAgIHVuaXF1ZTogdHJ1ZSxcbiAgICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVFbWFpbCxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICgpID0+ICdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogW3RydWUsICdQbGVhc2UgcHJvdmlkZSBhIG5hbWUnXSxcbiAgICAgICAgdHJpbTogdHJ1ZVxuICAgIH0sXG4gICAgbGFzdG5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogW3RydWUsICdQbGVhc2UgcHJvdmlkZSBhIGxhc3RuYW1lJ10sXG4gICAgICAgIHRyaW06IHRydWVcbiAgICB9LFxuICAgIC8qKiBPdXRzaWRlIHZhbGlkYXRpb24gKi9cbiAgICBwYXNzd29yZF9oYXNoOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZTogWyB0cnVlLCAnUGxlYXNlIHByb3ZpZGUgYSBwYXNzd29yZCcgXVxuICAgIH0sXG4gICAgLyoqIE5vbi1yZXF1aXJlZCAqL1xuICAgIGltZ19rZXk6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICB0cmltOiB0cnVlXG4gICAgfSxcbiAgICBwaG9uZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHRyaW06IHRydWUsXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlUGhvbmUsXG4gICAgICAgICAgICBtZXNzYWdlOiAoKSA9PiAnUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBwaG9uZSBudW1iZXIgKHdpdGhvdXQgc3BhY2VzIG9yIGFueSBvdGhlciBzcGVjaWFsIGNoYXJhY3RlciknXG4gICAgICAgIH1cbiAgICB9XG59LCB7XG4gICAgdGltZXN0YW1wczogdHJ1ZSxcbiAgICB0b0pTT046IHtcbiAgICAgICAgdmlydHVhbHM6IHRydWVcbiAgICB9XG59KVxuXG5Vc2VyU2NoZW1hLm1ldGhvZHMgPSB7XG4gICAgdmFsaWRhdGVQYXNzd29yZCAocGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkX2hhc2gpXG4gICAgfSxcbiAgICBhc3luYyBnZW5lcmF0ZUhhc2ggKHBhc3N3b3JkKSB7XG4gICAgICAgIHRoaXMucGFzc3dvcmRfaGFzaCA9IGF3YWl0IGJjcnlwdC5oYXNoKHBhc3N3b3JkLCAxMClcbiAgICB9LFxuICAgIGdldFB1YmxpY0ZpZWxkcyAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICBsYXN0bmFtZTogdGhpcy5sYXN0bmFtZSxcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgICAgICAgcGhvbmU6IHRoaXMucGhvbmUsXG4gICAgICAgICAgICBpbWdfa2V5OiB0aGlzLmltZ19rZXksXG4gICAgICAgICAgICBfaWQ6IHRoaXMuX2lkXG4gICAgICAgIH1cbiAgICB9XG59XG5cblVzZXJTY2hlbWEudmlydHVhbCgnZnVsbF9uYW1lJykuZ2V0KGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgXCIgXCIgKyB0aGlzLmxhc3RuYW1lXG59KTtcblxuVXNlclNjaGVtYS52aXJ0dWFsKCdwaG90b191cmwnKS5nZXQoZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmltZ19rZXkpXG4gICAgICAgIHJldHVybiB0aGlzLnNvY2lhbFVzZXIgPyB0aGlzLmltZ19rZXkgOmAke3MzX2Jhc2VVUkx9JHt0aGlzLmltZ19rZXl9YFxufSk7XG5cblVzZXJTY2hlbWEuaW5kZXgoeyBuYW1lOiBcInRleHRcIiwgbGFzdG5hbWU6IFwidGV4dFwiIH0pXG5cbmNvbnN0IF9fTW9kZWxfXyA9IG1vbmdvb3NlLm1vZGVsKCdVc2VyJywgVXNlclNjaGVtYSwgJ3VzZXJzJyk7IFxuZXhwb3J0IGRlZmF1bHQgX19Nb2RlbF9fIl19