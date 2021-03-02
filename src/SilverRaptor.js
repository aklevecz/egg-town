import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { AmbientLight, PointLight, SpotLight } from "three";
import { GUI } from "../node_modules/three/examples/jsm/libs/dat.gui.module";

const testing = false;
export default function () {
  const canvasRef = useRef();
  const loadThree = () => {
    // console.log("loading");
    const GLTFLoader = require("./GLTFLoader").GLTFLoader;
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

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xff0000, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    canvasRef.current.appendChild(renderer.domElement);

    const light = new PointLight(0xffffff, 1);
    light.position.set(50, 50, 50);
    scene.add(light);

    const spotLight = new AmbientLight(0xffffff, 1);
    scene.add(spotLight);

    let raptor;
    const loader = new GLTFLoader();
    loader.load(
      require("./silver_raptor2.glb"),
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
    loadThree();
  }, []);

  return <div className="raptor-container" ref={canvasRef}></div>;
}
