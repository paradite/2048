import cloneDeep from 'lodash.clonedeep';
import { paintMatrix } from './util';

export const keys = {
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown'
};

const ALL_MOVES = [
  keys.ArrowLeft,
  keys.ArrowRight,
  keys.ArrowUp,
  keys.ArrowDown
];

// const WIN_NUMBER = 2048;
const WIN_NUMBER = 512;
const AUTO_INTERVAL = 20;

export class Game {
  constructor() {
    this.resetRows();
    this.moved = {};
    this.moveCount = 0;
    this.scores = [];
    this.isAuto = false;
    this.autoInterval = null;
    this.winNumber = WIN_NUMBER;
  }
  resetRows = () => {
    this.rows = new Array(4);
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i] = new Array(4);
    }
    this.addRandomNumbers(2);
  };
  restart = () => {
    this.moveCount = 0;
    this.resetRows();
  };
  isValidKey = key => {
    return (
      key === keys.ArrowUp ||
      key === keys.ArrowDown ||
      key === keys.ArrowLeft ||
      key === keys.ArrowRight
    );
  };
  checkWin = () => {
    this.runForEachCell((i, j, cell) => {
      if (cell === this.winNumber) {
        this.scores.push(this.moveCount);
        // prettier-ignore
        console.log('score, final filled count', this.moveCount, this.getFilledCount(this.rows));
        this.restart();
      }
    });
  };
  checkLose = () => {
    let total = this.rows.length * this.rows[0].length;
    let count = 0;
    this.runForEachCell((i, j, cell) => {
      if (cell) {
        count++;
      }
    });
    if (total === count) {
      this.scores.push(0);
      this.restart();
    }
  };
  runForEachCell = (fn, rows = this.rows) => {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        fn(i, j, cell);
      }
    }
  };
  addRandomNumbers = count => {
    for (let i = 0; i < count; i++) {
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
  getMoveDestination = (rows, row, col, number, key, updated) => {
    switch (key) {
      case keys.ArrowUp:
        if (row === 0) return [row, col];
        for (let i = row - 1; i >= 0; i--) {
          if (updated[`${i}-${col}`]) {
            if (rows[i][col]) {
              return [i + 1, col];
            } else {
              continue;
            }
          }
          if (rows[i][col]) {
            if (rows[i][col] !== number) {
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
        if (row === rows.length - 1) return [row, col];
        for (let i = row + 1; i <= rows.length - 1; i++) {
          if (updated[`${i}-${col}`]) {
            if (rows[i][col]) {
              return [i - 1, col];
            } else {
              continue;
            }
          }
          if (rows[i][col]) {
            if (rows[i][col] !== number) {
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
            if (rows[row][i]) {
              return [row, i + 1];
            } else {
              continue;
            }
          }
          if (rows[row][i]) {
            if (rows[row][i] !== number) {
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
        if (col === rows[0].length - 1) return [row, col];
        for (let i = col + 1; i <= rows[0].length - 1; i++) {
          if (updated[`${row}-${i}`]) {
            if (rows[row][i]) {
              return [row, i - 1];
            } else {
              continue;
            }
          }
          if (rows[row][i]) {
            if (rows[row][i] !== number) {
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
  getNewRows = (rows, key, updated = {}) => {
    let newRows = cloneDeep(rows);
    for (let i = 0; i < newRows.length; i++) {
      const row = newRows[i];
      for (let j = 0; j < row.length; j++) {
        if (updated[`${i}-${j}`]) continue;
        const element = row[j];
        if (element) {
          const destination = this.getMoveDestination(
            newRows,
            i,
            j,
            element,
            key,
            updated
          );
          if (destination) {
            const [r, c] = destination;
            if (r === i && c === j) continue;
            updated[`${r}-${c}`] = true;
            // we need to move
            row[j] = undefined;
            if (newRows[r][c]) {
              if (element !== newRows[r][c]) {
                console.error(
                  `element ${element} from ${i},${j} moved to ${r},${c} with ${newRows[r][c]}`
                );
              }
              newRows[r][c] = element + newRows[r][c];
            } else {
              newRows[r][c] = element;
            }
          }
        }
      }
    }
    return newRows;
  };
  handleEvent = (key, updated = {}, first = true) => {
    if (!this.isValidKey(key)) return;
    if (first) this.moveCount++;

    const newRows = this.getNewRows(this.rows, key, updated);
    this.rows = newRows;
    // we are done moving
    this.squeeze(key);
    // paintMatrix(this.rows);
    this.rows = newRows;
    this.checkWin();
    this.checkLose();
    // add new numbers
    this.addRandomNumbers(1);
    paintMatrix(this.rows);
    this.rows = cloneDeep(this.rows);
  };
  squeeze = key => {
    let moved = false;
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        if (element) {
          const destination = this.getSqueezeDestination(i, j, key);
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
      this.squeeze(key);
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
  handleAuto = () => {
    this.isAuto = !this.isAuto;
    if (this.autoInterval) {
      clearInterval(this.autoInterval);
    }
    if (this.isAuto) {
      this.autoSolve();
      this.autoInterval = setInterval(() => {
        this.autoSolve();
      }, AUTO_INTERVAL);
    }
  };
  autoSolve = () => {
    // const move = this.getAutoMoveRandom();
    // const move = this.getAutoMoveMinFilled();
    const move = this.getAutoMoveMinFilledTwoSteps();
    this.handleEvent(move);
  };
  getFilledCount = rows => {
    let count = 0;
    this.runForEachCell((i, j, cell) => {
      if (cell) {
        count++;
      }
    }, rows);
    return count;
  };
  getMax = rows => {
    let max = 0;
    this.runForEachCell((i, j, cell) => {
      if (cell && cell > max) {
        max = cell;
      }
    }, rows);
    return max;
  };
  getAutoMoveMinFilled = () => {
    let minFilled = this.rows.length * this.rows[0].length;
    let maxCell = 0;
    let selected = this.getAutoMoveRandom();
    let candidates = [];
    for (let i = 0; i < ALL_MOVES.length; i++) {
      const move = ALL_MOVES[i];
      const newRows = this.getNewRows(this.rows, move);
      const filledCount = this.getFilledCount(newRows);
      const max = this.getMax(newRows);
      // console.log('getAutoMoveMinFilled -> filledCount max', filledCount, max);
      if (filledCount < minFilled) {
        minFilled = filledCount;
        maxCell = max;
        candidates = [move];
      } else if (filledCount === minFilled && max > maxCell) {
        maxCell = max;
        candidates = [move];
      } else if (filledCount === minFilled && max === maxCell) {
        candidates.push(move);
      }
    }
    // prettier-ignore
    // console.log('getAutoMoveMinFilled -> candidates minFilled maxCell', candidates, minFilled, maxCell);
    const random = Math.floor(Math.random() * candidates.length);
    selected = candidates[random] ? candidates[random] : selected;
    // console.log('getAutoMoveMinFilled -> selected', selected);
    return selected;
  };

  getAutoMoveMinFilledTwoSteps = () => {
    // console.log('----', this.getFilledCount(this.rows));
    let minFilled = this.rows.length * this.rows[0].length;
    let maxCell = 0;
    let selected = this.getAutoMoveRandom();
    let candidates = [];
    for (let i = 0; i < ALL_MOVES.length; i++) {
      const move = ALL_MOVES[i];
      for (let j = 0; j < ALL_MOVES.length; j++) {
        const move2 = ALL_MOVES[j];
        let newRows = this.getNewRows(this.rows, move);
        newRows = this.getNewRows(newRows, move2);
        const filledCount = this.getFilledCount(newRows);
        const max = this.getMax(newRows);
        // prettier-ignore
        // console.log('getAutoMoveMinFilled -> move move 2 filledCount max', move, move2, filledCount, max);
        if (filledCount < minFilled) {
          minFilled = filledCount;
          maxCell = max;
          candidates = [move];
        } else if (filledCount === minFilled && max > maxCell) {
          maxCell = max;
          candidates = [move];
        } else if (filledCount === minFilled && max === maxCell) {
          candidates.push(move);
        }
      }
    }
    // prettier-ignore
    // console.log('getAutoMoveMinFilled -> candidates minFilled maxCell', candidates, minFilled, maxCell);
    const random = Math.floor(Math.random() * candidates.length);
    selected = candidates[random] ? candidates[random] : selected;
    // console.log('getAutoMoveMinFilled -> selected', selected);
    return selected;
  };
  getAutoMoveRandom = () => {
    const r = Math.random();
    if (r < 0.25) {
      return keys.ArrowDown;
    } else if (r < 0.5) {
      return keys.ArrowUp;
    } else if (r < 0.75) {
      return keys.ArrowLeft;
    } else {
      return keys.ArrowRight;
    }
  };
}
