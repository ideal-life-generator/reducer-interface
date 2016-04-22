"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = reducerInteface;

var _uniqueState = require("unique-state");

var _uniqueState2 = _interopRequireDefault(_uniqueState);

var _superMerge = require("super-merge");

var _superMerge2 = _interopRequireDefault(_superMerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function reducerInteface(initialState, Interface, cases) {
  var State = function (_Interface) {
    _inherits(State, _Interface);

    function State(state) {
      _classCallCheck(this, State);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(State).call(this));

      (0, _superMerge2.default)(_this, (0, _uniqueState2.default)(state));
      return _this;
    }

    _createClass(State, [{
      key: "merge",
      value: function merge(data) {
        return (0, _superMerge2.default)(this, data);
      }
    }]);

    return State;
  }(Interface);

  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? new State(initialState) : arguments[0];
    var action = arguments[1];
    var type = action.type;

    var data = _objectWithoutProperties(action, ["type"]);

    if (type in cases) {
      state = new State(state);

      cases[type](state, data);

      return state;
    }

    return state;
  };
}