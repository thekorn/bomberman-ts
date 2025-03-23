import type { Pos } from './pos';
import type { ISpriteSheet } from './spriteSheet';
import { assert } from './utils';

const DURATION = 70;

export class Fire {
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

  private getSpriteName(): string {
    return `fire-${Math.abs(this.state % 5)}`;
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
    ctx.drawImage(
      sprite,
      this.pos.x * dimX,
      (this.pos.y - 1) * dimY,
      dimX,
      dimY,
    );
  }
}
