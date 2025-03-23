import { Level } from "./level";
import { ISpriteSheet } from "./spriteSheet";
import { assert } from "./utils";

export class Player {
  public x: number;
  public y: number;
  constructor(
    public width: number,
    public height: number,
    public spriteSheet: ISpriteSheet,
    public level: Level,
    initialX: number,
    initialY: number,
  ) {
    this.x = initialX;
    this.y = initialY;
  }

  move(x: number, y: number) {
    const feetX = this.x;
    const feetY = this.y + 1;

    if (this.canMove(feetX + x, feetY + y)) {
      this.x += x;
      this.y += y;
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
    ctx.drawImage(sprite, this.x * dimX, this.y * dimY, dimX, dimY * 2);
  }
}
