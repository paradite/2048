import cloneDeep from 'lodash.clonedeep';
import { paintMatrix } from './util';

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
    this.addRandomNumbers();
    this.moved = {};
  }
  addRandomNumbers = () => {
    for (let i = 0; i < 2; i++) {
      let row = this.getRandomPosition();
      let col = this.getRandomPosition();
      let tries = 3;
      while (this.rows[row][col] && tries) {
        row = this.getRandomPosition();
        col = this.getRandomPosition();
        tries--;
      }
      if (this.rows[row][col]) return;
      const n = this.getRandomNumber();
      this.rows[row][col] = n;
    }
  };
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
    return 2;
  };
  getMoveDestination = (row, col, number, key, updated) => {
    switch (key) {
      case keys.ArrowUp:
        if (row === 0) return [row, col];
        for (let i = row - 1; i >= 0; i--) {
          if (updated[`${i}-${col}`]) {
            if (this.rows[i][col]) {
              return [i + 1, col];
            } else {
              continue;
            }
          }
          if (this.rows[i][col]) {
            if (this.rows[i][col] !== number) {
              return [i + 1, col];
            } else {
              return [i, col];
            }
          } else {
            continue;
          }
        }
        return [row, col];

      case keys.ArrowDown:
        if (row === this.rows.length - 1) return [row, col];
        for (let i = row + 1; i <= this.rows.length - 1; i++) {
          if (updated[`${i}-${col}`]) {
            if (this.rows[i][col]) {
              return [i - 1, col];
            } else {
              continue;
            }
          }
          if (this.rows[i][col]) {
            if (this.rows[i][col] !== number) {
              return [i - 1, col];
            } else {
              return [i, col];
            }
          } else {
            continue;
          }
        }
        return [row, col];

      case keys.ArrowLeft:
        if (col === 0) return [row, col];
        for (let i = col - 1; i >= 0; i--) {
          if (updated[`${row}-${i}`]) {
            if (this.rows[row][i]) {
              return [row, i + 1];
            } else {
              continue;
            }
          }
          if (this.rows[row][i]) {
            if (this.rows[row][i] !== number) {
              return [row, i + 1];
            } else {
              return [row, i];
            }
          } else {
            continue;
          }
        }
        return [row, col];

      case keys.ArrowRight:
        if (col === this.rows[0].length - 1) return [row, col];
        for (let i = col + 1; i <= this.rows[0].length - 1; i++) {
          if (updated[`${row}-${i}`]) {
            if (this.rows[row][i]) {
              return [row, i - 1];
            } else {
              continue;
            }
          }
          if (this.rows[row][i]) {
            if (this.rows[row][i] !== number) {
              return [row, i - 1];
            } else {
              return [row, i];
            }
          } else {
            continue;
          }
        }
        return [row, col];

      default:
        break;
    }
  };
  handleEvent = (event, updated = {}) => {
    let moved = false;
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      for (let j = 0; j < row.length; j++) {
        if (updated[`${i}-${j}`]) continue;
        const element = row[j];
        if (element) {
          const destination = this.getMoveDestination(
            i,
            j,
            element,
            event,
            updated
          );
          if (destination) {
            const [r, c] = destination;
            if (r === i && c === j) continue;
            updated[`${r}-${c}`] = true;
            // we need to move
            moved = true;
            row[j] = undefined;
            if (this.rows[r][c]) {
              if (element !== this.rows[r][c]) {
                console.error(
                  `element ${element} from ${i},${j} moved to ${r},${c} with ${this.rows[r][c]}`
                );
              }
              this.rows[r][c] = element + this.rows[r][c];
            } else {
              this.rows[r][c] = element;
            }
          }
        }
      }
    }

    if (moved) {
      // some numbers moved, we need to update board
      // TODO: remove this hack
      // paintMatrix(this.rows);
      // check again
      this.handleEvent(event, updated);
    } else {
      // we are done moving
      this.squeeze(event);
      // paintMatrix(this.rows);
      // add new numbers
      this.addRandomNumbers();
      paintMatrix(this.rows);
      this.rows = cloneDeep(this.rows);
    }
  };
  squeeze = event => {
    let moved = false;
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        if (element) {
          const destination = this.getSqueezeDestination(i, j, event);
          if (destination) {
            const [r, c] = destination;
            if (r === i && c === j) continue;
            // we need to move
            moved = true;
            row[j] = undefined;
            if (this.rows[r][c]) {
              console.error('something wrong r c', r, c);
              console.error('this.rows[r][c]', this.rows[r][c]);
            } else {
              this.rows[r][c] = element;
            }
          }
        }
      }
    }

    if (moved) {
      // some numbers moved, we need to update board
      // TODO: remove this hack
      this.rows = cloneDeep(this.rows);
      // squeeze again
      this.squeeze(event);
    }
  };
  getSqueezeDestination = (row, col, key) => {
    switch (key) {
      case keys.ArrowUp:
        if (row === 0) return [row, col];
        for (let i = row - 1; i >= 0; i--) {
          if (this.rows[i][col]) {
            return [i + 1, col];
          } else {
            continue;
          }
        }
        return [0, col];

      case keys.ArrowDown:
        if (row === this.rows.length - 1) return [row, col];
        for (let i = row + 1; i <= this.rows.length - 1; i++) {
          if (this.rows[i][col]) {
            return [i - 1, col];
          } else {
            continue;
          }
        }
        return [this.rows.length - 1, col];

      case keys.ArrowLeft:
        if (col === 0) return [row, col];
        for (let i = col - 1; i >= 0; i--) {
          if (this.rows[row][i]) {
            return [row, i + 1];
          } else {
            continue;
          }
        }
        return [row, 0];

      case keys.ArrowRight:
        if (col === this.rows[0].length - 1) return [row, col];
        for (let i = col + 1; i <= this.rows[0].length - 1; i++) {
          if (this.rows[row][i]) {
            return [row, i - 1];
          } else {
            continue;
          }
        }
        return [row, this.rows[0].length - 1];

      default:
        break;
    }
  };
}
