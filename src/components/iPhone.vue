<template>
  <div class="parent" style="padding-top: 50px;">

    <h1>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam
      aspernatur commodi corporis cumque cupiditate dolore ducimus error esse
      incidunt iure laudantium numquam perspiciatis provident quasi quia
      repellendus reprehenderit, rerum sed sunt tempora ut voluptate. Ab
      blanditiis commodi corporis incidunt numquam odio totam velit! Architecto at
      beatae corporis dolor dolore, ducimus eum eveniet ex, expedita iure libero
      nobis officia quae quis sed unde, veritatis! Accusantium culpa dicta et
      fugiat itaque molestiae necessitatibus nihil, porro quae reprehenderit
      repudiandae, sunt, tempora! Ab deleniti facilis fugiat illum impedit nobis
      pariatur! Blanditiis eveniet, itaque, odit officia quas quibusdam quos
      recusandae rerum temporibus unde ut.
    </h1>
    <div id="container" style="padding-top: 50px;"></div>

    <h1>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam
      aspernatur commodi corporis cumque cupiditate dolore ducimus error esse
      incidunt iure laudantium numquam perspiciatis provident quasi quia
      repellendus reprehenderit, rerum sed sunt tempora ut voluptate. Ab
      blanditiis commodi corporis incidunt numquam odio totam velit! Architecto at
      beatae corporis dolor dolore, ducimus eum eveniet ex, expedita iure libero
      nobis officia quae quis sed unde, veritatis! Accusantium culpa dicta et
      fugiat itaque molestiae necessitatibus nihil, porro quae reprehenderit
      repudiandae, sunt, tempora! Ab deleniti facilis fugiat illum impedit nobis
      pariatur! Blanditiis eveniet, itaque, odit officia quas quibusdam quos
      recusandae rerum temporibus unde ut.
    </h1>
  </div>
</template>
<style>
.parent{
  background: #000;
  font-family: Arial , sans-serif;
  color: #fff;
}
</style>
<script setup>
import { onMounted } from 'vue';
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
onMounted(() => {

  let mixer;
  let model;

  const clock = new THREE.Clock();
  const container = document.getElementById("container");
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerWidth <= 567) {
    renderer.setSize(1000, 500);
  }

  renderer.outputEncoding = THREE.sRGBEncoding;

  if (container) {
    container.appendChild(renderer.domElement);
  }

  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 10).texture;

  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(10, 10, 10);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;
  controls.enableRotate = true;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load(
    "./12/scene.gltf",
    function (gltf) {
      model = gltf.scene;
      model.position.set(0, 0, 0);
      model.scale.set(0.06, 0.06, 0.06);

      if (window.innerWidth <= 567) {
        model.scale.set(0.3, 0.3, 0.3);
      }

      scene.add(model);
      mixer = new THREE.AnimationMixer(model);
      animate();
    },
    undefined,
    function (e) {
      console.error(e);
    }
  );

  let prevScrollPos = window.scrollY;

  function onScroll() {
    const currentScrollPos = window.scrollY;
    const scrollDirection = currentScrollPos > prevScrollPos ? 1 : -1;

    if (model) {
      model.rotation.y += 0.05 * scrollDirection; // Adjust the rotation speed as needed
    }

    prevScrollPos = currentScrollPos;
  }

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

  window.addEventListener("scroll", onScroll);
});
</script>
<style>
@media (max-width: 600px) {
  #container {
    overflow-x: hidden;
    padding: 0 !important;
    margin: 0 !important;
  }
  #container canvas {
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
