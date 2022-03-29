<script setup lang="ts">
import { getIcon } from '@/models/chess'
</script>

<script lang="ts">
export default {
  props: ['square', 'dropped', 'dragging'],
  methods: {
    dragStart(event: DragEvent) {
      if (event.dataTransfer) {
        event.dataTransfer.setData('text/plain', '')
        event.dataTransfer.effectAllowed = 'move'
      }
    },
    dragOver() {
      document.documentElement.style.cursor = 'grabbing'
    },
    dragEnd() {
      document.documentElement.style.cursor = 'default'
      this.dropped(this.square)
    },
  },
}
</script>

<template>
  <div
    @dragstart="dragStart($event)"
    @dragover.prevent="dragOver()"
    @dragenter.prevent="dragging(square)"
  >
    <div class="text-sm fixed text-gray-500">
      {{ square.y + square.x }}
    </div>
    <img
      draggable
      v-if="square.item !== undefined"
      :src="getIcon(square.item)"
      @dragend.prevent="dragEnd()"
      class="rounded-full cursor-grab hover:scale-105 transition active:scale-90"
    />
  </div>
</template>

<style scoped>
div,
img {
  width: 100%;
  height: 100%;
}
img:active {
  cursor: grabbing;
}
</style>
