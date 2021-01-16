export const keys = {
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown'
};

export const ALL_MOVES = [
  keys.ArrowLeft,
  keys.ArrowRight,
  keys.ArrowUp,
  keys.ArrowDown
];

export const isObjEmpty = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const paintMatrix = (rows, print) => {
  if (!print) return;
  console.log('----');
  for (let i = 0; i < rows.length; i++) {
    let result = '';
    let row = rows[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] && row[j].number >= 10) {
        result += row[j].number + ' ';
      } else if (row[j]) {
        result += row[j].number + '  ';
      } else {
        result += '.' + '  ';
      }
    }
    console.log(result);
  }
};
