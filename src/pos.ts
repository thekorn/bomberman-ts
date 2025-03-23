import { assert } from './utils';

export class Pos {
  constructor(
    public x: number,
    public y: number,
  ) {}

  static fromIndex(index: number, rows: number, cols: number): Pos {
    assert(rows >= 0, 'rows must be non-negative');
    assert(cols >= 0, 'cols must be non-negative');
    assert(index >= 0 && index < rows * cols, 'index out of range');
    return new Pos(index % cols, Math.floor(index / cols));
  }

  toIndex(cols: number, rows: number): number {
    assert(rows >= 0, 'rows must be non-negative');
    assert(cols >= 0, 'cols must be non-negative');
    assert(
      this.x >= 0 && this.x < cols,
      `x out of range x=${this.x} cols=${cols}`,
    );
    assert(this.y >= 0 && this.y < rows, 'y out of range');
    return this.x + this.y * cols;
  }
}
