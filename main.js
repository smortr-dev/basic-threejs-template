import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let camera, controls, scene, renderer;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);
  scene.fog = new THREE.FogExp2(0xcccccc, 0.001);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(400, 200, 0);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xefefff, 5);
  dirLight.position.set(10, 10, 10);
  dirLight.castShadow = true;
  // Set up shadow properties for the light
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.top = 10;
  dirLight.shadow.camera.bottom = -10;
  dirLight.shadow.camera.left = -10;
  dirLight.shadow.camera.right = 10;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 1000; // Increase the 'far' value

  scene.add(dirLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;

  const loader = new GLTFLoader();
  loader.load("new_site.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
    model.scale.set(14, 14, 14);
    model.rotation.set(0, 0, 0);

    // Ensure the model receives shadows
    model.traverse(function (node) {
      if (node.isMesh) {
        node.receiveShadow = true;
      }
    });
  });

  loader.load("new_pent.glb", (gltf) => {
    const model2 = gltf.scene;
    scene.add(model2);
    model2.position.set(0, 0, 0);
    model2.scale.set(13, 13, 13);
    model2.rotation.set(0, 0, 0);

    // Enable cast shadows for the model
    model2.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
  });

  renderer.outputEncoding = THREE.sRGBEncoding;
  // Enable shadow mapping for the renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}
