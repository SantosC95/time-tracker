"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.generateS3Key = exports.validatePhone = exports.sendErrorResponse = exports.decodeAccessToken = exports.generateAccessToken = exports.validatePassword = exports.validateEmail = void 0;


var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = require("../../config");
var _error = require("../errors/error");
var _v = _interopRequireDefault(require("uuid/v4"));
var _path = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };} /**
                                                                                                                                                     * Some useful functions
                                                                                                                                                     */ /** Validate password format */
var validatePassword = function validatePassword(password) {
  var passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,60}$/;
  return passRegex.test(password);
};


/** Generate access tokens */exports.validatePassword = validatePassword;
var generateAccessToken = function generateAccessToken(userId, expiresIn) {
  return _jsonwebtoken["default"].sign(
  { userId: userId },
  _config.token_secret,
  { expiresIn: expiresIn });

};

/** Decode access tokens */exports.generateAccessToken = generateAccessToken;
var decodeAccessToken = function decodeAccessToken(token) {
  try {
    return _jsonwebtoken["default"].verify(token, _config.token_secret);
  } catch (error) {
    throw new _error.InvalidTokenError();
  }
};

/** Validate e-mail format */exports.decodeAccessToken = decodeAccessToken;
var validateEmail = function validateEmail(email) {
  var regex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
  return regex.test(email);
};

/** Send error response */exports.validateEmail = validateEmail;
var sendErrorResponse = function sendErrorResponse(response, error) {
  response.
  status(error.status || 500).
  json({
    error: true,
    message: error.message || 'Error. Try again later.',
    details: error.details });

};

/** Validate phone */exports.sendErrorResponse = sendErrorResponse;
var validatePhone = function validatePhone(phone) {
  var regex = /^\d{7,10}$/;
  return regex.test(phone);
};

