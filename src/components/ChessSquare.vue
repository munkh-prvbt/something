<script setup lang="ts">
import { getIcon } from '@/models/chess'
</script>

<script lang="ts">
export default {
  props: ['square', 'dropped', 'dragging'],
}
</script>

<template>
  <div draggable @dragenter.prevent="dragging(square)">
    <div class="text-sm fixed text-gray-500">
      {{ square.y + square.x }}
    </div>
    <img
      draggable
      v-if="square.item !== undefined"
      :src="getIcon(square.item)"
      @dragend.prevent="dropped(square)"
      class="rounded-full cursor-grab hover:scale-105 transition"
    />
  </div>
</template>

<style scoped>
div,
img {
  width: 100%;
  height: 100%;
}
.ms-grab-cursor,
.ms-grabbing-cursor {
  cursor: grabbing;
}
</style>
