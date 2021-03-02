"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getFacts;

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getFacts() {
  console.log("fetct");
  return new Promise(function (resolve) {
    resolve([{
      text: "fucaaak"
    }]);
  });
}