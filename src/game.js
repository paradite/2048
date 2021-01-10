import cloneDeep from 'lodash.clonedeep';
import { v4 as uuidv4 } from 'uuid';
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

const WIN_NUMBER = 2048;
const PRINT = false;

class Cell {
  constructor(row, col, number, count) {
    this.row = row;
    this.col = col;
    this.number = number;
    this.count = count;
    this.id = uuidv4();
  }

  is(number) {
    return this.number === number;
  }

  add(toAdd) {
    this.number = this.number + toAdd;
  }

  updatePos(row, col) {
    this.row = row;
    this.col = col;
  }
}

export class Game {
  static winNumber = WIN_NUMBER;
  constructor() {
    this.rows = [];
    this.cells = [];
    this.restart();
    this.moved = {};
    this.moveCount = 0;
    this.scores = [];
    this.isAuto = false;
    this.autoInterval = null;
  }

  static isValidKey = key => {
    return (
      key === keys.ArrowUp ||
      key === keys.ArrowDown ||
      key === keys.ArrowLeft ||
      key === keys.ArrowRight
    );
  };

  static addNumberToPosition = (number, row, col, count, rows) => {
    const cell = new Cell(row, col, number, count);
    rows[row][col] = cell;
  };

  static getRandomPosition = () => {
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
  static getRandomNumber = () => {
    return 2;
  };

  resetRows() {
    this.rows = new Array(4);
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i] = new Array(4);
    }
    this.addRandomNumbers(2, this.rows);
    this.updateCells();
  }

  restart = () => {
    this.moveCount = 0;
    this.resetRows();
  };

  updateCells() {
    let cells = [];
    this.runForEachCell((i, j, cell) => {
      if (cell) {
        cells.push(cell);
      }
    });
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
    this.runForEachCell((i, j, cell) => {
      if (cell && cell.number === Game.winNumber) {
        this.scores.push([this.moveCount, Game.winNumber]);
        win = true;
        // prettier-ignore
        console.log('score, moves filled', this.moveCount, this.moveCount, this.getFilledCount(this.rows));
      }
    });
    if (win) {
      this.restart();
      return true;
    }
  }

  checkLose() {
    let total = this.rows.length * this.rows[0].length;
    let count = 0;
    this.runForEachCell((i, j, cell) => {
      if (cell) {
        count++;
      }
    });
    if (total === count) {
      this.scores.push([this.moveCount, this.getMax(this.rows)]);
      // prettier-ignore
      console.log('score, moves filled', 0, this.moveCount, this.getFilledCount(this.rows));
      this.restart();
      return true;
    }
  }
  runForEachCell = (fn, rows = this.rows) => {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        fn(i, j, cell);
      }
    }
  };

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
  getNewRows(rows, key, updated = {}) {
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
  handleEvent(key, updated = {}, first = true) {
    if (!Game.isValidKey(key)) return;
    if (first) this.moveCount++;

    const newRows = this.getNewRows(this.rows, key, updated);
    // this.rows = newRows;
    // we are done moving
    this.squeeze(newRows, key);
    // paintMatrix(this.rows, PRINT);
    this.rows = newRows;
    this.updateCells();
    let terminate = this.checkWin();
    if (terminate) {
      return;
    }
    terminate = this.checkLose();
    if (terminate) {
      return;
    }
    // add new numbers
    this.addRandomNumbers(1, newRows);
    paintMatrix(newRows, PRINT);
    this.rows = newRows;
    this.updateCells();
    return this.cells;
  }
  squeeze(rows, key) {
    let moved = false;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        if (element) {
          const destination = this.getSqueezeDestination(rows, i, j, key);
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
      this.squeeze(rows, key);
    }
  }
  getSqueezeDestination(rows, row, col, key) {
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
  autoSolve() {
    // const move = this.getAutoMoveRandom();
    // const move = this.getAutoMoveMinFilled();
    // const move = this.getAutoMoveMinFilledTwoSteps();
    const move = this.getAutoMoveMinFilledNSteps(3);
    // const move = this.getAutoMoveMinFilledNSteps(4);
    return this.handleEvent(move);
  }
  getFilledCount(rows) {
    let count = 0;
    this.runForEachCell((i, j, cell) => {
      if (cell) {
        count++;
      }
    }, rows);
    return count;
  }
  getMax(rows) {
    let max = 0;
    this.runForEachCell((i, j, cell) => {
      if (cell && cell.number > max) {
        max = cell.number;
      }
    }, rows);
    return max;
  }
  getAutoMoveMinFilled() {
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
  }

  getAutoMoveMinFilledTwoSteps() {
    const current = this.getFilledCount(this.rows);
    let minFilled = this.rows.length * this.rows[0].length;
    let maxCell = 0;
    let selected = this.getAutoMoveRandom();
    let candidates = [];
    for (let i = 0; i < ALL_MOVES.length; i++) {
      const move = ALL_MOVES[i];
      for (let j = 0; j < ALL_MOVES.length; j++) {
        const move2 = ALL_MOVES[j];
        let newRows = this.getNewRows(this.rows, move);
        this.squeeze(newRows, move);
        newRows = this.getNewRows(newRows, move2);
        const filledCount = this.getFilledCount(newRows);
        const max = this.getMax(newRows);
        if (filledCount < current - 3) {
          console.log('----', current);
          // prettier-ignore
          console.log('getAutoMoveMinFilled -> move move 2 filledCount max', move, move2, filledCount, max);
        }
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
  }

  getAutoMoveMinFilledNSteps(n) {
    const current = this.getFilledCount(this.rows);
    let minFilled = this.rows.length * this.rows[0].length;
    let maxCell = 0;
    let selected = this.getAutoMoveRandom();
    let candidates = [];
    let movesArr = [
      [keys.ArrowDown],
      [keys.ArrowUp],
      [keys.ArrowLeft],
      [keys.ArrowRight]
    ];
    for (let i = 1; i < n; i++) {
      let newMovesArr = [];
      for (let i = 0; i < movesArr.length; i++) {
        const moves = movesArr[i];
        for (let i = 0; i < ALL_MOVES.length; i++) {
          const move = ALL_MOVES[i];
          newMovesArr.push([...moves, move]);
        }
      }
      movesArr = newMovesArr;
    }
    for (let i = 0; i < movesArr.length; i++) {
      const moves = movesArr[i];
      let newRows = this.rows;
      for (let j = 0; j < moves.length; j++) {
        const move = moves[j];
        newRows = this.getNewRows(newRows, move);
        this.squeeze(newRows, move);
      }
      const filledCount = this.getFilledCount(newRows);
      const max = this.getMax(newRows);
      if (filledCount < current - 2 && PRINT) {
        console.log('----', current);
        // prettier-ignore
        console.log('getAutoMoveMinFilled -> moveC, filledC max', this.moveCount, filledCount, max);
      }
      if (filledCount < minFilled) {
        minFilled = filledCount;
        maxCell = max;
        candidates = [moves[0]];
      } else if (filledCount === minFilled && max > maxCell) {
        maxCell = max;
        candidates = [moves[0]];
      } else if (filledCount === minFilled && max === maxCell) {
        candidates.push(moves[0]);
      }
    }
    // prettier-ignore
    // console.log('getAutoMoveMinFilled -> candidates minFilled maxCell', candidates, minFilled, maxCell);
    const random = Math.floor(Math.random() * candidates.length);
    selected = candidates[random] ? candidates[random] : selected;
    // console.log('getAutoMoveMinFilled -> selected', selected);
    return selected;
  }

  getAutoMoveRandom() {
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
  }
}
