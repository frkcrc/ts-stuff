/*
 * Towers of Hanoi algorithm with three pegs.
 */

enum Peg {
  START,
  AUX,
  DEST,
};
type Move = [string, string]; // [from, to]

export default function hanoi(N: number): Move[] {
  const moves: Move[] = [];
  hanoiRec(moves, N, Peg.START, Peg.DEST);
  return moves;
}

function hanoiRec(moves: Move[], n: number, from: Peg, to: Peg) {
  if (n === 1) {
    moves.push([Peg[from], Peg[to]]);
  } else {
    const auxPeg = otherPeg(from, to);
    hanoiRec(moves, n-1, from, auxPeg);
    moves.push([Peg[from], Peg[to]]);
    hanoiRec(moves, n-1, auxPeg, to);
  }
}

function otherPeg(a: Peg, b: Peg): Peg {
  if (a === Peg.START) return (b === Peg.AUX ? Peg.DEST : Peg.AUX); 
  if (a === Peg.AUX) return (b === Peg.DEST ? Peg.START : Peg.DEST);
  return (b === Peg.AUX ? Peg.START : Peg.AUX);
}