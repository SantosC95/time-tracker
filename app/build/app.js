"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _docs = _interopRequireDefault(require("./docs/docs.json"));
var _middlewares = require("./lib/middlewares/middlewares");
var _routes = _interopRequireDefault(require("./routes/routes"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}

var app = (0, _express["default"])();
app.disable('x-powered-by'); // Do not show server is running on Express

/** Avoid attacks through repeated request */
app.use(_middlewares.bruteForceShield);
/** Activate cors */
app.use((0, _cors["default"])());
/** Requests parser **/
app.use(_express["default"].urlencoded({ extended: false }));
app.use(_express["default"].json());

/** API versions */
app.use('/api', _routes["default"]);

/** Register swagger UI */
app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_docs["default"]));

/*** 404 Response Handler ***/
app.use(function (req, res) {
  return res.status(404).json({
    message: "URL ".concat(req.url, " not found (404)"),
    statusCode: 404 });

});var _default =

app;exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiYXBwIiwiZGlzYWJsZSIsInVzZSIsImJydXRlRm9yY2VTaGllbGQiLCJleHByZXNzIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsInJvdXRlcyIsInN3YWdnZXJVSSIsInNlcnZlIiwic2V0dXAiLCJzd2FnZ2VyRG9jcyIsInJlcSIsInJlcyIsInN0YXR1cyIsIm1lc3NhZ2UiLCJ1cmwiLCJzdGF0dXNDb2RlIl0sIm1hcHBpbmdzIjoidUdBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFOztBQUVBLElBQU1BLEdBQUcsR0FBRywwQkFBWjtBQUNBQSxHQUFHLENBQUNDLE9BQUosQ0FBWSxjQUFaLEUsQ0FBNkI7O0FBRTdCO0FBQ0FELEdBQUcsQ0FBQ0UsR0FBSixDQUFRQyw2QkFBUjtBQUNBO0FBQ0FILEdBQUcsQ0FBQ0UsR0FBSixDQUFRLHVCQUFSO0FBQ0E7QUFDQUYsR0FBRyxDQUFDRSxHQUFKLENBQVFFLG9CQUFRQyxVQUFSLENBQW1CLEVBQUVDLFFBQVEsRUFBRSxLQUFaLEVBQW5CLENBQVI7QUFDQU4sR0FBRyxDQUFDRSxHQUFKLENBQVFFLG9CQUFRRyxJQUFSLEVBQVI7O0FBRUE7QUFDQVAsR0FBRyxDQUFDRSxHQUFKLENBQVEsTUFBUixFQUFnQk0sa0JBQWhCOztBQUVBO0FBQ0FSLEdBQUcsQ0FBQ0UsR0FBSixDQUFRLE9BQVIsRUFBaUJPLDZCQUFVQyxLQUEzQixFQUFrQ0QsNkJBQVVFLEtBQVYsQ0FBZ0JDLGdCQUFoQixDQUFsQzs7QUFFQTtBQUNBWixHQUFHLENBQUNFLEdBQUosQ0FBUSxVQUFVVyxHQUFWLEVBQWVDLEdBQWYsRUFBb0I7QUFDeEIsU0FBT0EsR0FBRyxDQUFDQyxNQUFKLENBQVcsR0FBWCxFQUFnQlIsSUFBaEIsQ0FBcUI7QUFDeEJTLElBQUFBLE9BQU8sZ0JBQVNILEdBQUcsQ0FBQ0ksR0FBYixxQkFEaUI7QUFFeEJDLElBQUFBLFVBQVUsRUFBRSxHQUZZLEVBQXJCLENBQVA7O0FBSUgsQ0FMRCxFOztBQU9lbEIsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCJcbmltcG9ydCBjb3JzIGZyb20gXCJjb3JzXCJcbmltcG9ydCBzd2FnZ2VyVUkgZnJvbSBcInN3YWdnZXItdWktZXhwcmVzc1wiXG5pbXBvcnQgc3dhZ2dlckRvY3MgZnJvbSBcIi4vZG9jcy9kb2NzLmpzb25cIlxuaW1wb3J0IHsgYnJ1dGVGb3JjZVNoaWVsZCB9IGZyb20gXCIuL2xpYi9taWRkbGV3YXJlcy9taWRkbGV3YXJlc1wiXG5pbXBvcnQgcm91dGVzIGZyb20gXCIuL3JvdXRlcy9yb3V0ZXNcIlxuXG5jb25zdCBhcHAgPSBleHByZXNzKClcbmFwcC5kaXNhYmxlKCd4LXBvd2VyZWQtYnknKTsgLy8gRG8gbm90IHNob3cgc2VydmVyIGlzIHJ1bm5pbmcgb24gRXhwcmVzc1xuXG4vKiogQXZvaWQgYXR0YWNrcyB0aHJvdWdoIHJlcGVhdGVkIHJlcXVlc3QgKi9cbmFwcC51c2UoYnJ1dGVGb3JjZVNoaWVsZCk7XG4vKiogQWN0aXZhdGUgY29ycyAqL1xuYXBwLnVzZShjb3JzKCkpO1xuLyoqIFJlcXVlc3RzIHBhcnNlciAqKi9cbmFwcC51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuXG4vKiogQVBJIHZlcnNpb25zICovXG5hcHAudXNlKCcvYXBpJywgcm91dGVzKTtcblxuLyoqIFJlZ2lzdGVyIHN3YWdnZXIgVUkgKi9cbmFwcC51c2UoJy9kb2NzJywgc3dhZ2dlclVJLnNlcnZlLCBzd2FnZ2VyVUkuc2V0dXAoc3dhZ2dlckRvY3MpKTtcblxuLyoqKiA0MDQgUmVzcG9uc2UgSGFuZGxlciAqKiovXG5hcHAudXNlKGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XG4gICAgICAgIG1lc3NhZ2U6IGBVUkwgJHtyZXEudXJsfSBub3QgZm91bmQgKDQwNClgLFxuICAgICAgICBzdGF0dXNDb2RlOiA0MDRcbiAgICB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhcHAiXX0=