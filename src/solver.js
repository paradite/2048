import { Game } from './models/game';
import { keys, ALL_MOVES } from './util';

export function getAutoMoveRandom() {
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

export function getAutoMoveMinFilledNSteps(rows, n) {
  let minFilled = rows.length * rows[0].length;
  let maxCell = 0;
  let selected = getAutoMoveRandom();
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
    let newRows = rows;
    for (let j = 0; j < moves.length; j++) {
      const move = moves[j];
      newRows = Game.getNextState(newRows, move);
      Game.squeeze(newRows, move);
    }
    const filledCount = Game.getFilledCount(newRows);
    const max = Game.getMax(newRows);
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
