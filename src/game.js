const keys = {
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
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
  handleEvent = (event) => {
    switch (event) {
      case keys.ArrowUp:
        console.log(this.rows);
        for (let i = 0; i < this.rows.length; i++) {
          const row = this.rows[i];
          for (let i = 0; i < row.length; i++) {
            const element = row[i];
            if (element) {
              row[i] = undefined;
              this.rows[0][i] = element;
            }
          }
        }
        break;

      case keys.ArrowDown:
        break;

      case keys.ArrowLeft:
        break;

      case keys.ArrowRight:
        break;

      default:
        break;
    }
  };
}
