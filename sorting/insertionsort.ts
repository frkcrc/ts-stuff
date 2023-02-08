/*
 * Insertion sort.
 */

export default function insertionSort(v: number[]): number[] {
  for (let i = 1; i < v.length; i++) {
    let elem = v[i];
    let j = i-1;
    while (j >= 0) {
      if (v[j] <= elem)
        break;
      v[j+1] = v[j];
      j--;
    }
    v[j+1] = elem;
  }
  return v;
}