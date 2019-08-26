"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deleteImage = exports.saveImage = void 0;var _path = _interopRequireDefault(require("path"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
_awsSdk["default"].config.update({ region: 'us-east-1' });
var S3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  params: {
    Bucket: process.env.BUCKET } });



var saveImage = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filepath, key) {var contentType, body, params;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;

            /* Determine Content Type */
            contentType = _path["default"].extname(filepath).split('.')[1] === 'jpg' ?
            'jpeg' : _path["default"].extname(filepath).split('.')[1];_context.next = 4;return (

              _fsExtra["default"].readFile(filepath));case 4:body = _context.sent;
            params = {
              Key: key,
              ContentType: "image/".concat(contentType),
              Body: body };return _context.abrupt("return",


            S3.upload(params).promise());case 9:_context.prev = 9;_context.t0 = _context["catch"](0);

            console.log("Error: ".concat(_context.t0.message, " | ").concat(_context.t0.stack), _context.t0);case 12:case "end":return _context.stop();}}}, _callee, null, [[0, 9]]);}));return function saveImage(_x, _x2) {return _ref.apply(this, arguments);};}();exports.saveImage = saveImage;



var deleteImage = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key) {var params;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            params = { Key: key };return _context2.abrupt("return",
            S3.deleteObject(params).promise());case 2:case "end":return _context2.stop();}}}, _callee2);}));return function deleteImage(_x3) {return _ref2.apply(this, arguments);};}();exports.deleteImage = deleteImage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZXMvczMuanMiXSwibmFtZXMiOlsiQVdTIiwiY29uZmlnIiwidXBkYXRlIiwicmVnaW9uIiwiUzMiLCJhY2Nlc3NLZXlJZCIsInByb2Nlc3MiLCJlbnYiLCJBV1NfQUNDRVNTX0tFWV9JRCIsInNlY3JldEFjY2Vzc0tleSIsIkFXU19TRUNSRVRfQUNDRVNTX0tFWSIsInBhcmFtcyIsIkJ1Y2tldCIsIkJVQ0tFVCIsInNhdmVJbWFnZSIsImZpbGVwYXRoIiwia2V5IiwiY29udGVudFR5cGUiLCJwYXRoIiwiZXh0bmFtZSIsInNwbGl0IiwiZnMiLCJyZWFkRmlsZSIsImJvZHkiLCJLZXkiLCJDb250ZW50VHlwZSIsIkJvZHkiLCJ1cGxvYWQiLCJwcm9taXNlIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJzdGFjayIsImRlbGV0ZUltYWdlIiwiZGVsZXRlT2JqZWN0Il0sIm1hcHBpbmdzIjoiNEhBQUE7QUFDQTtBQUNBLHlEO0FBQ0FBLG1CQUFJQyxNQUFKLENBQVdDLE1BQVgsQ0FBa0IsRUFBRUMsTUFBTSxFQUFFLFdBQVYsRUFBbEI7QUFDQSxJQUFNQyxFQUFFLEdBQUcsSUFBSUosbUJBQUlJLEVBQVIsQ0FBVztBQUNsQkMsRUFBQUEsV0FBVyxFQUFFQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsaUJBRFA7QUFFbEJDLEVBQUFBLGVBQWUsRUFBRUgsT0FBTyxDQUFDQyxHQUFSLENBQVlHLHFCQUZYO0FBR2xCQyxFQUFBQSxNQUFNLEVBQUU7QUFDSkMsSUFBQUEsTUFBTSxFQUFFTixPQUFPLENBQUNDLEdBQVIsQ0FBWU0sTUFEaEIsRUFIVSxFQUFYLENBQVg7Ozs7QUFRTyxJQUFNQyxTQUFTLGdHQUFHLGlCQUFRQyxRQUFSLEVBQWtCQyxHQUFsQjs7QUFFakI7QUFDTUMsWUFBQUEsV0FIVyxHQUdHQyxpQkFBS0MsT0FBTCxDQUFhSixRQUFiLEVBQXVCSyxLQUF2QixDQUE2QixHQUE3QixFQUFrQyxDQUFsQyxNQUF5QyxLQUF6QztBQUNoQixrQkFEZ0IsR0FDUEYsaUJBQUtDLE9BQUwsQ0FBYUosUUFBYixFQUF1QkssS0FBdkIsQ0FBNkIsR0FBN0IsRUFBa0MsQ0FBbEMsQ0FKSTs7QUFNRUMsa0NBQUdDLFFBQUgsQ0FBWVAsUUFBWixDQU5GLFNBTVhRLElBTlc7QUFPWFosWUFBQUEsTUFQVyxHQU9GO0FBQ1hhLGNBQUFBLEdBQUcsRUFBRVIsR0FETTtBQUVYUyxjQUFBQSxXQUFXLGtCQUFXUixXQUFYLENBRkE7QUFHWFMsY0FBQUEsSUFBSSxFQUFFSCxJQUhLLEVBUEU7OztBQWFWbkIsWUFBQUEsRUFBRSxDQUFDdUIsTUFBSCxDQUFVaEIsTUFBVixFQUFrQmlCLE9BQWxCLEVBYlU7O0FBZWpCQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsa0JBQXNCLFlBQU1DLE9BQTVCLGdCQUF5QyxZQUFNQyxLQUEvQyxnQkFmaUIseUVBQUgsbUJBQVRsQixTQUFTLG1EQUFmLEM7Ozs7QUFtQkEsSUFBTW1CLFdBQVcsaUdBQUcsa0JBQVFqQixHQUFSO0FBQ2pCTCxZQUFBQSxNQURpQixHQUNSLEVBQUVhLEdBQUcsRUFBRVIsR0FBUCxFQURRO0FBRWhCWixZQUFBQSxFQUFFLENBQUM4QixZQUFILENBQWdCdkIsTUFBaEIsRUFBd0JpQixPQUF4QixFQUZnQiw0REFBSCxtQkFBWEssV0FBVyxnREFBakIsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCBmcyBmcm9tIFwiZnMtZXh0cmFcIlxuaW1wb3J0IEFXUyBmcm9tIFwiYXdzLXNka1wiXG5BV1MuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbjogJ3VzLWVhc3QtMScgfSk7XG5jb25zdCBTMyA9IG5ldyBBV1MuUzMoe1xuICAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCxcbiAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSxcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgQnVja2V0OiBwcm9jZXNzLmVudi5CVUNLRVRcbiAgICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IHNhdmVJbWFnZSA9IGFzeW5jICggZmlsZXBhdGgsIGtleSApID0+IHtcbiAgICB0cnkge1xuICAgICAgICAvKiBEZXRlcm1pbmUgQ29udGVudCBUeXBlICovXG4gICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gcGF0aC5leHRuYW1lKGZpbGVwYXRoKS5zcGxpdCgnLicpWzFdID09PSAnanBnJyA/XG4gICAgICAgICAgICAnanBlZycgOiBwYXRoLmV4dG5hbWUoZmlsZXBhdGgpLnNwbGl0KCcuJylbMV07ICAgICAgICBcblxuICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgZnMucmVhZEZpbGUoZmlsZXBhdGgpO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICBLZXk6IGtleSxcbiAgICAgICAgICAgIENvbnRlbnRUeXBlOiBgaW1hZ2UvJHtjb250ZW50VHlwZX1gLFxuICAgICAgICAgICAgQm9keTogYm9keVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFMzLnVwbG9hZChwYXJhbXMpLnByb21pc2UoKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBFcnJvcjogJHtlcnJvci5tZXNzYWdlfSB8ICR7ZXJyb3Iuc3RhY2t9YCwgZXJyb3IpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUltYWdlID0gYXN5bmMgKCBrZXkgKSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0geyBLZXk6IGtleSB9O1xuICAgIHJldHVybiBTMy5kZWxldGVPYmplY3QocGFyYW1zKS5wcm9taXNlKCk7XG59Il19