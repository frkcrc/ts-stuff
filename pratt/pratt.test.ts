import expressionParser from "./pratt";

describe('Pratt expression parser', () => {

  const parser = expressionParser;

  const check = (expr: string, val: number) => {
    expect(expressionParser.parse(expr)).toBe(val);
  }

  const checkError = (expr: string, msg: string) => {
    expect(() => {
      expressionParser.parse(expr)
    }).toThrow(msg);
  }

  it('parses simple expressions', () => {
    check('5', 5);
    check('1+2', 3);
    check('4*2', 8);
    check('4/2', 2);
    check('18-20', -2);
    check('999+1', 1000);
  });

  it('throws on bad symbols', () => {
    checkError('$', 'invalid token');
    checkError('1&2', 'invalid token');
    checkError('12*ab', 'invalid token');
    checkError('4*{', 'invalid token');
  });

  it('throws on misplaced binary operators', () => {
    checkError('*', 'unexpected token');
    checkError('2+/', 'unexpected token');
  });

  it('parses parentheses', () => {
    check('(5)', 5);
    check('1+(2*2)', 5);
    check('4*(1+1)', 8);
    check('(99+(10-9))', 100);
    check('18-20', -2);
    check('999+1', 1000);
  });

  it('throws on mismatched parentheses', () => {
    checkError('((2)', 'unexpected end');
    checkError(')2', 'unexpected token');
    checkError('(2))', 'unexpected token');
  });

  it('parses mixed left assoc operators', () => {
    check('5+5*2', (5+5*2));
    check('1*2+5*5', (1*2+5*5));
    check('10-8/2', (10-8/2));
  });

  it('parses prefix operators', () => {
    check('-5+2', (-5+2));
    check('5+-2', (5+-2));
    check('-1*(10+10)', (-1*(10+10)));
  });

  it('parses right assoc operators', () => {
    check('4^3^2', (4**3**2));
    check('--2', 2);
    check('10+(-8^2)', (-54));
  });

  it('parses mixed expressions', () => {
    check('1+(2^2)*2', 9);
    check('-1+(2^2)*2', 7);
  });

});