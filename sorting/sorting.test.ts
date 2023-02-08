import bubbleSort from "./bubblesort";
import insertionSort from "./insertionsort";
import selectionSort from "./selectionsort";

type SortFunction = (v: number[]) => number[];
const runTest = (sort: SortFunction, name: string) => {
  describe(name, () => {

    it('returns an empty array for empty inputs', () => {
      expect(sort([])).toEqual([]);
    });

    it('sorts correctly already sorted arrays', () => {
      expect(sort([0,1,2,3,4,5])).toEqual([0,1,2,3,4,5]);
      expect(sort([0,1,2,3,4])).toEqual([0,1,2,3,4]);
    });

    it('sorts positive numbers correctly', () => {
      expect(sort([2,5,0,1,4,3])).toEqual([0,1,2,3,4,5]);
      expect(sort([81,21,0,5,99,34])).toEqual([0,5,21,34,81,99]);
      expect(sort([1,899,911,45,6])).toEqual([1,6,45,899,911]);
    });

    it('sorts negative numbers correctly', () => {
      expect(sort([-2,-5,0,-1,-4,-3])).toEqual([-5,-4,-3,-2,-1,0]);
    });
  
  });
};

runTest(selectionSort, 'Selection sort');
runTest(insertionSort, 'Insertion sort');
runTest(bubbleSort, 'Bubble sort');

