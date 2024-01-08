<template>    <div class="links">

  <router-link to="/">home</router-link>
  <router-link to="/draw">draw</router-link>
  <router-link to="/bmw">bmw</router-link>
</div>
  <router-view />
</template>

<script setup lang="ts">

</script>
<style>

.links {
  position: absolute;
  padding: 30px;
  font-family: Arial , sans-serif;  z-index: 9 !important;

}
.links a {

  margin-left: 20px;
  text-decoration: none;
  color: #42b983 !important;
}
</style>
