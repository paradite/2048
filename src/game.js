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
}
