import cloneDeep from 'lodash.clonedeep';
import { paintMatrix, keys } from '../util';
import { Cell } from './cell';

const WIN_NUMBER = 2048;
const PRINT = false;

const testRows = [
  [
    [undefined, 2, 32, 4],
    [undefined, undefined, undefined, 32],
    [undefined, undefined, 2, 4],
    [undefined, undefined, 2, undefined]
  ],
  [
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, 4, 4],
    [undefined, 2, 8, 8],
    [2, 128, 256, 4]
  ],
  [
    [8, 64, 4, undefined],
    [8, 256, 8, 2],
    [4, 32, 512, 128],
    [2, 4, 16, 2]
  ]
];

export class Game {
  static winNumber = WIN_NUMBER;
  static rowCount = 4;
  static colCount = 4;

  constructor() {
    this.rows = [];
    this.cells = [];
    this.moved = {};
    this.moveCount = 0;
    this.score = 0;
    this.highScores = [];
    this.isAuto = false;
    this.autoInterval = null;
  }

  static getNextState(rows, key, moveCount, updated = {}) {
    let points = 0;
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
            // we need to move
            let existing = row[j];
            if (newRows[r][c]) {
              if (!newRows[r][c].is(number)) {
                console.error(
                  `cell ${cell} from ${i},${j} moved to ${r},${c} with ${newRows[r][c]}`
                );
              }
              updated[`${r}-${c}`] = true;
              existing.add(newRows[r][c].number, existing);
              points += existing.number;
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

    // auto move
    Game.squeeze(newRows, key);

    // add new numbers
    Game.addRandomNumbers(1, newRows, moveCount);
    return [newRows, points];
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

  static getEmptyCount(rows) {
    return Game.rowCount * Game.colCount - Game.getFilledCount(rows);
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

  static getRandomEmptyCell(rows) {
    let candidates = [];
    Game.runForEachCell((i, j, cell) => {
      if (!cell) {
        candidates.push([i, j]);
      }
    }, rows);
    if (candidates.length === 0) {
      return [0, 0];
    }
    const random = Math.floor(Math.random() * candidates.length);
    return candidates[random];
  }

  static addRandomNumbers(count, rows, moveCount) {
    for (let i = 0; i < count; i++) {
      let [row, col] = Game.getRandomEmptyCell(rows);
      if (rows[row][col]) {
        return;
      }
      const n = Game.getRandomNumber();
      Game.addNumberToPosition(n, row, col, moveCount, rows);
    }
  }

  resetRows() {
    this.rows = new Array(Game.rowCount);
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i] = new Array(Game.colCount);
    }
    Game.addRandomNumbers(2, this.rows, this.moveCount);
    this.updateCells();
  }

  setupTest(number) {
    this.rows = new Array(Game.rowCount);
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i] = new Array(Game.colCount);
    }
    Game.runForEachCell((i, j) => {
      if (testRows[number][i][j]) {
        Game.addNumberToPosition(
          testRows[number][i][j],
          i,
          j,
          this.moveCount,
          this.rows
        );
      }
    }, this.rows);
    this.updateCells();
  }

  restart() {
    this.moveCount = 0;
    this.score = 0;
    this.resetRows();
    // this.setupTest(2);
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
        this.highScores.push([this.score, this.moveCount, Game.winNumber]);
        win = true;
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
      this.highScores.push([
        this.score,
        this.moveCount,
        Game.getMax(this.rows)
      ]);
      this.restart();
      return true;
    }
  }

  handleInput(key) {
    if (!Game.isValidKey(key)) return;
    this.moveCount++;
    const [newRows, points] = Game.getNextState(this.rows, key, this.moveCount);
    this.score += points;
    // paintMatrix(this.rows, PRINT);
    this.rows = newRows;
    this.updateCells();
    // let the game play indefinitely
    // let terminate = this.checkWin();
    // if (terminate) {
    //   return;
    // }
    let terminate = this.checkLose();
    if (terminate) {
      return;
    }
    paintMatrix(newRows, PRINT);
    this.rows = newRows;
    this.updateCells();
  }
}
