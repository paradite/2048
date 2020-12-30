<template>
  <div id="app">
    <div class="header">
      2048 Game by <a href="https://github.com/paradite/vue2048">@paradite</a>
    </div>
    <GameBoard v-bind:game="game" />
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue';
import { Game } from './game';

const game = new Game();

export default {
  name: 'App',
  components: {
    GameBoard
  },
  mounted() {
    window.onkeyup = e => {
      game.handleEvent(e.code);
    };
  },
  data: () => {
    return { game, rows: game.rows };
  }
};
</script>

<style>
@font-face {
  font-family: 'ClearSans';
  src: url('./../assets/fonts/ClearSans-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'ClearSans';
  src: url('./../assets/fonts/ClearSans-Medium.woff') format('woff');
  font-weight: medium;
  font-style: normal;
}
@font-face {
  font-family: 'ClearSans';
  src: url('./../assets/fonts/ClearSans-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: ClearSans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  color: #2c3e50;
}

.header {
  margin-bottom: 4px;
}
</style>
