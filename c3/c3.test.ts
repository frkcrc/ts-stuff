import c3 from "./c3";

describe('C3 linearization', () => {

  it('solves diamond hierarchy', () => {
    const classMap = {
      'C': ['A', 'B'],
      'A': ['O'],
      'B': ['O'],
      'O': []
    };
    expect(c3(classMap)).toEqual({
      'C': ['C', 'A', 'B', 'O'],
      'A': ['A', 'O'],
      'B': ['B', 'O'],
      'O': ['O'],
    });
  });

  it('rejects cycle', () => {
    const classMap = {
      'C': ['A', 'B'],
      'A': ['O'],
      'B': ['C'],
      'O': []
    };
    expect(() => c3(classMap)).toThrow('cycle');
  });

  it('rejects order conflict', () => {
    // Local order is A,B, but A is a descendant of B.
    const classMap = {
      'C': ['A', 'B'],
      'A': ['O'],
      'B': ['A'],
      'O': []
    };
    expect(() => c3(classMap)).toThrow('valid head');
  });

  it('solves complex case', () => {
    // See https://en.wikipedia.org/wiki/C3_linearization
    const classMap = {
      'O': [],
      'A': ['O'],
      'B': ['O'],
      'C': ['O'],
      'D': ['O'],
      'E': ['O'],
      'K1': ['C', 'B', 'A'],
      'K3': ['A', 'D'],
      'K2': ['B', 'D', 'E'],
      'Z': ['K1', 'K3', 'K2']
    };
    expect(c3(classMap)).toEqual({
      'O': ['O'],
      'A': ['A', 'O'],
      'B': ['B', 'O'],
      'C': ['C', 'O'],
      'D': ['D', 'O'],
      'E': ['E', 'O'],
      'K1': ['K1', 'C', 'B', 'A', 'O'],
      'K3': ['K3', 'A', 'D', 'O'],
      'K2': ['K2', 'B', 'D', 'E', 'O'],
      'Z': ['Z', 'K1', 'C', 'K3', 'K2', 'B', 'A', 'D', 'E', 'O']
    });
  });

});