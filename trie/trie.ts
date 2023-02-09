/*
 * String trie data structure.
 */

class TNode {
  children: Map<string, TNode>;
  content: string;
  terminal: boolean;

  constructor(content: string, terminal: boolean = false) {
    this.children = new Map();
    this.content = content;
    this.terminal = terminal;
  }
}

export default class Trie {

  _root: TNode;

  constructor() {
    this._root = new TNode('');
  }

  insert(s: string) {
    if (s === '') return; // no terminal root.
    let curr = this._root;
    for (let c of Array.from(s)) {
      if (curr.children.has(c)) {
        curr = curr.children.get(c)!;
      } else {
        const node = new TNode(c);
        curr.children.set(c, node);
        curr = node;
      }
    }
    curr.terminal = true;
  }

  contains(s: string): boolean {
    let curr = this._root;
    for (let c of Array.from(s)) {
      if (!curr.children.has(c))
        return false;
      curr = curr.children.get(c)!;
    }
    return curr.terminal; // false if string is ''.
  }

  delete(s: string) {
    if (this.contains(s)) {
      this.deleteHelper(this._root, s);
    }
  }

  deleteHelper(parent: TNode, s: string): boolean {
    // precondition: s.length > 0 and s is in the trie.
    const letter = s.at(0)!;
    const node = parent.children.get(letter)!;
    if (s.length === 1) { // Base case.
      node.terminal = false;
      // Don't delete the node if it has children.
      return (node.children.size === 0);
    } else if (this.deleteHelper(node, s.slice(1))) {
      // Here node is an ancestor of the terminal we deleted.
      node.children.delete(letter);
      // Only delete this ancestor too if it has no other children,
      // and if it is NOT a terminal itself.
      return (node.children.size === 0 && !node.terminal);
    }
    return false; // false = stop deleting nodes upstream.
  }
}