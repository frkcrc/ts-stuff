import Trie from "./trie";

describe('trie', () => {

  it('accepts strings', () => {
    const trie = new Trie();
    expect(trie.contains('dog')).toBe(false);
    trie.insert('dog');
    expect(trie.contains('dog')).toBe(true);
    expect(trie.contains('do')).toBe(false);
    expect(trie.contains('d')).toBe(false);
    expect(trie.contains('doggo')).toBe(false);
  });

  it('ignores the empty string', () => {
    const trie = new Trie();
    expect(trie.contains('')).toBe(false);
    trie.insert('');
    expect(trie.contains('')).toBe(false);
  });

  it('supports common prefixes', () => {
    const trie = new Trie();
    expect(trie.contains('cat')).toBe(false);
    expect(trie.contains('car')).toBe(false);
    trie.insert('cat');
    trie.insert('car');
    expect(trie.contains('ca')).toBe(false);
    expect(trie.contains('car')).toBe(true);
    expect(trie.contains('cat')).toBe(true);
    expect(trie.contains('cart')).toBe(false);
    trie.insert('cart');
    expect(trie.contains('cart')).toBe(true);
  });

  it('deletes correctly if prefix of other strings', () => {
    const trie = new Trie();
    trie.insert('cat');
    trie.insert('car');
    trie.insert('cart');
    trie.delete('car');
    expect(trie.contains('car')).toBe(false);
    expect(trie.contains('cat')).toBe(true);
    expect(trie.contains('cart')).toBe(true);
  });

  it('deletes correctly if a prefix is a terminal', () => {
    const trie = new Trie();
    trie.insert('ab');
    trie.insert('abcd');
    trie.delete('abcd');
    expect(trie.contains('ab')).toBe(true);
    expect(trie.contains('abcd')).toBe(false);
  });

});