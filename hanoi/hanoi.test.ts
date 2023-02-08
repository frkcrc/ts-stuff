import hanoi from "./hanoi";

describe('The Towers of Hanoi problem', () => {

  it('finds the right 7 moves for N=3', () => {
    const expected = [
      ['START', 'DEST'],
      ['START', 'AUX'],
      ['DEST', 'AUX'],
      ['START', 'DEST'],
      ['AUX', 'START'],
      ['AUX', 'DEST'],
      ['START', 'DEST']
    ];
    expect(hanoi(3)).toEqual(expected);
  });

  it('takes 15 moves for N=4', () => {
    expect(hanoi(4).length).toBe(15);
  });

  it('takes 31 moves for N=5', () => {
    expect(hanoi(5).length).toBe(31);
  });

});