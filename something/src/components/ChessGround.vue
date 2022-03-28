<script setup lang="ts">
import {
  type Board,
  type Square,
  movePiece,
  getNewBoard,
  getEmptyBoard,
} from '@/models/chess'
import ChessSquare from './ChessSquare.vue'
import anime from 'animejs'
</script>

<script lang="ts">
let endPoint: Square

export default {
  data(): { board?: Board; move: number } {
    return {
      board: undefined,
      move: 0,
    }
  },
  mounted() {
    this.board = getNewBoard()
  },
  methods: {
    dropped(square: Square) {
      if (
        square.id === endPoint.id ||
        square.item?.side === endPoint.item?.side
      ) {
        return
      }

      this.board = {
        squares: movePiece(
          this.board?.squares || getNewBoard().squares,
          square.x,
          square.y,
          endPoint.x,
          endPoint.y
        ),
      }
      this.move++
      anime({
        targets: '.index-' + square.id,
        scale: [
          { value: 1.05, easing: 'easeOutSine', duration: 100 },
          { value: 1, easing: 'easeInOutQuad', duration: 300 },
        ],
      })
      anime({
        targets: '.index-' + endPoint.id,
        scale: [
          { value: 0.9, easing: 'easeOutSine', duration: 100 },
          { value: 1, easing: 'easeInOutQuad', duration: 300 },
        ],
      })
    },
    dragging(square: Square) {
      endPoint = square
    },
    reset() {
      anime({
        targets: '.container .node',
        scale: [
          { value: 0, easing: 'easeOutSine', duration: 400 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200, delay: 600 },
        ],
        delay: anime.stagger(200, { grid: [8, 8], from: 'center' }),
        update: (animation) => {
          if (Math.ceil(animation.progress) === 40) {
            console.log('sad')
            this.board = getNewBoard()
          }
        },
      })
      this.move = 0
    },
  },
}
</script>

<template>
  <div class="container">
    <ul v-for="(row, i) in board?.squares" :key="row[0].y">
      <li v-for="(square, j) in row" :key="square.id">
        <div
          :class="`node index-${square.id} ${
            (i + j) % 2 === 0 ? 'white' : 'black'
          }`"
        >
          <ChessSquare
            :square="square"
            :dropped="dropped"
            :dragging="dragging"
          />
        </div>
      </li>
    </ul>
    <div>{{ move }}</div>
    <button v-on:click="reset()">res</button>
  </div>
</template>
<style>
.container {
  display: flex;
  flex-direction: row;
  padding: 2rem;
  height: min(calc(100vh - 64px), 100vw);
}

ul {
  display: flex;
  flex-direction: column;
}

li {
  display: flex;
  flex-direction: row;
}

.node {
  width: min(calc((100vh - 64px - 4rem) / 8), calc((100vw - 4rem) / 8));
  height: min(calc((100vh - 64px - 4rem) / 8), calc((100vw - 4rem) / 8));
}

.black {
  background-color: var(--vt-c-divider-light-2);
}

.white {
  background-color: var(--vt-c-divider-dark-2);
}
</style>
