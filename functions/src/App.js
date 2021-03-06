"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SilverRaptor = _interopRequireDefault(require("./SilverRaptor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function App(_ref) {
  var window = _ref.window;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "heading"
  }, "SILVER RAPTORS"), /*#__PURE__*/_react["default"].createElement(_SilverRaptor["default"], {
    window: window
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-line"
  }, "There are 200 Silver Raptors"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-line"
  }, "Some have been found"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-line"
  }, "Others have not"));
}

var _default = App;
exports["default"] = _default;