"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ssrapp = void 0;

require("regenerator-runtime/runtime.js");

var functions = _interopRequireWildcard(require("firebase-functions"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _App = _interopRequireDefault(require("./src/App"));

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _web = _interopRequireDefault(require("web3"));

var _SilverRaptor = _interopRequireDefault(require("./src/SilverRaptor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var index = _fs["default"].readFileSync(__dirname + "/index.html", "utf8");

var app = (0, _express["default"])();
var MAINNET_ADDRESS = "0x525aA007d06c40bCb2Ce4cDa06AC559768E6A327";

var silverRaptorAbi = require(__dirname + "/contracts/SilverRaptor.json").abi;

var web3 = new _web["default"]("https://mainnet.infura.io/v3/e835057bad674697959be47dcac5028e");
var contract = new web3.eth.Contract(silverRaptorAbi, MAINNET_ADDRESS);
app.get("/silver-raptor", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var html, finalHtml;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            html = (0, _server.renderToString)( /*#__PURE__*/_react["default"].createElement(_SilverRaptor["default"], null));
            finalHtml = index.replace("__EGG__", html);
            res.send(finalHtml);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get("**", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, res) {
    var metadata, html, finalHtml;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // This will be more useful for pulling individual raptors
            // And plugging the data into the window to avoid rerendering
            // const owner = await contract.methods
            //   .tokenURI(125)
            //   .call()
            //   .catch((e) => console.log(e));
            // const metadata = await fetch(`https://ipfs.io/${owner.replace(":/", "")}`)
            //   .then((r) => r.json())
            //   .catch((e) => console.log(e));
            metadata = mockMeta;
            html = (0, _server.renderToString)( /*#__PURE__*/_react["default"].createElement(_App["default"], {
              metadata: metadata
            }));
            finalHtml = index.replace("__EGG__", html).replace("__META_DATA__", JSON.stringify(metadata));
            res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
            return _context2.abrupt("return", res.status(200).send(finalHtml));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var ssrapp = functions.https.onRequest(app);
exports.ssrapp = ssrapp;
var mockMeta = {
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