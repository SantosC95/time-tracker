"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _express = require("express");
var _user = _interopRequireDefault(require("./user"));
var _projects = _interopRequireDefault(require("./projects"));
var _tasks = _interopRequireDefault(require("./tasks"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}
var router = (0, _express.Router)();

/** Test API v1.0 */
router.get('/ping', function (req, res) {
  return res.
  status(200).
  json({
    message: "Pong. API v1.0 está funcionando!",
    requestIp: req.ip });

});

/** Register API routes */
router.use(_user["default"], _projects["default"], _tasks["default"]);var _default =

router;exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvcm91dGVzLmpzIl0sIm5hbWVzIjpbInJvdXRlciIsImdldCIsInJlcSIsInJlcyIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwicmVxdWVzdElwIiwiaXAiLCJ1c2UiLCJVc2VyUm91dGVzIiwiUHJvamVjdFJvdXRlcyIsIlRhc2tSb3V0ZXMiXSwibWFwcGluZ3MiOiJ1R0FBQTtBQUNBO0FBQ0E7QUFDQSx3RDtBQUNBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7QUFFQTtBQUNBQSxNQUFNLENBQUNDLEdBQVAsQ0FBVyxPQUFYLEVBQW9CLFVBQUVDLEdBQUYsRUFBT0MsR0FBUCxFQUFnQjtBQUNoQyxTQUFPQSxHQUFHO0FBQ0xDLEVBQUFBLE1BREUsQ0FDSyxHQURMO0FBRUZDLEVBQUFBLElBRkUsQ0FFRztBQUNGQyxJQUFBQSxPQUFPLEVBQUUsa0NBRFA7QUFFRkMsSUFBQUEsU0FBUyxFQUFFTCxHQUFHLENBQUNNLEVBRmIsRUFGSCxDQUFQOztBQU1ILENBUEQ7O0FBU0E7QUFDQVIsTUFBTSxDQUFDUyxHQUFQLENBQVdDLGdCQUFYLEVBQXVCQyxvQkFBdkIsRUFBc0NDLGlCQUF0QyxFOztBQUVlWixNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIlxuaW1wb3J0IFVzZXJSb3V0ZXMgZnJvbSBcIi4vdXNlclwiXG5pbXBvcnQgUHJvamVjdFJvdXRlcyBmcm9tIFwiLi9wcm9qZWN0c1wiXG5pbXBvcnQgVGFza1JvdXRlcyBmcm9tIFwiLi90YXNrc1wiXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuLyoqIFRlc3QgQVBJIHYxLjAgKi9cbnJvdXRlci5nZXQoJy9waW5nJywgKCByZXEsIHJlcyApID0+IHtcbiAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IFxuICAgICAgICAgICAgbWVzc2FnZTogXCJQb25nLiBBUEkgdjEuMCBlc3TDoSBmdW5jaW9uYW5kbyFcIixcbiAgICAgICAgICAgIHJlcXVlc3RJcDogcmVxLmlwIFxuICAgICAgICB9KVxufSlcblxuLyoqIFJlZ2lzdGVyIEFQSSByb3V0ZXMgKi9cbnJvdXRlci51c2UoVXNlclJvdXRlcywgUHJvamVjdFJvdXRlcywgVGFza1JvdXRlcylcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyIl19