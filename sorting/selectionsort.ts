/*
 * Selection sort.
 */

export default function selectionSort(v: number[]): number[] {
  for (let i = 0; i < v.length; i++) {
    let min = i;
    for (let j = i+1; j < v.length; j++) {
      min = (v[j] < v[min] ? j : min);      
    }
    [v[i], v[min]] = [v[min], v[i]];
  }
  return v;
}