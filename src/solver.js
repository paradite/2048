import cloneDeep from 'lodash.clonedeep';
import { Game } from './models/game';
import { keys, ALL_MOVES, paintMatrix, mode } from './util';

const PRINT = false;

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

export function getAutoMoveScoreNSteps(rows, n) {
  let maxScore = 0;
  let selected = null;
  let candidates = new Set();
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
    let newRows = cloneDeep(rows);
    let score = 0;
    for (let j = 0; j < moves.length; j++) {
      const move = moves[j];
      let scoreDelta = 0;
      [newRows, scoreDelta] = Game.getNextState(newRows, move);
      score += scoreDelta;
    }
    if (score > maxScore) {
      candidates = new Set();
      candidates.add(moves[0]);
      maxScore = score;
      paintMatrix(newRows, PRINT);
    } else if (score === maxScore) {
      paintMatrix(newRows, PRINT);
    }
  }
  const candidatesArr = Array.from(candidates);
  const random = Math.floor(Math.random() * candidatesArr.length);
  selected = candidatesArr[random];
  if (!selected) {
    console.error('no selected');
  }
  return selected;
}

let movesAhead = 3;
let rounds = 10;
console.log(`${movesAhead} moves heads ${rounds} rounds MC`);

export function getAutoMoveMC(rows, moveCount) {
  if (PRINT) console.log('---');
  paintMatrix(rows, PRINT);
  let maxScore = 0;
  let selected = null;
  let candidates = new Set();
  let movesArr = [
    [keys.ArrowDown],
    [keys.ArrowUp],
    [keys.ArrowLeft],
    [keys.ArrowRight]
  ];
  for (let i = 1; i < movesAhead; i++) {
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
    let score = 0;
    let emptyCellCount = 0;
    let firstMoveScore = 0;
    let scoreRuns = [];
    let emptyCellCountRuns = [];
    // run j times and take sum
    for (let j = 0; j < rounds; j++) {
      let newRows = cloneDeep(rows);
      scoreRuns[j] = 0;
      for (let k = 0; k < moves.length; k++) {
        const move = moves[k];
        let scoreDelta = 0;
        [newRows, scoreDelta] = Game.getNextState(newRows, move, moveCount);
        scoreRuns[j] += scoreDelta;
        if (k === 0) firstMoveScore = scoreDelta;
      }
      emptyCellCountRuns[j] = Game.getEmptyCount(newRows);
    }
    score = mode(scoreRuns);
    emptyCellCount = mode(emptyCellCountRuns);
    // score = scoreRuns.reduce((p, c) => p + c, 0);
    if (PRINT) {
      // prettier-ignore
      console.log(moves.join(' '), scoreRuns.join(' '), score, firstMoveScore);
    }
    score += emptyCellCount * 10;
    if (score > maxScore) {
      candidates = new Set();
      candidates.add(moves[0]);
      maxScore = score;
    } else if (score === maxScore) {
      candidates.add(moves[0]);
    }
    // } else if (score === maxScore && firstMoveScore > maxFirstScore) {
    //   candidates = new Set();
    //   candidates.add(moves[0]);
    //   maxFirstScore = firstMoveScore;
    // } else if (score === maxScore && firstMoveScore === maxFirstScore) {
    //   candidates.add(moves[0]);
    // }
  }
  const candidatesArr = Array.from(candidates);
  if (PRINT) {
    console.log('getAutoMoveScoreNStepsMC -> candidatesArr', candidatesArr);
  }
  const random = Math.floor(Math.random() * candidatesArr.length);
  selected = candidatesArr[random];
  if (!selected) {
    console.error('no selected');
  }
  return selected;
}
