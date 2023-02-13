/*
 * Fixed-size circular FIFO buffer. 
 */

export default class CircularBuffer {
  v: number[];
  capacity: number;
  size = 0;
  start = 0;
  end = 0;
  
  constructor(capacity: number) {
    this.v = new Array(capacity);
    this.capacity = capacity;
  }

  // Inserts in the buffer.
  // If full, overwrites the oldest element and moves start
  // so that it still respects FIFO.
  insert(value: number): void {
    this.v[this.end] = value;
    this.end = (this.end + 1) % this.capacity;
    this.size++;
    if (this.size > this.capacity) {
      this.size = this.capacity;
      this.start = (this.start + 1) % this.capacity;
    }
  }

  // Extracts or throws if empty.
  extract(): number {
    if (this.size === 0)
      throw new Error('empty buffer');
    const value = this.v[this.start];
    this.start = (this.start + 1) % this.capacity;
    this.size--;
    return value;
  }

}