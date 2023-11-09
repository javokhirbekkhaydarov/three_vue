<template>    <div class="links">
  <p style="color: white">{{plus(5 , 5)}}</p>
  <router-link to="/">home</router-link>
  <router-link to="/draw">draw</router-link>
</div>
  <router-view />
</template>

<script setup lang="ts">
import { plus } from "@/helpers/plus/plus";

</script>
<style>

.links {
  position: absolute;
  padding: 30px;
  font-family: Arial , sans-serif;
}
.links a {
  margin-left: 20px;
  text-decoration: none;
  color: #42b983 !important;
}
</style>
