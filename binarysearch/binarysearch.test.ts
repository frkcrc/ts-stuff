import { binarySearchIter, binarySearchRec } from "./binarysearch";

type BinSearchFun = (v: number[], value: number) => number;
const runTest = (fun: BinSearchFun, name: string) => {
  describe(name, () => {

    const v = [71,72,73,74,75,76,77,78,79,80];
    const v2 = [71,72,73,74,75,76,77,78,79];

    it('finds stuff in even arrays', () => {
      expect(fun(v, 71)).toBe(0);
      expect(fun(v, 72)).toBe(1);
      expect(fun(v, 73)).toBe(2);
      expect(fun(v, 74)).toBe(3);
      expect(fun(v, 75)).toBe(4);
      expect(fun(v, 76)).toBe(5);
      expect(fun(v, 77)).toBe(6);
      expect(fun(v, 78)).toBe(7);
      expect(fun(v, 79)).toBe(8);
      expect(fun(v, 80)).toBe(9);
    });

    it('finds stuff in odd arrays', () => {
      expect(fun(v2, 71)).toBe(0);
      expect(fun(v2, 72)).toBe(1);
      expect(fun(v2, 73)).toBe(2);
      expect(fun(v2, 74)).toBe(3);
      expect(fun(v2, 75)).toBe(4);
      expect(fun(v2, 76)).toBe(5);
      expect(fun(v2, 77)).toBe(6);
      expect(fun(v2, 78)).toBe(7);
      expect(fun(v2, 79)).toBe(8);
    });

    it('fails to find stuff that\'s not there', () => {
      expect(fun(v, 100)).toBe(-1);
      expect(fun(v2, 100)).toBe(-1);
    });

    it('fails gracefully on empty arrays', () => {
      expect(fun([], 100)).toBe(-1);
    });

    it('works on singleton arrays', () => {
      expect(fun([100], 100)).toBe(0);
      expect(fun([100], 101)).toBe(-1);
    });
  
  
  });
};

runTest(binarySearchRec, 'Recursive binary search');
runTest(binarySearchIter, 'Iterative binary search');