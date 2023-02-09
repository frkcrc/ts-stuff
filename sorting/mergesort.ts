/*
 * Merge sort.
 */

export default function mergeSort(v: number[]): number[] {
  if (v.length > 1) {
    const left = mergeSort(v.slice(0, v.length / 2));
    const right = mergeSort(v.slice(v.length / 2));
    const result : number[] = [];
    while (left.length > 0 && right.length > 0) {
      if (left[0] < right[0]) {
        result.push(left.shift()!);
      } else {
        result.push(right.shift()!);
      }
    }
    result.push(...left);
    result.push(...right);
    return result;
  } else {
    return v;
  }
}