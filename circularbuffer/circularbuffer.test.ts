import CircularBuffer from "./circularbuffer";

describe('Circular fixed-size buffer', () => {

  it('inserts/extracts in FIFO order', () => {
    const buff = new CircularBuffer(5);
    buff.insert(30);
    buff.insert(22);
    buff.insert(1);
    expect(buff.extract()).toBe(30);
    buff.insert(5);
    buff.insert(89);
    expect(buff.extract()).toBe(22);
    expect(buff.extract()).toBe(1);
    expect(buff.extract()).toBe(5);
    expect(buff.extract()).toBe(89);
  });

  it('throws on extracting from empty buffer', () => {
    const buff = new CircularBuffer(1);
    expect(() => buff.extract()).toThrow();
    buff.insert(30);
    buff.extract();
    expect(() => buff.extract()).toThrow();
  });

  it('adding when full overwrites oldest elements', () => {
    const buff = new CircularBuffer(2);
    buff.insert(30);
    buff.insert(40);
    buff.insert(50);
    expect(buff.extract()).toBe(40);
    expect(buff.extract()).toBe(50);
  });

});