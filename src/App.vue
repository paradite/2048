<template>
  <div id="app">
    <div class="header">
      2048 game with an auto solver<br />
      by
      <a href="https://github.com/paradite/2048">@paradite</a>
    </div>
    <div class="info-row">
      <div class="info-box">
        <div class="info-title">Move count</div>
        <div class="info-content">{{ game.moveCount }}</div>
      </div>
      <div class="info-box">
        <div class="info-title">Score</div>
        <div class="info-content">{{ game.score }}</div>
      </div>
    </div>
    <GameBoard
      v-bind:game="game"
      v-bind:cells="cells"
      v-bind:animation="animation"
    />
    <div class="buttons">
      <div class="button button-primary" v-on:click="handleSolve">
        Once
      </div>
      <div
        class="button button-primary"
        v-on:click="handleAuto"
        v-bind:class="{ active: game.isAuto }"
      >
        Magic
      </div>
      <div class="button button-primary" v-on:click="restart">
        Restart
      </div>
    </div>
    <div class="scores">
      High Scores
      <br />
      <span v-if="game.highScores.length === 0"> (empty)</span>
      <div v-for="(score, i) in game.highScores" :key="i" class="score">
        [score: {{ score[0] }}, moves: {{ score[1] }}, max: {{ score[2] }}]
      </div>
    </div>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue';
import { Game } from './models/game';
import { getAutoMoveMC, getAutoMoveRandom } from './solver';
import { keys } from './util';

const AUTO_INTERVAL = 0;
// let AUTO_INTERVAL = 1000;

let ANIMATION = true;

export default {
  name: 'App',
  components: {
    GameBoard
  },
  mounted() {
    this.game.restart();
    this.cells = this.game.cells;
    window.onkeyup = e => {
      this.cells = this.handleEvent(e.code);
    };

    // https://stackoverflow.com/a/23230280/1472186
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
      return (
        evt.touches || evt.originalEvent.touches // browser API
      ); // jQuery
    }

    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
          this.cells = this.handleEvent(keys.ArrowLeft);
        } else {
          this.cells = this.handleEvent(keys.ArrowRight);
        }
      } else {
        if (yDiff > 0) {
          this.cells = this.handleEvent(keys.ArrowUp);
        } else {
          this.cells = this.handleEvent(keys.ArrowDown);
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
  },
  data() {
    const game = new Game();
    return {
      game,
      cells: game.cells,
      isAuto: false,
      autoInterval: null,
      animation: ANIMATION
    };
  },
  methods: {
    restart() {
      this.game.restart();
      this.cells = this.game.cells;
    },
    handleAuto() {
      this.isAuto = !this.isAuto;

      if (this.autoInterval) {
        clearInterval(this.autoInterval);
      }

      if (this.isAuto) {
        this.animation = false;
        this.autoSolve();
        this.autoInterval = setInterval(() => {
          this.autoSolve();
        }, AUTO_INTERVAL);
      } else {
        this.animation = true;
      }
    },
    handleSolve() {
      this.autoSolve();
    },
    autoSolve() {
      let random = false;
      let move;
      if (random) {
        move = getAutoMoveRandom();
      } else {
        // const move = getAutoMoveScoreNSteps(this.game.rows, 3);
        move = getAutoMoveMC(this.game.rows, this.game.moveCount);
      }
      this.cells = this.handleEvent(move);
    },
    handleEvent(key) {
      this.game.handleInput(key);
      return this.game.cells;
    }
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

body {
  overscroll-behavior-y: none;
}

#app {
  font-family: ClearSans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  color: #2c3e50;
}

.header {
  margin: 20px;
}

.info-box {
  width: 100px;
  background: #8f7a66;
  border-radius: 4px;
  padding: 4px;
  margin: 0 5px;
}

.info-title {
  color: rgb(238, 228, 218);
}

.info-content {
  color: white;
}

.buttons,
.info-row {
  display: flex;
  text-align: center;
  width: 370px;
  margin: 10px auto;
  justify-content: center;
}

.button {
  user-select: none;
  /* https://medium.com/codyhouse/line-height-crop-a-simple-css-formula-to-remove-top-space-from-your-text-9c3de06d7c6f */
  padding: 2px 4px 4px 4px;
  margin: 0 5px;
  width: 85px;
  height: 40px;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  background: #8f7a66;
  color: #f9f6f2;
  border-radius: 4px;
  font-weight: bold;
}

.button.active {
  animation: 2s linear 0s infinite alternate auto-run;
}

.button.active:hover {
  background: #8f7a66;
}

.button:hover {
  cursor: pointer;
  background: #bbada0;
}

@keyframes auto-run {
  from {
    color: #f3b27a;
  }
  to {
    color: #f75f3b;
  }
}

.scores {
  width: 370px;
  text-align: center;
  margin: 0 auto;
}

.score {
  display: block;
}

.score-divider {
  margin-right: 2px;
}
</style>
