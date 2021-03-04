import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { AmbientLight, PointLight, SpotLight } from "three";

let raptorText = "";
for (let i = 0; i < 100; i++) {
  raptorText += "RAPTOR ";
}
// ENV VAR THIS
const testing = false;

// MAYBE MAKE THESE FUNCTIONS THAT ARE CALLED AT THE RELEVANT STEP
// AFTER RENDERING AND WINDOW AND SHIT
// IE IGNORED BY THE SERVER SIDE
export default function ({ metadata, window }) {
  const canvasRef = useRef();
  const loadThree = () => {
    // console.log("loading");
    const GLTFLoader = require("./GLTFLoader").GLTFLoader;
    const GUI = require("./dat.gui.module").GUI;
    // const width = window.innerWidth > 375 ? 375 : window.innerWidth;
    const width = window.innerWidth;
    const height = width;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 1;
    camera.position.y = -0.043;
    // camera.position.x = 0.08;
    console.log(testing);
    let gui;
    if (testing) {
      gui = new GUI();
      const cameraFolder = gui.addFolder("Camera");
      cameraFolder.add(camera.position, "y", -1, 1, 0.001);
      cameraFolder.add(camera.position, "x", -1, 1, 0.001);
      cameraFolder.add(camera.position, "z", -1, 1, 0.001);
    }

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setClearColor(0xff0000, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    // canvasRef.current.appendChild(renderer.domElement);

    const light = new PointLight(0xffffff, 1);
    light.position.set(50, 50, 50);
    scene.add(light);

    const spotLight = new AmbientLight(0xffffff, 1);
    scene.add(spotLight);

    let raptor;
    const loader = new GLTFLoader();
    // ENV VARS FOR THIS SHIT
    console.log(process.env.NODE_ENV);
    const raptorAss =
      process.env.NODE_ENV === "development"
        ? "http://localhost:9000"
        : "https://raptor.pizza";
    loader.load(
      raptorAss + "/silver_raptor2.glb",
      // "http://" + window.location.hostname + ":5000/silver_raptor2.glb",
      // "https://raptor.pizza/silver_raptor2.glb",
      // require("./silver_raptor2.glb"),
      // props.metadata.animation_url.replace("ipfs://", "https://ipfs.io/ipfs/"),
      (gltf) => {
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.rotation.set(-0.3278, 1.4738, 0.088);
        gltf.scene.position.set(-0.0316, -0.0668, 0.222);
        scene.add(gltf.scene);

        console.log(testing);
        if (testing) {
          const raptorFolder = gui.addFolder("Raptor");
          raptorFolder.add(
            gltf.scene.rotation,
            "x",
            -Math.PI,
            Math.PI * 2,
            0.0001
          );
          raptorFolder.add(
            gltf.scene.rotation,
            "y",
            -Math.PI,
            Math.PI * 2,
            0.0001
          );
          raptorFolder.add(
            gltf.scene.rotation,
            "z",
            -Math.PI,
            Math.PI * 2,
            0.0001
          );
          raptorFolder.add(gltf.scene.position, "x", -1, 1, 0.0001);
          raptorFolder.add(gltf.scene.position, "y", -1, 1, 0.0001);
          raptorFolder.add(gltf.scene.position, "z", -1, 1, 0.0001);
        }
        raptor = gltf.scene;
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      if (raptor) {
        raptor.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();
  };
  useEffect(() => {
    if (!window) return;
    loadThree();
  }, [window]);

  return (
    <div className="raptor-container" style={{ color: "white" }}>
      <div>
        <canvas
          // style="fill:red;"
          width={window ? window.innerWidth : 5000}
          height={window ? window.innderWidth : 5000}
          ref={canvasRef}
        />
      </div>
      {/* THIS SHOULD PROBABLY LIVE OUTSIDE OF THIS SO IT CAN BE AGNOSTIC TO DATA*/}
      {metadata && (
        <>
          <div className="title-container">
            <div>{metadata.name}</div>
          </div>
          <div className="desc-container">
            <div className="title">{metadata.description}</div>
            <div className="owner">
              <span className="red-wrap">owned by:</span> {metadata.owner}
            </div>
            <div className="line"></div>
            <div className="raptor-text">{raptorText}</div>
          </div>
        </>
      )}
    </div>
  );
}
