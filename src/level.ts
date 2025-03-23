import { type Tile, createMap } from './map';
import { Pos } from './pos';
import type { ISpriteSheet } from './spriteSheet';
import { assert } from './utils';

const fill = (length: number, tile: Tile | Tile[]) => Array(length).fill(tile);

// 23 x 12
const level: Tile[][] = [
  [...fill(23, 'W')],
  ['W', 'P', ...fill(20, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(10, 'O'), 'W', ...fill(10, 'O'), 'W'],
  ['W', ...fill(10, 'O'), 'W', ...fill(10, 'O'), 'W'],
  ['W', ...fill(10, 'O'), 'W', ...fill(10, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  [...fill(23, 'W')],
];

export default level;

export class Level {
  public levelMap: Tile[];
  public readonly initialPlayerPos: Pos;
  constructor(
    public width: number,
    public height: number,
    level: Tile[][],
    public spriteSheet: ISpriteSheet,
  ) {
    [this.levelMap, this.initialPlayerPos] = createMap(width, height, level);
  }

  isWall(x: number, y: number): boolean {
    const index = y * this.width + x;
    return this.levelMap[index] === 'W';
  }

  render(ctx: CanvasRenderingContext2D) {
    const dimX = ctx.canvas.width / this.width;
    const dimY = ctx.canvas.height / this.height;

    for (const [i, tile] of this.levelMap.entries()) {
      const pos = Pos.fromIndex(i, this.width);
      const sprite = this.spriteSheet.get(tile);
      assert(
        sprite !== undefined,
        `Sprite "${tile}" not found in sprite sheet`,
      );
      ctx.drawImage(sprite, pos.x * dimX, pos.y * dimY, dimX, dimY);
    }
  }
}
