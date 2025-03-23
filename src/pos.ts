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
}
