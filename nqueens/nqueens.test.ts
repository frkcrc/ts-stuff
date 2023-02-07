import { nqueens } from "./nqueens";

describe('The N-Queen problem', () => {

  const solution4q = [...nqueens(4)];

  it(`finds two solutions for N=4`, () => {
    expect(solution4q.length).toBe(2);
  });

  it(`finds [1,3,0,2] for N=4`, () => {
    expect(solution4q).toContainEqual([1,3,0,2]);
  });

  it(`finds [2,0,3,1] for N=4`, () => {
    expect(solution4q).toContainEqual([2,0,3,1]);
  });

  it(`finds 92 solutions for N=8`, () => {
    const solutions = [...nqueens(8)];
    expect(solutions.length).toBe(92);
  });

});