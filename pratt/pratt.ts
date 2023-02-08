/*
 * Pratt (top down operator precedence) parser.
 * The example grammar is a simple expression parser, with unary (-) and
 * a right associative operator (^). It supports parentheses.
 * We implement the grammar as a "table"-like structure, with each token
 * type associated to its callbacks and data.
 */

/*** Constants ***/

const TOKEN_REGEX = /([()+*/^-]|[0-9]+)/;
const PREC_STEP = 10; // precedence step between levels

/*** Grammar ***/

// Useful types for grammar rules.

type NudFunc = (parser: PrattParser, token: Token) => number;
type LedFunc = (parser: PrattParser, token: Token, lhs: number) => number;
type Assoc = 'left'|'right';
type NudRule = { cb: NudFunc, prec: number }; // Always right associative.
type LedRule = { cb: LedFunc, prec: number, assoc: Assoc };
type GrammarRule = {name: string, pattern: RegExp, nud: NudRule, led: LedRule };
type Grammar = GrammarRule[];

// Utils for grammar definition.

const defaultNud: NudRule = {
  cb: (parser, token) => {
    throw new Error(`unexpected token: ${token.type} has no null denomination`);
  },
  prec: -10,
};

const defaultLed: LedRule = {
  cb: (parser, token, lhs) => {
    throw new Error(`unexpected token: ${token.type} has no left denomination`);
  },
  prec: -10,
  assoc: 'left'
};

// Helper to build the led() for binary operators.
function makeBinOp(
  name: string,
  pattern: RegExp,
  prec: number,
  assoc: Assoc,
  exec: (lhs: number, rhs: number) => number,
  nud: NudRule|undefined = undefined
): GrammarRule { 
  const cb: LedFunc = (parser, token, lhs) => {
    // Parse RHS with precedence depending on associativity.
    const rhs = parser.expr(assoc === 'left' ? prec + PREC_STEP : prec);
    return exec(lhs, rhs);
  };
  return {
    name,
    pattern, 
    nud: nud ?? defaultNud,
    led: {
      prec,
      assoc,
      cb
    }
  };
}

// Helper to build a rule.
function makeRule(
  name: string, 
  pattern: RegExp, 
  nud: NudRule = defaultNud,
  led: LedRule = defaultLed
) : GrammarRule {
  return {
    name, pattern, nud, led
  }
}

// Finally, the grammar itself.

const expressionGrammar: Grammar = [
  makeRule('NUM', /\d+/, {prec: 0, cb: (parser, token) => +token.value}),
  makeBinOp('PLUS', /\+/, 10, 'left', (x,y) => x+y),
  makeBinOp('MINUS', /\-/, 10, 'left', (x,y) => x-y, {
    prec: 30,
    cb: (parser, token) => {
      return -parser.expr(30);
    }
  }),
  makeBinOp('MUL', /\*/, 20, 'left', (x,y) => x*y),
  makeBinOp('DIV', /\//, 20, 'left', (x,y) => x/y),
  makeBinOp('POW', /\^/, 40, 'right', (x,y) => x**y),
  makeRule('LPAREN', /\(/, {
    prec: 0, 
    cb: (parser, token) => {
      const value = parser.expr(0);
      parser.expect('RPAREN');
      return value;
    }
  }),
  makeRule('RPAREN', /\)/),
];

/*** Tokenizer ***/

// Parsed token with token type name and value.
class Token {
  type: string;
  value: string;
  constructor(name: string, value: string) {
    this.type = name;
    this.value = value;
  }
}

/* Tokenizer class. Returns tokens one by one. */
class Tokenizer {

  _rules: Grammar;
  _tokens: Token[] = [];
  _next: number = 0;

  constructor(grammar: Grammar) {
    this._rules = grammar;
  }

  // Tokenize an expression and store the tokens.
  tokenize(expr: string) {
    this._tokens = expr.split(TOKEN_REGEX)
      .map(t => t.trim())
      .filter(t => t.length)
      .map(t => this.matchToken(t));
    this._next = 0;
  }

  // Match the token to a rule and build a Token object.
  matchToken(t: string): Token {
    for(let rule of this._rules) {
      if (t.match(rule.pattern)) {
        return new Token(rule.name, t);
      }
    }
    throw new Error(`syntax error: invalid token ${t}`);
  }

  // Checks if there are tokens left.
  hasNext(): boolean {
    return this._next < this._tokens.length;
  }

  // Consumes and returns the next token.
  next(): Token {
    const token = this.peek(); // throws if no token.
    this._next++;
    return token;
  }

  // Returns the next token without advancing the pointer.
  // If there is no next token, it throws
  peek(): Token {
    if (!this.hasNext())
      throw new Error('unexpected end');
    return this._tokens[this._next];
  }

}

class PrattParser {

  _rules: Grammar;
  _tokenizer: Tokenizer;

  // Build parser for the grammar.
  constructor(grammar: Grammar) {
    this._rules = grammar;
    this._tokenizer = new Tokenizer(grammar);
  }

  // Parse the expression string.
  parse(expr: string): number {
    this._tokenizer.tokenize(expr);
    const result = this.expr(0);
    if (this._tokenizer.hasNext()) {
      const token = this._tokenizer.next();
      throw new Error(`unexpected token (expected end, found '${token.type}')`);
    }
    return result;
  }

  // Parse expression with the given minimum precedence.
  expr(minPrec: number): number {
    let token = this._tokenizer.next();
    let left = this.rule(token.type).nud.cb(this, token);
    while (this._tokenizer.hasNext()) {
      token = this._tokenizer.peek();
      const rule = this.rule(token.type);
      if (rule.led.prec >= minPrec) {
        this._tokenizer.next();
        left = rule.led.cb(this, token, left);
      } else {
        break;
      }
    }
    return left;
  }

  // Check if the next token matches, then consumes it.
  // If it doesn't match, throws an error.
  expect(type: string): Token {
    const token = this._tokenizer.peek(); // throws if no token.
    if (token.type === type)
      return this._tokenizer.next();
    else throw new Error(
      `unexpected token (expected ${type}, was ${token.type})`
    );
  }

  // Retrieves the grammar rule for a token type.
  rule(type: string): GrammarRule {
    for(let rule of this._rules) {
      if (rule.name === type) {
        return rule;
      }
    }
    throw new Error(`syntax error: invalid token type ${type}`);
  }

}

const expressionParser = new PrattParser(expressionGrammar);
export default expressionParser;