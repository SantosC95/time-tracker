"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ProjectAssociationError = exports.NotAllowedActionError = exports.RecordCreationError = exports.TaskNotFoundError = exports.TaskCreationError = exports.ProjectNotFoundError = exports.ProjectCreationError = exports.MaxSessionsError = exports.SessionExpiredError = exports.InvalidTokenError = exports.InvalidCredentialsError = exports.UserNotFoundError = exports.InvalidPassword = exports.DuplicateEmailError = exports.UserCreationError = void 0;function _typeof(obj) {if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (call && (_typeof(call) === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _construct(Parent, args, Class) {if (isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}var ApplicationError = /*#__PURE__*/function (_Error) {_inherits(ApplicationError, _Error);
  function ApplicationError(message, status) {var _this;_classCallCheck(this, ApplicationError);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ApplicationError).call(this));
    Error.captureStackTrace(_assertThisInitialized(_this), _this.constructor);
    _this.name = _this.constructor.name;
    _this.message = message ||
    'Something went wrong. Please try again.';
    _this.status = status || 500;return _this;
  }return ApplicationError;}(_wrapNativeSuper(Error));var


UserCreationError = /*#__PURE__*/function (_ApplicationError) {_inherits(UserCreationError, _ApplicationError);
  function UserCreationError(message, details) {var _this2;_classCallCheck(this, UserCreationError);
    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(UserCreationError).call(this, message || 'Error creating the profile', 400));
    _this2.details = details;return _this2;
  }return UserCreationError;}(ApplicationError);exports.UserCreationError = UserCreationError;var


DuplicateEmailError = /*#__PURE__*/function (_ApplicationError2) {_inherits(DuplicateEmailError, _ApplicationError2);
  function DuplicateEmailError(message) {_classCallCheck(this, DuplicateEmailError);return _possibleConstructorReturn(this, _getPrototypeOf(DuplicateEmailError).call(this,
    message || 'Duplicate email! Please try another value', 400));
  }return DuplicateEmailError;}(ApplicationError);exports.DuplicateEmailError = DuplicateEmailError;var


InvalidPassword = /*#__PURE__*/function (_ApplicationError3) {_inherits(InvalidPassword, _ApplicationError3);
  function InvalidPassword(message) {_classCallCheck(this, InvalidPassword);return _possibleConstructorReturn(this, _getPrototypeOf(InvalidPassword).call(this,

    message || 'Password must be six (6) or more alphanumeric characters',
    400));

  }return InvalidPassword;}(ApplicationError);exports.InvalidPassword = InvalidPassword;var


UserNotFoundError = /*#__PURE__*/function (_ApplicationError4) {_inherits(UserNotFoundError, _ApplicationError4);
  function UserNotFoundError(message) {_classCallCheck(this, UserNotFoundError);return _possibleConstructorReturn(this, _getPrototypeOf(UserNotFoundError).call(this,
    message || 'No User found.', 404));
  }return UserNotFoundError;}(ApplicationError);exports.UserNotFoundError = UserNotFoundError;var


InvalidCredentialsError = /*#__PURE__*/function (_ApplicationError5) {_inherits(InvalidCredentialsError, _ApplicationError5);
  function InvalidCredentialsError(message) {_classCallCheck(this, InvalidCredentialsError);return _possibleConstructorReturn(this, _getPrototypeOf(InvalidCredentialsError).call(this,
    message || 'Invalid credentials.', 401));
  }return InvalidCredentialsError;}(ApplicationError);exports.InvalidCredentialsError = InvalidCredentialsError;var


InvalidTokenError = /*#__PURE__*/function (_ApplicationError6) {_inherits(InvalidTokenError, _ApplicationError6);
  function InvalidTokenError(message) {_classCallCheck(this, InvalidTokenError);return _possibleConstructorReturn(this, _getPrototypeOf(InvalidTokenError).call(this,
    message || 'Invalid Session. Please try login again', 401));
  }return InvalidTokenError;}(ApplicationError);exports.InvalidTokenError = InvalidTokenError;var


