"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.rateLimiter = exports.cacheClient = exports.client = void 0;var _bluebird = _interopRequireDefault(require("bluebird"));
var _expressRedisCache = _interopRequireDefault(require("express-redis-cache"));
var _rateLimiterFlexible = require("rate-limiter-flexible");
var _index = require("./index");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}

var redis = _bluebird["default"].promisifyAll(require('redis'));
var client = redis.createClient({ host: _index.redis_host });exports.client = client;
var cacheClient = (0, _expressRedisCache["default"])({ client: client, expire: 60 });
/** Brute force attacks */exports.cacheClient = cacheClient;
var rateLimiter = new _rateLimiterFlexible.RateLimiterRedis({
  redis: client,
  keyPrefix: 'brute',
  points: 10, // 10 requests (In our case 1 point = 1 request)
  duration: 1, // per 1 second by IP
  blockDuration: 60 * 10 // seconds
});exports.rateLimiter = rateLimiter;

client.on('connect', function () {return console.log('> Connected to Redis DB!');});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvcmVkaXMtY29uZmlnLmpzIl0sIm5hbWVzIjpbInJlZGlzIiwiYmx1ZWJpcmQiLCJwcm9taXNpZnlBbGwiLCJyZXF1aXJlIiwiY2xpZW50IiwiY3JlYXRlQ2xpZW50IiwiaG9zdCIsImNhY2hlQ2xpZW50IiwiZXhwaXJlIiwicmF0ZUxpbWl0ZXIiLCJSYXRlTGltaXRlclJlZGlzIiwia2V5UHJlZml4IiwicG9pbnRzIiwiZHVyYXRpb24iLCJibG9ja0R1cmF0aW9uIiwib24iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiK0lBQUE7QUFDQTtBQUNBO0FBQ0EsZ0M7O0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxxQkFBU0MsWUFBVCxDQUFzQkMsT0FBTyxDQUFDLE9BQUQsQ0FBN0IsQ0FBZDtBQUNBLElBQU1DLE1BQU0sR0FBR0osS0FBSyxDQUFDSyxZQUFOLENBQW1CLEVBQUVDLElBQUksRUFBSkEsaUJBQUYsRUFBbkIsQ0FBZixDO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLG1DQUFNLEVBQUVILE1BQU0sRUFBTkEsTUFBRixFQUFVSSxNQUFNLEVBQUUsRUFBbEIsRUFBTixDQUFwQjtBQUNBLDBCO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLElBQUlDLHFDQUFKLENBQXFCO0FBQ3JDVixFQUFBQSxLQUFLLEVBQUVJLE1BRDhCO0FBRXJDTyxFQUFBQSxTQUFTLEVBQUUsT0FGMEI7QUFHckNDLEVBQUFBLE1BQU0sRUFBRSxFQUg2QixFQUd6QjtBQUNaQyxFQUFBQSxRQUFRLEVBQUUsQ0FKMkIsRUFJeEI7QUFDYkMsRUFBQUEsYUFBYSxFQUFFLEtBQUcsRUFMbUIsQ0FLaEI7QUFMZ0IsQ0FBckIsQ0FBcEIsQzs7QUFRQVYsTUFBTSxDQUFDVyxFQUFQLENBQVUsU0FBVixFQUFxQixvQkFBTUMsT0FBTyxDQUFDQyxHQUFSLENBQVksMEJBQVosQ0FBTixFQUFyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBibHVlYmlyZCBmcm9tIFwiYmx1ZWJpcmRcIlxuaW1wb3J0IGNhY2hlIGZyb20gXCJleHByZXNzLXJlZGlzLWNhY2hlXCJcbmltcG9ydCB7IFJhdGVMaW1pdGVyUmVkaXMgfSBmcm9tICdyYXRlLWxpbWl0ZXItZmxleGlibGUnXG5pbXBvcnQgeyByZWRpc19ob3N0IGFzIGhvc3QgfSBmcm9tIFwiLi9pbmRleFwiXG5cbmNvbnN0IHJlZGlzID0gYmx1ZWJpcmQucHJvbWlzaWZ5QWxsKHJlcXVpcmUoJ3JlZGlzJykpXG5jb25zdCBjbGllbnQgPSByZWRpcy5jcmVhdGVDbGllbnQoeyBob3N0IH0pXG5jb25zdCBjYWNoZUNsaWVudCA9IGNhY2hlKHsgY2xpZW50LCBleHBpcmU6IDYwIH0pXG4vKiogQnJ1dGUgZm9yY2UgYXR0YWNrcyAqL1xuY29uc3QgcmF0ZUxpbWl0ZXIgPSBuZXcgUmF0ZUxpbWl0ZXJSZWRpcyh7XG4gICAgcmVkaXM6IGNsaWVudCxcbiAgICBrZXlQcmVmaXg6ICdicnV0ZScsXG4gICAgcG9pbnRzOiAxMCwgLy8gMTAgcmVxdWVzdHMgKEluIG91ciBjYXNlIDEgcG9pbnQgPSAxIHJlcXVlc3QpXG4gICAgZHVyYXRpb246IDEsIC8vIHBlciAxIHNlY29uZCBieSBJUFxuICAgIGJsb2NrRHVyYXRpb246IDYwKjEwIC8vIHNlY29uZHNcbn0pO1xuXG5jbGllbnQub24oJ2Nvbm5lY3QnLCAoKSA9PiBjb25zb2xlLmxvZygnPiBDb25uZWN0ZWQgdG8gUmVkaXMgREIhJykpXG5leHBvcnQgeyBjbGllbnQsIGNhY2hlQ2xpZW50LCByYXRlTGltaXRlciB9Il19