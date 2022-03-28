<script setup lang="ts">
import { getIcon, type Square } from '@/models/chess'
</script>

<script lang="ts">
export default {
  props: ['square', 'dropped', 'dragging'],
}
</script>

<template>
  <div @dragenter.prevent="dragging(square)">
    <div class="text-sm fixed text-gray-500">
      {{ square.y + square.x }}
    </div>
    <img
      v-if="square.item !== undefined"
      :src="getIcon(square.item)"
      @dragend.prevent="dropped(square)"
      :class="`draggable rounded-full`"
    />
  </div>
</template>

<style scoped>
div,
img {
  width: 100%;
  height: 100%;
}

.draggable {
  cursor: move; /* fallback: no `url()` support or images disabled */
  cursor: url(images/grab.cur); /* fallback: Chrome 1-21, Firefox 1.5-26, Safari 4+, IE, Edge 12-14, Android 2.1-4.4.4 */
  cursor: grab; /* W3C standards syntax, all modern browser */
}

.draggable:active {
  cursor: url(images/grabbing.cur);
  cursor: grabbing;
}
</style>