SessionExpiredError = /*#__PURE__*/function (_ApplicationError7) {_inherits(SessionExpiredError, _ApplicationError7);
  function SessionExpiredError(message) {_classCallCheck(this, SessionExpiredError);return _possibleConstructorReturn(this, _getPrototypeOf(SessionExpiredError).call(this,
    message || 'Session has expired. Please try login again', 401));
  }return SessionExpiredError;}(ApplicationError);exports.SessionExpiredError = SessionExpiredError;var


MaxSessionsError = /*#__PURE__*/function (_ApplicationError8) {_inherits(MaxSessionsError, _ApplicationError8);
  function MaxSessionsError(message, details) {var _this3;_classCallCheck(this, MaxSessionsError);
    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(MaxSessionsError).call(this, message || 'Maximum number of allowed sessions reached. Please use or close one of the active sessions', 401));
    _this3.details = details;return _this3;
  }return MaxSessionsError;}(ApplicationError);exports.MaxSessionsError = MaxSessionsError;var


ProjectCreationError = /*#__PURE__*/function (_ApplicationError9) {_inherits(ProjectCreationError, _ApplicationError9);
  function ProjectCreationError(message, details) {var _this4;_classCallCheck(this, ProjectCreationError);
    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(ProjectCreationError).call(this, message || 'There has been an error when creating the project', 400));
    _this4.details = details;return _this4;
  }return ProjectCreationError;}(ApplicationError);exports.ProjectCreationError = ProjectCreationError;var


ProjectNotFoundError = /*#__PURE__*/function (_ApplicationError10) {_inherits(ProjectNotFoundError, _ApplicationError10);
  function ProjectNotFoundError(message) {_classCallCheck(this, ProjectNotFoundError);return _possibleConstructorReturn(this, _getPrototypeOf(ProjectNotFoundError).call(this,
    message || 'No project found', 404));
  }return ProjectNotFoundError;}(ApplicationError);exports.ProjectNotFoundError = ProjectNotFoundError;var


TaskCreationError = /*#__PURE__*/function (_ApplicationError11) {_inherits(TaskCreationError, _ApplicationError11);
  function TaskCreationError(message, details) {var _this5;_classCallCheck(this, TaskCreationError);
    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(TaskCreationError).call(this, message || 'There has been an error when creating the task', 400));
    _this5.details = details;return _this5;
  }return TaskCreationError;}(ApplicationError);exports.TaskCreationError = TaskCreationError;var


TaskNotFoundError = /*#__PURE__*/function (_ApplicationError12) {_inherits(TaskNotFoundError, _ApplicationError12);
  function TaskNotFoundError(message) {_classCallCheck(this, TaskNotFoundError);return _possibleConstructorReturn(this, _getPrototypeOf(TaskNotFoundError).call(this,
    message || 'No project found', 404));
  }return TaskNotFoundError;}(ApplicationError);exports.TaskNotFoundError = TaskNotFoundError;var


RecordCreationError = /*#__PURE__*/function (_ApplicationError13) {_inherits(RecordCreationError, _ApplicationError13);
  function RecordCreationError(message, details) {var _this6;_classCallCheck(this, RecordCreationError);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(RecordCreationError).call(this, message || 'There has been an error when setting this record', 400));
    _this6.details = details;return _this6;
  }return RecordCreationError;}(ApplicationError);exports.RecordCreationError = RecordCreationError;var


NotAllowedActionError = /*#__PURE__*/function (_ApplicationError14) {_inherits(NotAllowedActionError, _ApplicationError14);
  function NotAllowedActionError(message) {_classCallCheck(this, NotAllowedActionError);return _possibleConstructorReturn(this, _getPrototypeOf(NotAllowedActionError).call(this,
    message || 'You do not have permissions over this resource', 403));
  }return NotAllowedActionError;}(ApplicationError);exports.NotAllowedActionError = NotAllowedActionError;var


