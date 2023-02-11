/*
 * Binary search algorithm, iterative and recursive.
 */

export function binarySearchRec(v: number[], value: number): number {
  return binarySearchRecHelper(v, value, 0, v.length);
}
function binarySearchRecHelper(
  v: number[], value: number, start: number, end: number
): number {
  const size = end - start;
  if (size === 0)
    return -1;
  const middle = start + Math.floor(size/2);
  if (v[middle] === value) {
    return middle;
  } else if (v[middle] > value) {
    return binarySearchRecHelper(v, value, start, middle);
  } else {
    return binarySearchRecHelper(v, value, middle + 1, end);
  }
}

export function binarySearchIter(v: number[], value: number): number {
  let start = 0, end = v.length;
  while (end - start !== 0) {
    const middle = start + Math.floor((end - start)/2);
    if (v[middle] === value) {
      return middle;
    } else if (v[middle] > value) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  return -1;
}