export class Pos {
  constructor(
    public x: number,
    public y: number,
  ) {}

  static fromIndex(index: number, cols: number): Pos {
    return new Pos(index % cols, Math.floor(index / cols));
  }
}
