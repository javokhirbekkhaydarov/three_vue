<template>
  <div class="box" ref="box"></div>
</template>
<script lang="ts">
export default {
  name: "ThreeComponent",
};
</script>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as THREE from "three";

const box = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (box.value) {
    box.value.appendChild(renderer.domElement);
  }

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xAFE1AF });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
});
</script>
<style scoped></style>
