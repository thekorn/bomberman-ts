import type { Level } from './level';
import type { Pos } from './pos';
import type { ISpriteSheet } from './spriteSheet';
import { assert } from './utils';

export class Player {
  /** Position of the player's feet */
  public pos: Pos;
  private frame: number;
  constructor(
    public width: number,
    public height: number,
    public spriteSheet: ISpriteSheet,
    public level: Level,
  ) {
    this.pos = level.initialPlayerPos;
    this.frame = 0;
  }

  move(x: number, y: number) {
    if (this.canMove(this.pos.x + x, this.pos.y + y)) {
      this.pos.x += x;
      this.pos.y += y;
    }
  }

  canMove(x: number, y: number): boolean {
    return !this.level.isWall(x, y);
  }

  render(ctx: CanvasRenderingContext2D) {
    const dimX = ctx.canvas.width / this.width;
    const dimY = ctx.canvas.height / this.height;
    const sprite_name = `bomber-man-${this.frame}`;
    this.frame = (this.frame + 1) % 8;
    const sprite = this.spriteSheet.get(sprite_name);
    assert(
      sprite !== undefined,
      `Sprite "${sprite_name}" not found in sprite sheet`,
    );
    ctx.drawImage(
      sprite,
      this.pos.x * dimX,
      (this.pos.y - 1) * dimY,
      dimX,
      dimY * 2,
    );
  }
}