/** Generate key for image */exports.validatePhone = validatePhone;
var generateS3Key = function generateS3Key(file) {
  return "users/".concat((0, _v["default"])(), "/").concat(_path["default"].basename(file.path));
};exports.generateS3Key = generateS3Key;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvdXRpbHMuanMiXSwibmFtZXMiOlsidmFsaWRhdGVQYXNzd29yZCIsInBhc3N3b3JkIiwicGFzc1JlZ2V4IiwidGVzdCIsImdlbmVyYXRlQWNjZXNzVG9rZW4iLCJ1c2VySWQiLCJleHBpcmVzSW4iLCJqd3QiLCJzaWduIiwic2VjcmV0IiwiZGVjb2RlQWNjZXNzVG9rZW4iLCJ0b2tlbiIsInZlcmlmeSIsImVycm9yIiwiSW52YWxpZFRva2VuRXJyb3IiLCJ2YWxpZGF0ZUVtYWlsIiwiZW1haWwiLCJyZWdleCIsInNlbmRFcnJvclJlc3BvbnNlIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImRldGFpbHMiLCJ2YWxpZGF0ZVBob25lIiwicGhvbmUiLCJnZW5lcmF0ZVMzS2V5IiwiZmlsZSIsInBhdGgiLCJiYXNlbmFtZSJdLCJtYXBwaW5ncyI6Ijs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRCxnR0FQQTs7d0pBU0E7QUFDQSxJQUFNQSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUVDLFFBQUYsRUFBZ0I7QUFDckMsTUFBTUMsU0FBUyxHQUFHLDZFQUFsQjtBQUNBLFNBQU9BLFNBQVMsQ0FBQ0MsSUFBVixDQUFlRixRQUFmLENBQVA7QUFDSCxDQUhEOzs7QUFNQSw2QjtBQUNBLElBQU1HLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBRUMsTUFBRixFQUFVQyxTQUFWLEVBQXlCO0FBQ2pELFNBQU9DLHlCQUFJQyxJQUFKO0FBQ0gsSUFBRUgsTUFBTSxFQUFOQSxNQUFGLEVBREc7QUFFSEksc0JBRkc7QUFHSCxJQUFFSCxTQUFTLEVBQVRBLFNBQUYsRUFIRyxDQUFQOztBQUtILENBTkQ7O0FBUUEsMkI7QUFDQSxJQUFNSSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUVDLEtBQUYsRUFBYTtBQUNuQyxNQUFJO0FBQ0EsV0FBT0oseUJBQUlLLE1BQUosQ0FBV0QsS0FBWCxFQUFrQkYsb0JBQWxCLENBQVA7QUFDSCxHQUZELENBRUUsT0FBT0ksS0FBUCxFQUFjO0FBQ1osVUFBTSxJQUFJQyx3QkFBSixFQUFOO0FBQ0g7QUFDSixDQU5EOztBQVFBLDZCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFFQyxLQUFGLEVBQWE7QUFDL0IsTUFBTUMsS0FBSyxHQUFHLDBEQUFkO0FBQ0EsU0FBT0EsS0FBSyxDQUFDZCxJQUFOLENBQVdhLEtBQVgsQ0FBUDtBQUNILENBSEQ7O0FBS0EsMEI7QUFDQSxJQUFNRSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUVDLFFBQUYsRUFBWU4sS0FBWixFQUF1QjtBQUM3Q00sRUFBQUEsUUFBUTtBQUNIQyxFQUFBQSxNQURMLENBQ1lQLEtBQUssQ0FBQ08sTUFBTixJQUFnQixHQUQ1QjtBQUVLQyxFQUFBQSxJQUZMLENBRVU7QUFDRlIsSUFBQUEsS0FBSyxFQUFFLElBREw7QUFFRlMsSUFBQUEsT0FBTyxFQUFFVCxLQUFLLENBQUNTLE9BQU4sSUFBaUIseUJBRnhCO0FBR0ZDLElBQUFBLE9BQU8sRUFBRVYsS0FBSyxDQUFDVSxPQUhiLEVBRlY7O0FBT0gsQ0FSRDs7QUFVQSxxQjtBQUNBLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBRUMsS0FBRixFQUFhO0FBQy9CLE1BQU1SLEtBQUssR0FBRyxZQUFkO0FBQ0EsU0FBT0EsS0FBSyxDQUFDZCxJQUFOLENBQVdzQixLQUFYLENBQVA7QUFDSCxDQUhEOztBQUtBLDZCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFFQyxJQUFGLEVBQVk7QUFDOUIseUJBQWdCLG9CQUFoQixjQUEwQkMsaUJBQUtDLFFBQUwsQ0FBY0YsSUFBSSxDQUFDQyxJQUFuQixDQUExQjtBQUNILENBRkQsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU29tZSB1c2VmdWwgZnVuY3Rpb25zXG4gKi9cbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiXG5pbXBvcnQgeyB0b2tlbl9zZWNyZXQgYXMgc2VjcmV0IH0gZnJvbSAnLi4vLi4vY29uZmlnJ1xuaW1wb3J0IHsgSW52YWxpZFRva2VuRXJyb3IgfSBmcm9tICcuLi9lcnJvcnMvZXJyb3InXG5pbXBvcnQgdXVpZCBmcm9tIFwidXVpZC92NFwiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5cbi8qKiBWYWxpZGF0ZSBwYXNzd29yZCBmb3JtYXQgKi9cbmNvbnN0IHZhbGlkYXRlUGFzc3dvcmQgPSAoIHBhc3N3b3JkICkgPT4ge1xuICAgIGNvbnN0IHBhc3NSZWdleCA9IC9eKD89LipbQS1aYS16XSkoPz0uKlxcZClbQS1aYS16XFxkIUAjJCVeJiooKV8rXFwtPVxcW1xcXXt9Oyc6XCJcXFxcfCwuPD5cXC8/XXs2LDYwfSQvO1xuICAgIHJldHVybiBwYXNzUmVnZXgudGVzdChwYXNzd29yZCk7XG59XG5cblxuLyoqIEdlbmVyYXRlIGFjY2VzcyB0b2tlbnMgKi9cbmNvbnN0IGdlbmVyYXRlQWNjZXNzVG9rZW4gPSAoIHVzZXJJZCwgZXhwaXJlc0luICkgPT4ge1xuICAgIHJldHVybiBqd3Quc2lnbihcbiAgICAgICAgeyB1c2VySWQgfSwgXG4gICAgICAgIHNlY3JldCwgXG4gICAgICAgIHsgZXhwaXJlc0luIH1cbiAgICApXG59XG5cbi8qKiBEZWNvZGUgYWNjZXNzIHRva2VucyAqL1xuY29uc3QgZGVjb2RlQWNjZXNzVG9rZW4gPSAoIHRva2VuICkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBqd3QudmVyaWZ5KHRva2VuLCBzZWNyZXQpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRUb2tlbkVycm9yKClcbiAgICB9XG59XG5cbi8qKiBWYWxpZGF0ZSBlLW1haWwgZm9ybWF0ICovXG5jb25zdCB2YWxpZGF0ZUVtYWlsID0gKCBlbWFpbCApID0+IHtcbiAgICBjb25zdCByZWdleCA9IC9eKFtBLVphLXowLTlfXFwtLitdKStAKFtBLVphLXowLTlfXFwtLl0pK1xcLihbQS1aYS16XXsyLH0pJC87XG4gICAgcmV0dXJuIHJlZ2V4LnRlc3QoZW1haWwpO1xufVxuXG4vKiogU2VuZCBlcnJvciByZXNwb25zZSAqL1xuY29uc3Qgc2VuZEVycm9yUmVzcG9uc2UgPSAoIHJlc3BvbnNlLCBlcnJvciApID0+IHtcbiAgICByZXNwb25zZVxuICAgICAgICAuc3RhdHVzKGVycm9yLnN0YXR1cyB8fCA1MDApXG4gICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB8fCAnRXJyb3IuIFRyeSBhZ2FpbiBsYXRlci4nLFxuICAgICAgICAgICAgZGV0YWlsczogZXJyb3IuZGV0YWlsc1xuICAgICAgICB9KVxufVxuXG4vKiogVmFsaWRhdGUgcGhvbmUgKi9cbmNvbnN0IHZhbGlkYXRlUGhvbmUgPSAoIHBob25lICkgPT4ge1xuICAgIGNvbnN0IHJlZ2V4ID0gL15cXGR7NywxMH0kL1xuICAgIHJldHVybiByZWdleC50ZXN0KHBob25lKVxufVxuXG4vKiogR2VuZXJhdGUga2V5IGZvciBpbWFnZSAqL1xuY29uc3QgZ2VuZXJhdGVTM0tleSA9ICggZmlsZSApID0+IHtcbiAgICByZXR1cm4gYHVzZXJzLyR7dXVpZCgpfS8ke3BhdGguYmFzZW5hbWUoZmlsZS5wYXRoKX1gXG59XG5cblxuZXhwb3J0IHtcbiAgICB2YWxpZGF0ZUVtYWlsLFxuICAgIHZhbGlkYXRlUGFzc3dvcmQsXG4gICAgZ2VuZXJhdGVBY2Nlc3NUb2tlbixcbiAgICBkZWNvZGVBY2Nlc3NUb2tlbixcbiAgICBzZW5kRXJyb3JSZXNwb25zZSxcbiAgICB2YWxpZGF0ZVBob25lLFxuICAgIGdlbmVyYXRlUzNLZXlcbn0iXX0=