"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("three"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var raptorText = "";

for (var i = 0; i < 100; i++) {
  raptorText += "RAPTOR ";
} // ENV VAR THIS


var testing = false; // MAYBE MAKE THESE FUNCTIONS THAT ARE CALLED AT THE RELEVANT STEP
// AFTER RENDERING AND WINDOW AND SHIT
// IE IGNORED BY THE SERVER SIDE

function _default(_ref) {
  var metadata = _ref.metadata,
      window = _ref.window;
  var canvasRef = (0, _react.useRef)();

  var loadThree = function loadThree() {
    // console.log("loading");
    var GLTFLoader = require("./GLTFLoader").GLTFLoader;

    var GUI = require("./dat.gui.module").GUI; // const width = window.innerWidth > 375 ? 375 : window.innerWidth;


    var width = window.innerWidth;
    var height = width;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 1;
    camera.position.y = -0.043; // camera.position.x = 0.08;

    console.log(testing);
    var gui;

    if (testing) {
      gui = new GUI();
      var cameraFolder = gui.addFolder("Camera");
      cameraFolder.add(camera.position, "y", -1, 1, 0.001);
      cameraFolder.add(camera.position, "x", -1, 1, 0.001);
      cameraFolder.add(camera.position, "z", -1, 1, 0.001);
    }

    var renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current
    });
    renderer.setClearColor(0xff0000, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height); // canvasRef.current.appendChild(renderer.domElement);

    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(50, 50, 50);
    scene.add(light);
    var spotLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(spotLight);
    var raptor;
    var loader = new GLTFLoader(); // ENV VARS FOR THIS SHIT

    console.log("production");
    var raptorAss = "production" === "development" ? "http://localhost:5000" : "https://raptor.pizza";
    loader.load(raptorAss + "/silver_raptor2.glb", // "http://" + window.location.hostname + ":5000/silver_raptor2.glb",
    // "https://raptor.pizza/silver_raptor2.glb",
    // require("./silver_raptor2.glb"),
    // props.metadata.animation_url.replace("ipfs://", "https://ipfs.io/ipfs/"),
    function (gltf) {
      gltf.scene.scale.set(10, 10, 10);
      gltf.scene.rotation.set(-0.3278, 1.4738, 0.088);
      gltf.scene.position.set(-0.0316, -0.0668, 0.222);
      scene.add(gltf.scene);
      console.log(testing);

      if (testing) {
        var raptorFolder = gui.addFolder("Raptor");
        raptorFolder.add(gltf.scene.rotation, "x", -Math.PI, Math.PI * 2, 0.0001);
        raptorFolder.add(gltf.scene.rotation, "y", -Math.PI, Math.PI * 2, 0.0001);
        raptorFolder.add(gltf.scene.rotation, "z", -Math.PI, Math.PI * 2, 0.0001);
        raptorFolder.add(gltf.scene.position, "x", -1, 1, 0.0001);
        raptorFolder.add(gltf.scene.position, "y", -1, 1, 0.0001);
        raptorFolder.add(gltf.scene.position, "z", -1, 1, 0.0001);
      }

      raptor = gltf.scene;
    });

    var animate = function animate() {
      requestAnimationFrame(animate);

      if (raptor) {
        raptor.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();
  };

  (0, _react.useEffect)(function () {
    if (!window) return;
    loadThree();
  }, [window]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "raptor-container",
    style: {
      color: "white"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("canvas", {
    // style="fill:red;"
    width: window ? window.innerWidth : 5000,
    height: window ? window.innderWidth : 5000,
    ref: canvasRef
  })), metadata && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "title-container"
  }, /*#__PURE__*/_react["default"].createElement("div", null, metadata.name)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "desc-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "title"
  }, metadata.description), /*#__PURE__*/_react["default"].createElement("div", {
    className: "owner"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "red-wrap"
  }, "owned by:"), " ", metadata.owner), /*#__PURE__*/_react["default"].createElement("div", {
    className: "line"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "raptor-text"
  }, raptorText))));
}