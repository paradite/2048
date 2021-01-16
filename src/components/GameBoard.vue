<template>
  <div
    class="board"
    v-bind:style="{
      width: totalSize + 'px',
      height: totalSize + 'px',
      padding: marginSize + 'px'
    }"
  >
    <div
      v-for="cell in cells"
      :key="cell.id"
      class="cell"
      v-bind:id="cell.id"
      v-bind:class="{
        [`cell-${cell.number}`]: true,
        'fade-in': cell && cell.count === game.moveCount
      }"
      v-bind:style="{
        left: cellSize * cell.col + marginSize * (cell.col + 1) + 'px',
        top: cellSize * cell.row + marginSize * (cell.row + 1) + 'px'
      }"
    >
      {{ cell.number }}
    </div>
    <div class="bg">
      <div
        v-for="(row, index) in game.rows"
        v-bind:key="index"
        class="row"
        v-bind:style="{
          width: totalSize + 'px',
          height: cellSize + 'px',
          marginBottom: index === game.rows.length - 1 ? 0 : marginSize + 'px'
        }"
      >
        <div
          v-for="(cell, i) in row"
          :key="i"
          class="cell-bg"
          v-bind:style="{
            width: cellSize + 'px',
            height: cellSize + 'px',
            marginRight: i === row.length - 1 ? 0 : marginSize + 'px'
          }"
        ></div>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import { Game } from '../models/game';
export default {
  name: 'GameBoard',
  data() {
    const cellSize = 80;
    const marginSize = 10;
    return {
      cellSize,
      marginSize
    };
  },
  computed: {
    totalSize() {
      return this.cellSize * 4 + this.marginSize * 3;
    }
  },
  props: {
    game: Game,
    cells: Array,
    rows: Array
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.fade-in {
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.2s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.board {
  margin: 0 auto;
  background-color: #bbada0;
  border-radius: 5px;
  position: relative;
}

.cell {
  width: 80px;
  height: 80px;
  position: absolute;
  color: #f9f6f2;
  font-weight: bold;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(238, 228, 218, 0.35);
  border-radius: 2px;
  transition: all 0.1s;
}

.cell-bg {
  float: left;
  background-color: rgba(238, 228, 218, 0.35);
  border-radius: 2px;
}

.cell-2 {
  color: #776e65;
  background-color: #eee4da;
}

.cell-4 {
  color: #776e65;
  background-color: #eee1c9;
}

.cell-8 {
  background: #f3b27a;
}

.cell-16 {
  background: #f69664;
}

.cell-32 {
  background: #f77c5f;
}

.cell-64 {
  background: #f75f3b;
}

.cell-128 {
  background: #edd073;
}

.cell-256 {
  background: #edcc62;
}

.cell-512 {
  background: #edc950;
}

.cell-1024 {
  background: #edc53f;
}

.cell-2048 {
  background: #edc22e;
}
</style>
