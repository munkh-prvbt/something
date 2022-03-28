<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import anime from 'animejs'
</script>

<template>
  <main>
    <nav>
      <img class="logo" src="./assets/logo.svg" width="48" height="48" />
      <RouterLink to="/" class="text-sm font-medium">Home</RouterLink>
      <RouterLink to="/chess" class="text-sm font-medium">Chess</RouterLink>
    </nav>
    <RouterView />
  </main>
</template>

<script lang="ts">
export default {}
</script>

<style>
@import '@/assets/base.css';
nav {
  display: flex;
  height: 64px;
  background-color: black;
}

.logo {
  margin: 4px 16px;
}

a {
  padding: 16.75px;
  margin: 4px;
  transition: 0.2s;
  border-radius: 3px;
}

a:hover {
  background-color: darkgreen;
}
</style>
