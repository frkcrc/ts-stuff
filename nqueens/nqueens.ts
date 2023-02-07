/*
 * Backtracking solution to the N-Queens problem, implemented as a
 * recursive generator. Solutions are returned as a vector.
 * For example, solution[0]=6 means a queen is on the first rank, 
 * sixth file (or the other way around, either way).
 */
export function* nqueens(N: number): IterableIterator<number[]> {
  const v = new Array<number>(N).fill(0);
  yield* nqRec(N, v, 0);
  return;
}

/*
 * Recursive helper generator.
 * Iterates through valid queen positions on rank k, then calls itself
 * recursively for k+1 (or yields if it has a valid solution).
 */
function* nqRec(N: number, v: number[], k: number): IterableIterator<number[]> {
  for (let file = 0; file < N; file++) {
    v[k] = file;
    if (!check(v, k)) {
      if (k < N-1) {
        yield* nqRec(N, v, k+1);
      } else {
        yield v.slice();
      }
    }
  }
}

/*
 * Checks if the queen on rank k is under capture.
 * We only check on ranks <k, to check partial solutions.
 */
function check(v: number[], k: number): boolean {
  for (let i = 0; i < k; i++) {
    if (v[k] === v[i]) return true;
    if (Math.abs(i-k) === Math.abs(v[i]-v[k]))
      return true;
  }
  return false; // No captures.
}