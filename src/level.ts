import { type Tile, createMap } from './map';
import type { ISpriteSheet } from './spriteSheet';
import { assert } from './utils';

const fill = (length: number, tile: Tile | Tile[]) => Array(length).fill(tile);

// 23 x 12
const level: Tile[][] = [
  [...fill(23, 'W')],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  [...fill(23, 'W')],
];

export default level;

export class Level {
  public levelMap: Tile[];
  constructor(
    public width: number,
    public height: number,
    level: Tile[][],
    public spriteSheet: ISpriteSheet,
  ) {
    this.levelMap = createMap(width, height, level);
  }

  render(ctx: CanvasRenderingContext2D) {
    const dimX = ctx.canvas.width / this.width;
    const dimY = ctx.canvas.height / this.height;

    let x = 0;
    let y = 0;
    const sprite = this.spriteSheet.get('W');
    assert(sprite !== undefined, `Sprite "W" not found in sprite sheet`);
    ctx.drawImage(sprite, x * dimX, y * dimY, dimX, dimY);
    x = this.width - 1;
    y = this.height - 1;
    assert(sprite !== undefined, `Sprite "W" not found in sprite sheet`);
    ctx.drawImage(sprite, x * dimX, y * dimY, dimX, dimY);
  }
}
