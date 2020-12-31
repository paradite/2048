<template>
  <div
    class="board"
    v-bind:style="{
      width: totalSize + 'px',
      height: totalSize + 'px',
      padding: marginSize + 'px'
    }"
  >
    <Row
      v-for="(row, index) in game.rows"
      v-bind:row="row"
      v-bind:key="index"
      v-bind:cellSize="cellSize"
      v-bind:marginSize="marginSize"
      v-bind:totalSize="totalSize"
      v-bind:last="index === game.rows.length - 1"
    >
    </Row>
  </div>
</template>

<script>
import { Game } from '../game';
import Row from './Row.vue';
export default {
  name: 'GameBoard',
  components: {
    Row
  },
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
    rows: Array
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
</style>
