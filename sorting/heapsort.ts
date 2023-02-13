/*
 * Heapsort.
 */

export default function heapSort(v: number[]): number[] {
  // Set up max-heap structure.
  heapify(v, 0);
  // Repeatedly remove the max and store it at the end.
  let size = v.length;
  while (size > 0) {
    const elem = extractMax(v, size);
    v[size-1] = elem;
    size--;
  }
  return v;
}

// Return the left, right, and parent index for k.
function left(k: number) { return 2*k+1; }
function right(k: number) { return 2*k+2; }
function parent(k: number) { return Math.floor((k-1)/2); }

// Fixes the heap rooted at k recursively.
function heapify(v: number[], k: number) {
  // Recursively fix the heap rooted at the children.
  const l = left(k);
  const r = right(k);
  if (l < v.length) heapify(v, l);
  if (r < v.length) heapify(v, r);
  // Then fix it the heap at k.
  fixHeap(v, k, v.length);
}

// Fixes the position of the value at k.
function fixHeap(v: number[], k: number, size: number) {
  // We assume both children exist here.
  const value = v[k];
  const l = left(k);
  const r = right(k);
  if (r < size) { // Both children exist.
    if (v[l] > v[r] && v[l] > value) {
      [v[k], v[l]] = [v[l], v[k]];
      fixHeap(v, l, size);
    } else if (v[r] > value) {
      [v[k], v[r]] = [v[r], v[k]];
      fixHeap(v, r, size);
    }
  } else if (l < size && v[l] > value) { // Only left child exists.
    [v[k], v[l]] = [v[l], v[k]]; // No need for recursion, it's a leaf.
  }
}

// Returns the max and fixes the heap.
function extractMax(v: number[], size: number): number {
  const max = v[0];
  v[0] = v[size-1];
  fixHeap(v, 0, size-1);
  return max;
}
