import kadane, { KadaneResult } from "./kadane";

function check(v: number[], expected: KadaneResult) {
  it(`finds max sub of [${v.toString()}]`, () => {
    expect(kadane(v)).toEqual(expected);
  });
};

describe('Kadane\'s algorithm', () => {
  
  // Whole positive array.
  check([1,2,3], {
    sum: 6, 
    start: 0, 
    end: 2, 
    sub: [1,2,3]
  });

  // Empty array ⇒ empty subarray.
  check([], {
    sum: 0, 
    start: -1, 
    end: -1, 
    sub: []
  });

  // Negative array ⇒ empty subarray.
  check([-1,-2,-3], {
    sum: 0, 
    start: -1, 
    end: -1, 
    sub: []
  });

  // Mixed array with max sub spanning over negatives.
  check([-2,1,-3,4,-1,2,1,-5,4], {
    sum: 6, 
    start: 3, 
    end: 6, 
    sub: [4,-1,2,1]
  });

  // Max starts at the start of the array.
  check([1,2,3,-5,-8], {
    sum: 6, 
    start: 0, 
    end: 2, 
    sub: [1,2,3]
  });

  // Max ends at the end of the array.
  check([-5,-8,1,2,3], {
    sum: 6, 
    start: 2, 
    end: 4, 
    sub: [1,2,3]
  });

  // Don't include useless values.
  check([-5,0,3,-5,3], {
    sum: 3, 
    start: 2, 
    end: 2, 
    sub: [3]
  });

  // Return the first equivalent option.
  check([5,-5,3,2], {
    sum: 5, 
    start: 0, 
    end: 0, 
    sub: [5]
  });

});