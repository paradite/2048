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
      v-for="(row, index) in game.rows"
      :key="index"
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
        class="cell"
        v-bind:style="{
          width: cellSize + 'px',
          height: cellSize + 'px',
          marginRight: i === row.length - 1 ? 0 : marginSize + 'px'
        }"
      >
        {{ cell }}
      </div>
    </div>
  </div>
</template>

<script>
import { Game } from "../game";
export default {
  name: "GameBoard",
  data: () => {
    const cellSize = 70;
    const marginSize = 10;
    const totalSize = cellSize * 4 + marginSize * 3;
    return {
      cellSize,
      marginSize,
      totalSize
    };
  },
  props: {
    game: Game
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board {
  margin: 0 auto;
  background-color: #bbada0;
  border-radius: 5px;
}

.cell {
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  background-color: rgba(238, 228, 218, 0.35);
  border-radius: 5px;
}
</style>
