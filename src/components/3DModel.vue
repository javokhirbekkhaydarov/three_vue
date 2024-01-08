<template>
  <div id="container"></div>
</template>
<style>
#container {
  background: #000;
}
</style>
<script>
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';

export default {
  mounted() {
    let mixer;
    const clock = new THREE.Clock();
    const container = document.getElementById('container');
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    if(window.innerWidth <= 567) {
      renderer.setSize(1000, 500);

    }
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 10).texture;

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(10, 8, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enableRotateY = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load('./models/scene.gltf', function (gltf) {
      const model = gltf.scene;
      model.position.set(0, 0, 0);
      model.scale.set(4, 4, 4);
      if(window.innerWidth <= 567) {
        model.scale.set(0.3, 0.3, 0.3);


      }
      scene.add(model);
      mixer = new THREE.AnimationMixer(model);
      animate();
    }, undefined, function (e) {
      console.error(e);
    });

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer.update(delta);
      controls.update();
      renderer.render(scene, camera);
    }

    // Set camera and renderer size
    const width = window.innerWidth;
    camera.aspect = width / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, window.innerHeight);
  }
}
</script>


<style>
@media (max-width: 600px) {

  #container {
    overflow-x: hidden;
    padding: 0 !important;
    margin: 0 !important;
  }
  #container  canvas{
    background: none !important;
    width: 90% !important;
    overflow-x: hidden;
    padding: 0 !important;
    margin: 0 !important;
  }

  #hero-text {
    width: 100%;
  }
}
</style>