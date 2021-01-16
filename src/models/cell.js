import { v4 as uuidv4 } from 'uuid';

export class Cell {
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
