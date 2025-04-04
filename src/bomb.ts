import type { Pos } from './pos';
import type { ISpriteSheet } from './spriteSheet';
import { assert } from './utils';

const DURATION = 30;

export class Bomb {
  private state = DURATION;
  constructor(
    public pos: Pos,
    public width: number,
    public height: number,
    public spriteSheet: ISpriteSheet,
  ) {}

  tick() {
    this.state -= 1;
  }

  get isDone(): boolean {
    return this.state < 0;
  }

  protected getSpriteName(): string {
    if (this.state > 0.66 * DURATION) return 'bomb-0';
    if (this.state > 0.33 * DURATION) return 'bomb-1';
    return 'bomb-2';
  }

  render(ctx: CanvasRenderingContext2D) {
    const dimX = ctx.canvas.width / this.width;
    const dimY = ctx.canvas.height / this.height;
    const sprite_name = this.getSpriteName();
    const sprite = this.spriteSheet.get(sprite_name);
    assert(
      sprite !== undefined,
      `Sprite "${sprite_name}" not found in sprite sheet`,
    );
    ctx.drawImage(sprite, this.pos.x * dimX, this.pos.y * dimY, dimX, dimY);
  }
}
