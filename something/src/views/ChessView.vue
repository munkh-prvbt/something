<script lang="ts">
import ChessGround from '../components/ChessGround.vue'
export default {
  components: { ChessGround },
}
</script>
<template>
  <ChessGround />
</template>

<style>
.container {
  display: flex;
  flex-direction: row;
  padding: 2rem;
  height: min(calc(100vh - 64px), 100vw);
}
</style>
