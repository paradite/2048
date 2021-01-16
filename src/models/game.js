import cloneDeep from 'lodash.clonedeep';
import { keys } from '../util';
import { Cell } from './cell';

const WIN_NUMBER = 2048;

export class Game {
  static winNumber = WIN_NUMBER;

  constructor() {
    this.rows = [];
    this.cells = [];
    this.moved = {};
    this.moveCount = 0;
    this.scores = [];
    this.isAuto = false;
    this.autoInterval = null;
  }

  static getNextState(rows, key, updated = {}) {
    let newRows = cloneDeep(rows);
    for (let i = 0; i < newRows.length; i++) {
      const row = newRows[i];
      for (let j = 0; j < row.length; j++) {
        if (updated[`${i}-${j}`]) continue;
        const cell = row[j];
        if (cell) {
          const number = cell.number;
          const destination = Game.getMoveDestination(
            newRows,
            i,
            j,
            number,
            key,
            updated
          );
          if (destination) {
            const [r, c] = destination;
            if (r === i && c === j) continue;
            updated[`${r}-${c}`] = true;
            // we need to move
            let existing = row[j];
            if (newRows[r][c]) {
              if (!newRows[r][c].is(number)) {
                console.error(
                  `cell ${cell} from ${i},${j} moved to ${r},${c} with ${newRows[r][c]}`
                );
              }
              existing.add(newRows[r][c].number, existing);
              existing.updatePos(r, c);
              newRows[r][c] = existing;
              row[j] = undefined;
            } else {
              // no change in number, move position
              existing.updatePos(r, c);
              newRows[r][c] = existing;
              row[j] = undefined;
            }
          }
        }
      }
    }
    return newRows;
  }

  static runForEachCell(fn, rows) {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        fn(i, j, cell);
      }
    }
  }

  static isValidKey(key) {
    return (
      key === keys.ArrowUp ||
      key === keys.ArrowDown ||
      key === keys.ArrowLeft ||
      key === keys.ArrowRight
    );
  }

  static addNumberToPosition(number, row, col, count, rows) {
    const cell = new Cell(row, col, number, count);
    rows[row][col] = cell;
  }

  static getRandomPosition() {
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
  }

  static getRandomNumber() {
    return 2;
  }

  static getFilledCount(rows) {
    let count = 0;
    Game.runForEachCell((i, j, cell) => {
      if (cell) {
        count++;
      }
    }, rows);
    return count;
  }

  static getMoveDestination = (rows, row, col, number, key, updated) => {
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
            if (rows[i][col].is(number)) {
              return [i, col];
            } else {
              return [i + 1, col];
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
            if (rows[i][col].is(number)) {
              return [i, col];
            } else {
              return [i - 1, col];
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
            if (rows[row][i].is(number)) {
              return [row, i];
            } else {
              return [row, i + 1];
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
            if (rows[row][i].is(number)) {
              return [row, i];
            } else {
              return [row, i - 1];
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

  static squeeze(rows, key) {
    let moved = false;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        if (element) {
          const destination = Game.getSqueezeDestination(rows, i, j, key);
          if (destination) {
            const [r, c] = destination;
            if (r === i && c === j) continue;
            // we need to move
            moved = true;
            let existing = row[j];
            if (rows[r][c]) {
              console.error('something wrong r c', r, c);
              console.error('rows[r][c]', rows[r][c]);
            } else {
              existing.updatePos(r, c);
              rows[r][c] = existing;
              row[j] = undefined;
            }
          }
        }
      }
    }

    if (moved) {
      // some numbers moved, we need to squeeze again
      Game.squeeze(rows, key);
    }
  }

  static getSqueezeDestination(rows, row, col, key) {
    switch (key) {
      case keys.ArrowUp:
        if (row === 0) return [row, col];
        for (let i = row - 1; i >= 0; i--) {
          if (rows[i][col]) {
            return [i + 1, col];
          } else {
            continue;
          }
        }
        return [0, col];

      case keys.ArrowDown:
        if (row === rows.length - 1) return [row, col];
        for (let i = row + 1; i <= rows.length - 1; i++) {
          if (rows[i][col]) {
            return [i - 1, col];
          } else {
            continue;
          }
        }
        return [rows.length - 1, col];

      case keys.ArrowLeft:
        if (col === 0) return [row, col];
        for (let i = col - 1; i >= 0; i--) {
          if (rows[row][i]) {
            return [row, i + 1];
          } else {
            continue;
          }
        }
        return [row, 0];

      case keys.ArrowRight:
        if (col === rows[0].length - 1) return [row, col];
        for (let i = col + 1; i <= rows[0].length - 1; i++) {
          if (rows[row][i]) {
            return [row, i - 1];
          } else {
            continue;
          }
        }
        return [row, rows[0].length - 1];

      default:
        break;
    }
  }

  static getMax(rows) {
    let max = 0;
    Game.runForEachCell((i, j, cell) => {
      if (cell && cell.number > max) {
        max = cell.number;
      }
    }, rows);
    return max;
  }

  resetRows() {
    this.rows = new Array(4);
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i] = new Array(4);
    }
    this.addRandomNumbers(2, this.rows);
    this.updateCells();
  }

  restart() {
    this.moveCount = 0;
    this.resetRows();
  }

  updateCells() {
    let cells = [];
    Game.runForEachCell((i, j, cell) => {
      if (cell) {
        cells.push(cell);
      }
    }, this.rows);
    cells.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    this.cells = cells;
  }

  checkWin() {
    let win = false;
    Game.runForEachCell((i, j, cell) => {
      if (cell && cell.number === Game.winNumber) {
        this.scores.push([this.moveCount, Game.winNumber]);
        win = true;
        // prettier-ignore
        console.log('score, moves filled', this.moveCount, this.moveCount, Game.getFilledCount(this.rows));
      }
    }, this.rows);
    if (win) {
      this.restart();
      return true;
    }
  }

  checkLose() {
    let total = this.rows.length * this.rows[0].length;
    let count = 0;
    Game.runForEachCell((i, j, cell) => {
      if (cell) {
        count++;
      }
    }, this.rows);
    if (total === count) {
      this.scores.push([this.moveCount, Game.getMax(this.rows)]);
      // prettier-ignore
      console.log('score, moves filled', 0, this.moveCount, Game.getFilledCount(this.rows));
      this.restart();
      return true;
    }
  }

  addRandomNumbers(count, rows) {
    for (let i = 0; i < count; i++) {
      let row = Game.getRandomPosition();
      let col = Game.getRandomPosition();
      // TODO: get random position from emtpy cells
      let tries = 3;
      while (rows[row][col] && tries) {
        row = Game.getRandomPosition();
        col = Game.getRandomPosition();
        tries--;
      }
      if (rows[row][col]) return;
      const n = Game.getRandomNumber();
      Game.addNumberToPosition(n, row, col, this.moveCount, rows);
    }
  }
}
