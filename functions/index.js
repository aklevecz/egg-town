"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ssrapp = void 0;

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

// import "core-js/stable";
// import "regenerator-runtime/runtime";
console.log("development");

var index = _fs["default"].readFileSync(__dirname + "/index.html", "utf8");

var silverIndex = _fs["default"].readFileSync(__dirname + "/silver-index.html", "utf8");

var app = (0, _express["default"])();
var MAINNET_ADDRESS = "0x525aA007d06c40bCb2Ce4cDa06AC559768E6A327";

var silverRaptorAbi = require(__dirname + "/contracts/SilverRaptor.json").abi;

var web3 = new _web["default"]("https://mainnet.infura.io/v3/e835057bad674697959be47dcac5028e");
var contract = new web3.eth.Contract(silverRaptorAbi, MAINNET_ADDRESS);
app.get("/ipfs-test", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.send("forg");

          case 1:
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
app.get("/silver-raptors/**", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var tId, ipfsURI, owner, metadata, html, finalHtml;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("wtf");
            tId = req.path.split("/")[2];
            _context2.next = 4;
            return contract.methods.tokenURI(tId).call()["catch"](function (e) {
              return console.log(e);
            });

          case 4:
            ipfsURI = _context2.sent;
            _context2.next = 7;
            return contract.methods.ownerOf(tId).call()["catch"](function (e) {
              return console.log(e);
            });

          case 7:
            owner = _context2.sent;
            _context2.next = 10;
            return (0, _isomorphicFetch["default"])("https://ipfs.io/".concat(ipfsURI.replace(":/", ""))).then(function (r) {
              return r.json();
            })["catch"](function (e) {
              return console.log(e);
            });

          case 10:
            metadata = _context2.sent;
            metadata.owner = owner;
            html = (0, _server.renderToString)( /*#__PURE__*/_react["default"].createElement(_SilverRaptor["default"], {
              metadata: metadata,
              window: null
            }));
            finalHtml = silverIndex.replace("__EGG__", html).replace("__META_DATA__", JSON.stringify(metadata));
            res.send(finalHtml);

          case 15:
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
app.get("**", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, res) {
    var mockMeta, metadata, html, finalHtml;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // This will be more useful for pulling individual raptors
            // And plugging the data into the window to avoid rerendering
            mockMeta = {
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
            metadata = mockMeta;
            html = (0, _server.renderToString)( /*#__PURE__*/_react["default"].createElement(_App["default"], {
              metadata: metadata
            }));
            finalHtml = index.replace("__EGG__", html).replace("__META_DATA__", JSON.stringify(metadata));
            res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
            return _context3.abrupt("return", res.status(200).send(finalHtml));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var ssrapp = functions.https.onRequest(app);
exports.ssrapp = ssrapp;