/*
 * Quick sort.
 */

export default function quickSort(v: number[]): number[] {
  quicks(v, 0, v.length);
  return v;
}

function quicks(v: number[], start: number, end: number) : void {
  if (end - start > 1) {
    // Random pivot. There are better ways.
    const p = start + Math.floor(Math.random() * (end - start));
    const pivot = v[p];
    // Partitioning.
    let i = start, j = end - 1;
    [v[p], v[j]] = [v[j], v[p]]; // Pivot at the end.
    j--;
    do { // Partition the subarray.
      while (v[i] < pivot) i++;
      while (v[j] > pivot) j--;
      if (i < j)
        [v[i], v[j]] = [v[j], v[i]];
    } while (i < j);
    [v[i], v[end - 1]] = [v[end - 1], v[i]];
    // Recursively call on the two halves.
    quicks(v, start, i);
    quicks(v, i+1, end);
  }
}

quickSort([0,1]);