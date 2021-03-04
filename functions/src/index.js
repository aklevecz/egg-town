"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _App = _interopRequireDefault(require("./App"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (!window.META_DATA) {
  // if not from server
  window.META_DATA = {
    name: "Silver Raptor 125",
    description: "The 125th Silver Raptor",
    external_url: "https://raptor.pizza/silver-raptors/125",
    image: "ipfs://QmYqPSXpWdZuLHUBZn22JizV88vzDmEJyLg4sdCd6Dy4de",
    animation_url: "ipfs://QmT729X131cHpsbxyQy9BkrTebcTPajjFevDbk4UXc3YBR?filename=silver_raptor.glb",
    attributes: [{
      display_type: "number",
      trait_type: "Gen",
      value: 1
    }]
  };
}

(0, _reactDom.render)( /*#__PURE__*/_react["default"].createElement(_App["default"], {
  metadata: window.META_DATA,
  window: window
}), document.querySelector("#root"));