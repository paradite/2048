<template>
  <div id="app">
    <div>2048 Game</div>
    <GameBoard v-bind:game="game" />
  </div>
</template>

<script>
import GameBoard from "./components/GameBoard.vue";
import { Game } from "./game";

const game = new Game();

export default {
  name: "App",
  components: {
    GameBoard,
  },
  mounted() {
    window.onkeyup = (e) => {
      game.handleEvent(e.code);
    };
  },
  data: () => {
    return { game, rows: game.rows };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
