/*
 * Bubble sort.
 */

export default function bubbleSort(v: number[]): number[] {
  let end = v.length;
  while (end > 0) {
    let lastSwap = 0;
    for (let i = 1; i < end; i++) {
      if (v[i-1] > v[i]) {
        [v[i-1], v[i]] = [v[i], v[i-1]];
        lastSwap = i;
      }
    }
    end = lastSwap;
  }
  return v;
}