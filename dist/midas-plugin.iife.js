var PluginRegister = (function () {
  'use strict';

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function _get() {
    return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get.apply(null, arguments);
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: true,
        configurable: true
      }
    }), Object.defineProperty(t, "prototype", {
      writable: false
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
    return t;
  }
  function _superPropGet(t, o, e, r) {
    var p = _get(_getPrototypeOf(t), o, e);
    return p;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  function makeRunNumberTable(_ref) {
    var _RunNumberTable;
    var Table = _ref.Table,
      SettingTypes = _ref.SettingTypes;
    return _RunNumberTable = /*#__PURE__*/function (_Table) {
      function RunNumberTable(props) {
        var _this;
        _classCallCheck(this, RunNumberTable);
        _this = _callSuper(this, RunNumberTable, [props]);
        _this.state = {
          runNumber: null,
          loading: true,
          error: null
        };
        return _this;
      }
      _inherits(RunNumberTable, _Table);
      return _createClass(RunNumberTable, [{
        key: "onInit",
        value: function onInit() {
          this.fetchRunNumber();
        }
      }, {
        key: "onUpdateTick",
        value: function onUpdateTick() {
          this.fetchRunNumber();
        }
      }, {
        key: "fetchRunNumber",
        value: function fetchRunNumber() {
          var _this2 = this;
          fetch(this.getDataUrl()).then(function (res) {
            return res.ok ? res.json() : Promise.reject("HTTP ".concat(res.status));
          }).then(function (json) {
            var runNumber = json === null || json === void 0 ? void 0 : json.data;
            if (runNumber === undefined || runNumber === null) {
              throw new Error('No run number found.');
            }
            _this2.setState({
              runNumber: runNumber,
              loading: false,
              error: null
            });
          })["catch"](function (err) {
            _this2.setState({
              error: err.message,
              loading: false
            });
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _this$state = this.state,
            loading = _this$state.loading,
            error = _this$state.error,
            runNumber = _this$state.runNumber;
          if (loading) return /*#__PURE__*/React.createElement("div", null, "Loading...");
          if (error) return /*#__PURE__*/React.createElement("div", {
            style: {
              color: 'red'
            }
          }, "Error: ", error);
          var displayValue = runNumber < 0 ? 'waiting for start of next run' : runNumber;
          return /*#__PURE__*/React.createElement("div", {
            className: "no-drag",
            style: {
              overflowX: 'auto'
            }
          }, /*#__PURE__*/React.createElement("table", {
            style: {
              borderCollapse: 'collapse',
              width: '100%'
            }
          }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
            style: thStyle
          }, "Metric"), /*#__PURE__*/React.createElement("th", {
            style: thStyle
          }, "Value"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
            style: tdStyle
          }, "Run Number"), /*#__PURE__*/React.createElement("td", {
            style: tdStyle
          }, displayValue)))));
        }
      }], [{
        key: "settingSchema",
        get: function get() {
          return _objectSpread2(_objectSpread2({}, _superPropGet(RunNumberTable, "settingSchema", this)), {}, {
            dataUrl: {
              type: SettingTypes.STRING,
              "default": 'http://127.0.0.1:8000/api/json_path?last=1&json_path=/run_number',
              label: 'Data URL',
              onChange: 'onUpdateTick',
              advanced: true
            }
          });
        }
      }]);
    }(Table), _defineProperty(_RunNumberTable, "displayName", 'Run Number Table'), _defineProperty(_RunNumberTable, "name", 'RunNumberTable'), _RunNumberTable;
  }
  var thStyle = {
    borderBottom: '2px solid #ccc',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f5f5f5'
  };
  var tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '8px'
  };

  function registerFigures(_ref) {
    var registry = _ref.registry,
      baseClasses = _ref.baseClasses;
    baseClasses.Plot;
      var SettingTypes = baseClasses.SettingTypes,
      Table = baseClasses.Table;
    var RunNumberTable = makeRunNumberTable({
      Table: Table,
      SettingTypes: SettingTypes
    });
    registry.register(RunNumberTable.name, RunNumberTable);
  }

  // Also expose globally for eval/script loading
  if (typeof window !== 'undefined') {
    window.PluginRegister = registerFigures;
  }

  return registerFigures;

})();