ProjectAssociationError = /*#__PURE__*/function (_ApplicationError15) {_inherits(ProjectAssociationError, _ApplicationError15);
  function ProjectAssociationError(message) {_classCallCheck(this, ProjectAssociationError);return _possibleConstructorReturn(this, _getPrototypeOf(ProjectAssociationError).call(this,
    message || 'You do not belong to this project', 403));
  }return ProjectAssociationError;}(ApplicationError);exports.ProjectAssociationError = ProjectAssociationError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZXJyb3JzL2Vycm9yLmpzIl0sIm5hbWVzIjpbIkFwcGxpY2F0aW9uRXJyb3IiLCJtZXNzYWdlIiwic3RhdHVzIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsIlVzZXJDcmVhdGlvbkVycm9yIiwiZGV0YWlscyIsIkR1cGxpY2F0ZUVtYWlsRXJyb3IiLCJJbnZhbGlkUGFzc3dvcmQiLCJVc2VyTm90Rm91bmRFcnJvciIsIkludmFsaWRDcmVkZW50aWFsc0Vycm9yIiwiSW52YWxpZFRva2VuRXJyb3IiLCJTZXNzaW9uRXhwaXJlZEVycm9yIiwiTWF4U2Vzc2lvbnNFcnJvciIsIlByb2plY3RDcmVhdGlvbkVycm9yIiwiUHJvamVjdE5vdEZvdW5kRXJyb3IiLCJUYXNrQ3JlYXRpb25FcnJvciIsIlRhc2tOb3RGb3VuZEVycm9yIiwiUmVjb3JkQ3JlYXRpb25FcnJvciIsIk5vdEFsbG93ZWRBY3Rpb25FcnJvciIsIlByb2plY3RBc3NvY2lhdGlvbkVycm9yIl0sIm1hcHBpbmdzIjoib2tIQUFNQSxnQjtBQUNGLDRCQUFZQyxPQUFaLEVBQXFCQyxNQUFyQixFQUE2QjtBQUN6QjtBQUNBQyxJQUFBQSxLQUFLLENBQUNDLGlCQUFOLGdDQUE4QixNQUFLQyxXQUFuQztBQUNBLFVBQUtDLElBQUwsR0FBWSxNQUFLRCxXQUFMLENBQWlCQyxJQUE3QjtBQUNBLFVBQUtMLE9BQUwsR0FBZUEsT0FBTztBQUNsQiw2Q0FESjtBQUVBLFVBQUtDLE1BQUwsR0FBY0EsTUFBTSxJQUFJLEdBQXhCLENBTnlCO0FBTzVCLEcsMkNBUjBCQyxLOzs7QUFXbEJJLGlCO0FBQ1QsNkJBQVlOLE9BQVosRUFBcUJPLE9BQXJCLEVBQThCO0FBQzFCLDRGQUFNUCxPQUFPLElBQUksNEJBQWpCLEVBQStDLEdBQS9DO0FBQ0EsV0FBS08sT0FBTCxHQUFlQSxPQUFmLENBRjBCO0FBRzdCLEcsMkJBSmtDUixnQjs7O0FBTzFCUyxtQjtBQUNULCtCQUFZUixPQUFaLEVBQXFCO0FBQ1hBLElBQUFBLE9BQU8sSUFBSSwyQ0FEQSxFQUM2QyxHQUQ3QztBQUVwQixHLDZCQUhvQ0QsZ0I7OztBQU01QlUsZTtBQUNULDJCQUFZVCxPQUFaLEVBQXFCOztBQUViQSxJQUFBQSxPQUFPLElBQUksMERBRkU7QUFHYixPQUhhOztBQUtwQixHLHlCQU5nQ0QsZ0I7OztBQVN4QlcsaUI7QUFDVCw2QkFBWVYsT0FBWixFQUFxQjtBQUNYQSxJQUFBQSxPQUFPLElBQUksZ0JBREEsRUFDa0IsR0FEbEI7QUFFcEIsRywyQkFIa0NELGdCOzs7QUFNMUJZLHVCO0FBQ1QsbUNBQVlYLE9BQVosRUFBcUI7QUFDWEEsSUFBQUEsT0FBTyxJQUFJLHNCQURBLEVBQ3dCLEdBRHhCO0FBRXBCLEcsaUNBSHdDRCxnQjs7O0FBTWhDYSxpQjtBQUNULDZCQUFZWixPQUFaLEVBQXFCO0FBQ1hBLElBQUFBLE9BQU8sSUFBSSx5Q0FEQSxFQUMyQyxHQUQzQztBQUVwQixHLDJCQUhrQ0QsZ0I7OztBQU0xQmMsbUI7QUFDVCwrQkFBWWIsT0FBWixFQUFxQjtBQUNYQSxJQUFBQSxPQUFPLElBQUksNkNBREEsRUFDK0MsR0FEL0M7QUFFcEIsRyw2QkFIb0NELGdCOzs7QUFNNUJlLGdCO0FBQ1QsNEJBQVlkLE9BQVosRUFBcUJPLE9BQXJCLEVBQThCO0FBQzFCLDJGQUFNUCxPQUFPLElBQUksNEZBQWpCLEVBQStHLEdBQS9HO0FBQ0EsV0FBS08sT0FBTCxHQUFlQSxPQUFmLENBRjBCO0FBRzdCLEcsMEJBSmlDUixnQjs7O0FBT3pCZ0Isb0I7QUFDVCxnQ0FBWWYsT0FBWixFQUFxQk8sT0FBckIsRUFBOEI7QUFDMUIsK0ZBQU1QLE9BQU8sSUFBSSxtREFBakIsRUFBc0UsR0FBdEU7QUFDQSxXQUFLTyxPQUFMLEdBQWVBLE9BQWYsQ0FGMEI7QUFHN0IsRyw4QkFKcUNSLGdCOzs7QUFPN0JpQixvQjtBQUNULGdDQUFZaEIsT0FBWixFQUFxQjtBQUNYQSxJQUFBQSxPQUFPLElBQUksa0JBREEsRUFDb0IsR0FEcEI7QUFFcEIsRyw4QkFIcUNELGdCOzs7QUFNN0JrQixpQjtBQUNULDZCQUFZakIsT0FBWixFQUFxQk8sT0FBckIsRUFBOEI7QUFDMUIsNEZBQU1QLE9BQU8sSUFBSSxnREFBakIsRUFBbUUsR0FBbkU7QUFDQSxXQUFLTyxPQUFMLEdBQWVBLE9BQWYsQ0FGMEI7QUFHN0IsRywyQkFKa0NSLGdCOzs7QUFPMUJtQixpQjtBQUNULDZCQUFZbEIsT0FBWixFQUFxQjtBQUNYQSxJQUFBQSxPQUFPLElBQUksa0JBREEsRUFDb0IsR0FEcEI7QUFFcEIsRywyQkFIa0NELGdCOzs7QUFNMUJvQixtQjtBQUNULCtCQUFZbkIsT0FBWixFQUFxQk8sT0FBckIsRUFBOEI7QUFDMUIsOEZBQU1QLE9BQU8sSUFBSSxrREFBakIsRUFBcUUsR0FBckU7QUFDQSxXQUFLTyxPQUFMLEdBQWVBLE9BQWYsQ0FGMEI7QUFHN0IsRyw2QkFKb0NSLGdCOzs7QUFPNUJxQixxQjtBQUNULGlDQUFZcEIsT0FBWixFQUFxQjtBQUNYQSxJQUFBQSxPQUFPLElBQUksZ0RBREEsRUFDa0QsR0FEbEQ7QUFFcEIsRywrQkFIc0NELGdCOzs7QUFNOUJzQix1QjtBQUNULG1DQUFZckIsT0FBWixFQUFxQjtBQUNYQSxJQUFBQSxPQUFPLElBQUksbUNBREEsRUFDcUMsR0FEckM7QUFFcEIsRyxpQ0FId0NELGdCIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fFxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IGFnYWluLic7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzIHx8IDUwMDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyQ3JlYXRpb25FcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGRldGFpbHMpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCAnRXJyb3IgY3JlYXRpbmcgdGhlIHByb2ZpbGUnLCA0MDApO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRHVwbGljYXRlRW1haWxFcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCAnRHVwbGljYXRlIGVtYWlsISBQbGVhc2UgdHJ5IGFub3RoZXIgdmFsdWUnLCA0MDApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludmFsaWRQYXNzd29yZCBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBtZXNzYWdlIHx8ICdQYXNzd29yZCBtdXN0IGJlIHNpeCAoNikgb3IgbW9yZSBhbHBoYW51bWVyaWMgY2hhcmFjdGVycycsIFxuICAgICAgICAgICAgNDAwXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVXNlck5vdEZvdW5kRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJ05vIFVzZXIgZm91bmQuJywgNDA0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkQ3JlZGVudGlhbHNFcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCAnSW52YWxpZCBjcmVkZW50aWFscy4nLCA0MDEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludmFsaWRUb2tlbkVycm9yIGV4dGVuZHMgQXBwbGljYXRpb25FcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlIHx8ICdJbnZhbGlkIFNlc3Npb24uIFBsZWFzZSB0cnkgbG9naW4gYWdhaW4nLCA0MDEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNlc3Npb25FeHBpcmVkRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJ1Nlc3Npb24gaGFzIGV4cGlyZWQuIFBsZWFzZSB0cnkgbG9naW4gYWdhaW4nLCA0MDEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1heFNlc3Npb25zRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBkZXRhaWxzKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJ01heGltdW0gbnVtYmVyIG9mIGFsbG93ZWQgc2Vzc2lvbnMgcmVhY2hlZC4gUGxlYXNlIHVzZSBvciBjbG9zZSBvbmUgb2YgdGhlIGFjdGl2ZSBzZXNzaW9ucycsIDQwMSk7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHNcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0Q3JlYXRpb25FcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGRldGFpbHMpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCAnVGhlcmUgaGFzIGJlZW4gYW4gZXJyb3Igd2hlbiBjcmVhdGluZyB0aGUgcHJvamVjdCcsIDQwMCk7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHNcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0Tm90Rm91bmRFcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCAnTm8gcHJvamVjdCBmb3VuZCcsIDQwNCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFza0NyZWF0aW9uRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBkZXRhaWxzKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJ1RoZXJlIGhhcyBiZWVuIGFuIGVycm9yIHdoZW4gY3JlYXRpbmcgdGhlIHRhc2snLCA0MDApO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFza05vdEZvdW5kRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJ05vIHByb2plY3QgZm91bmQnLCA0MDQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlY29yZENyZWF0aW9uRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBkZXRhaWxzKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJ1RoZXJlIGhhcyBiZWVuIGFuIGVycm9yIHdoZW4gc2V0dGluZyB0aGlzIHJlY29yZCcsIDQwMCk7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHNcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBOb3RBbGxvd2VkQWN0aW9uRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJ1lvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9ucyBvdmVyIHRoaXMgcmVzb3VyY2UnLCA0MDMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3RBc3NvY2lhdGlvbkVycm9yIGV4dGVuZHMgQXBwbGljYXRpb25FcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlIHx8ICdZb3UgZG8gbm90IGJlbG9uZyB0byB0aGlzIHByb2plY3QnLCA0MDMpO1xuICAgIH1cbn1cblxuIl19