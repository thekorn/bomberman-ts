import { Level } from "./level";
import { Pos } from "./pos";
import { ISpriteSheet } from "./spriteSheet";
import { assert } from "./utils";

export class Player {
  public pos: Pos;
  constructor(
    public width: number,
    public height: number,
    public spriteSheet: ISpriteSheet,
    public level: Level,
  ) {
    this.pos = level.initialPlayerPos;
  }

  move(x: number, y: number) {
    if (this.canMove(this.pos.x + x, this.pos.y + 1 + y)) {
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
    const sprite = this.spriteSheet.get("bomber-man-0");
    assert(
      sprite !== undefined,
      `Sprite "bomber-man-0" not found in sprite sheet`,
    );
    ctx.drawImage(sprite, this.pos.x * dimX, this.pos.y * dimY, dimX, dimY * 2);
  }
}
