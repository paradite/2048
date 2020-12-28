import cloneDeep from 'lodash.clonedeep';

const keys = {
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown'
};

export class Game {
  constructor() {
    this.rows = new Array(4);
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i] = new Array(4);
    }
    for (let i = 0; i < 2; i++) {
      let row = this.getRandomPosition();
      let col = this.getRandomPosition();
      while (this.rows[row][col]) {
        row = this.getRandomPosition();
        col = this.getRandomPosition();
      }
      const n = this.getRandomNumber();
      this.rows[row][col] = n;
    }
  }
  getRandomPosition = () => {
    const r = Math.random();
    if (r < 0.25) {
      return 0;
    } else if (r < 0.5) {
      return 1;
    } else if (r < 0.75) {
      return 2;
    } else {
      return 3;
    }
  };
  getRandomNumber = () => {
    return Math.random() < 0.9 ? 2 : 4;
  };
  getMoveDestination = (row, col, key) => {
    switch (key) {
      case keys.ArrowUp:
        return [0, col];

      case keys.ArrowDown:
        return [this.rows.length - 1, col];

      case keys.ArrowLeft:
        return [row, 0];

      case keys.ArrowRight:
        return [row, this.rows[0].length - 1];

      default:
        break;
    }
  };
  handleEvent = event => {
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        if (element) {
          let [r, c] = this.getMoveDestination(i, j, event);
          if (r === i && c === j) continue;
          row[j] = undefined;
          if (this.rows[r][c]) {
            this.rows[r][c] = element + this.rows[r][c];
          } else {
            this.rows[r][c] = element;
          }
        }
      }
    }

    // TODO: remove this hack
    this.rows = cloneDeep(this.rows);
  };
}
