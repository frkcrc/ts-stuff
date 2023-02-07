/*
 * Kadane's algorithm to find the max sum subarray.
 * This implementation allows for an empty result.
 * If the result is an empty subarray, start/end are -1.
 */

export type KadaneResult = {
  sum: number,
  start: number,
  end: number,
  sub: number[],
};

export default function kadane(v: number[]): KadaneResult {
  // Max starts as a 0-length match.
  let maxSum = 0, maxStart = -1, maxEnd = -1;
  // Scan the array and track largest subarray.
  let currentSum = 0, currentStart = 0, currentEnd = 0;
  for(let i = 0; i < v.length; i++) {
    if (i === 0) { // First element has no prefix.
      currentSum = v[0];
    } else if (currentSum + v[i] > v[i]) {
      currentSum += v[i];
      currentEnd = i;
    } else {
      currentSum = v[i];
      currentStart = i;
      currentEnd = i;
    }
    // If the subarray is bigger than the max, update data.
    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxStart = currentStart;
      maxEnd = currentEnd;
    }
  }
  return {
    sum: maxSum, 
    start: maxStart, 
    end: maxEnd, 
    sub: v.slice(maxStart, maxEnd + 1),
  };
} 