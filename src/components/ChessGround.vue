<script setup lang="ts">
import { type Board, type Square, movePiece, getNewBoard } from '@/models/chess'
import ChessSquare from './ChessSquare.vue'
import anime from 'animejs'
import { cloneDeep } from 'lodash'
</script>

<script lang="ts">
let endPoint: Square

export default {
  data(): { history: Board[]; moves: string[]; movesCache: string[] } {
    return {
      history: [getNewBoard()],
      moves: [],
      movesCache: [],
    }
  },
  created() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.back()
      }
      if (e.key === 'r') {
        this.restart()
      }
    })
  },
  methods: {
    getBoard() {
      return this.history[this.history.length - 1]
    },
    getPreviousBoard() {
      return this.history[this.history.length - 2]
    },
    dropped(square: Square) {
      if (
        square.id === endPoint.id ||
        square.item?.side === endPoint.item?.side
      ) {
        anime({
          targets: `.${square.y + square.x}`,
          rotate: [
            { value: 5, duration: 10 },
            { value: 0, duration: 10, delay: 50 },
            { value: -5, duration: 10 },
            { value: 0, duration: 10, delay: 50 },
            { value: 5, duration: 10 },
            { value: 0, duration: 10, delay: 50 },
          ],
        })
        return
      }

      if (square.item && endPoint.item) {
        anime({
          targets: `.${endPoint.y + endPoint.x}`,
          scale: [
            { value: 1.1, duration: 500 },
            { value: 1, duration: 500, delay: 100 },
          ],
        })
      }

      this.history.push({
        squares: movePiece(
          cloneDeep(this.getBoard().squares),
          square.x,
          square.y,
          endPoint.x,
          endPoint.y
        ),
      })

      this.moves.push(square.item?.piece[0] + endPoint.y + endPoint.x)
      this.movesCache.push(square.item?.piece[0] + square.y + square.x)

      anime({
        targets: `.${square.y + square.x}`,
        scale: [
          { value: 1.05, easing: 'easeOutSine', duration: 50 },
          { value: 1, easing: 'easeInOutQuad', duration: 150 },
        ],
      })

      anime({
        targets: `.${endPoint.y + endPoint.x}`,
        scale: [
          { value: 0.9, easing: 'easeOutSine', duration: 50 },
          { value: 1, easing: 'easeInOutQuad', duration: 150 },
        ],
      })
    },
    dragging(square: Square) {
      endPoint = square
    },
    restart() {
      anime({
        targets: ['.restart'],
        scale: [
          { value: 0.9, duration: 100 },
          { value: 1, easing: 'easeOutSine', duration: 100 },
        ],
      })

      anime({
        targets: '.container .node',
        scale: [
          { value: 0, easing: 'easeOutSine', duration: 400 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200, delay: 600 },
        ],
        delay: anime.stagger(200, { grid: [8, 8], from: 'center' }),
        update: (animation) => {
          if (Math.ceil(animation.progress) === 40) {
            this.history = [getNewBoard()]
            this.moves = []
            this.movesCache = []
          }
        },
      })

      anime({
        targets: ['.restart', '.back'],
        opacity: [
          { value: 0, easing: 'easeOutSine', duration: 400, delay: 400 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200, delay: 1200 },
        ],
      })
    },
    back() {
      if (this.history.length >= 2) {
        this.history.pop()
        const lastMove = this.moves.pop()
        const prevMove = this.movesCache.pop()

        anime({
          targets: ['.back'],
          scale: [
            { value: 0.9, duration: 100 },
            { value: 1, easing: 'easeOutSine', duration: 100 },
          ],
        })

        anime({
          targets: `.${lastMove?.substring(1, 3)}`,
          scale: [
            { value: 1.05, easing: 'easeOutSine', duration: 50 },
            { value: 1, easing: 'easeInOutQuad', duration: 150 },
          ],
        })

        anime({
          targets: `.${prevMove?.substring(1, 3)}`,
          scale: [
            { value: 0.9, easing: 'easeOutSine', duration: 50 },
            { value: 1, easing: 'easeInOutQuad', duration: 150 },
          ],
        })
      } else {
        anime({
          targets: ['.back'],
          rotate: [
            { value: 5, duration: 10 },
            { value: 0, duration: 10, delay: 50 },
            { value: -5, duration: 10 },
            { value: 0, duration: 10, delay: 50 },
            { value: 5, duration: 10 },
            { value: 0, duration: 10, delay: 50 },
          ],
          background: [
            { value: '#FF1414', duration: 100 },
            {
              value: '#3F51B5',
              duration: 1000,
              delay: 100,
            },
          ],
        })
      }
    },
  },
}
</script>

<template>
  <div class="container select-none">
    <ul v-for="(row, i) in getBoard().squares" :key="row[0].y">
      <li
        v-for="(square, j) in row"
        :key="square.id"
        :class="`node ${square.y + square.x} ${
          (i + j) % 2 === 0 ? 'white' : 'black'
        }`"
      >
        <ChessSquare :square="square" :dropped="dropped" :dragging="dragging" />
      </li>
    </ul>
    <div class="m-auto">
      <button
        class="restart p-2 pl-3 pr-3 m-1 bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-md text-white font-bold hover:bg-cyan-600 transition-colors"
        @click="restart()"
      >
        Restart
      </button>
      <button
        class="back p-2 pl-3 pr-3 m-1 bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-md text-white font-bold hover:bg-indigo-600 transition-colors"
        @click="back()"
      >
        Back
      </button>
    </div>
    <div class="moves">{{ moves.join(', ') }}</div>
  </div>
</template>
<style>
.container {
  display: flex;
  flex-direction: row;
  padding: 2rem;
  height: min(calc(100vh - 64px), 100vw);
  min-width: 100vw;
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

.moves {
  width: 100%;
}

.actions {
  width: 112px;
  padding-left: 1rem;
  margin-top: auto;
}
</style>
