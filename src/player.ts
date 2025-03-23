import type { Level } from './level';
import type { Pos } from './pos';
import type { ISpriteSheet } from './spriteSheet';
import { assert } from './utils';

const MAX_HEALTH = 50;

export class Player {
  /** Position of the player's feet */
  public pos: Pos;
  public isWalking: boolean;
  private frame: number;
  private health: number = MAX_HEALTH;
  constructor(
    public width: number,
    public height: number,
    public spriteSheet: ISpriteSheet,
    public level: Level,
  ) {
    this.pos = level.initialPlayerPos;
    this.frame = 0;
    this.isWalking = false;
  }

  moveBy(x: number, y: number) {
    if (this.canMoveTo(this.pos.x + x, this.pos.y + y)) {
      this.isWalking = true;
      this.pos.x += x;
      this.pos.y += y;
    }
  }

  canMoveTo(x: number, y: number): boolean {
    return (
      x >= 0 &&
      x < this.level.width &&
      y >= 0 &&
      y < this.level.height &&
      !this.level.isWall(x, y)
    );
  }

  takeDamage(amount = 1) {
    if (!this.isDead) this.health -= amount;
  }

  get isDead(): boolean {
    return this.health <= 0;
  }

  render(ctx: CanvasRenderingContext2D) {
    const dimX = ctx.canvas.width / this.width;
    const dimY = ctx.canvas.height / this.height;
    const sprite_name = `bomber-man-${this.isWalking ? this.frame : 0}`;
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

    if (this.health < MAX_HEALTH) {
      // generate a red health overlay per image mask in an offscreen canvas
      const offCanvas = document.createElement('canvas');
      offCanvas.width = dimX;
      offCanvas.height = dimY * 2;
      const offCtx = offCanvas.getContext('2d');
      assert(!!offCtx, 'Failed to get mask canvas context');

      offCtx.drawImage(sprite, 0, 0, dimX, dimY * 2);
      offCtx.globalCompositeOperation = 'source-in';
      offCtx.fillStyle = `rgba(255, 0, 0, ${1 - this.health / MAX_HEALTH})`;
      offCtx.fillRect(0, 0, dimX, dimY * 2 * (1 - this.health / MAX_HEALTH));
      offCtx.globalCompositeOperation = 'source-over';

      ctx.drawImage(offCanvas, this.pos.x * dimX, (this.pos.y - 1) * dimY);
    }
  }
}
