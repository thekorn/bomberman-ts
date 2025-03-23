import { Bomb } from './bomb';
import type { Player } from './player';
import { Pos } from './pos';
import type { ISpriteSheet } from './spriteSheet';

export class State {
  public pressedKeys = new Set<string>();
  public bombs = new Map<string, Bomb>();

  constructor(
    public player: Player,
    public width: number,
    public height: number,
    public spriteSheet: ISpriteSheet,
  ) {}

  private isKeyDown(key: string) {
    return this.pressedKeys.has(key);
  }

  emitKeyDown(event: KeyboardEvent) {
    this.pressedKeys.add(event.key);
  }

  emitKeyUp(event: KeyboardEvent) {
    this.pressedKeys.delete(event.key);
    this.player.isWalking = false;
  }

  update() {
    if (this.player.isDead) {
      if (this.isKeyDown('r')) {
        console.log('RESTART');
      }
      for (const bomb of this.bombs.values()) {
        bomb.tick();
      }
      return;
    }
    if (this.isKeyDown('ArrowLeft')) {
      console.log('move left');
      this.player.move(-1, 0);
    } else if (this.isKeyDown('ArrowRight')) {
      this.player.move(1, 0);
    } else if (this.isKeyDown('ArrowUp')) {
      console.log('move up');
      this.player.move(0, -1);
    } else if (this.isKeyDown('ArrowDown')) {
      console.log('move down');
      this.player.move(0, 1);
    } else if (this.isKeyDown(' ')) {
      console.log('place bomb');
      const key = `${this.player.pos.x},${this.player.pos.y}`;
      if (!this.bombs.has(key)) {
        const p = new Pos(this.player.pos.x, this.player.pos.y + 1);
        this.bombs.set(
          key,
          new Bomb(p, this.width, this.height, this.spriteSheet),
        );
      }
    }
    for (const [key, bomb] of this.bombs.entries()) {
      bomb.tick();
      if (bomb.isDone) {
        this.bombs.delete(key);
      }
      if (
        bomb.pos.x === this.player.pos.x &&
        bomb.pos.y - 1 === this.player.pos.y &&
        bomb.isExploded
      ) {
        this.player.takeDamage();
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    for (const bomb of this.bombs.values()) {
      bomb.render(ctx);
    }

    if (this.player.isDead) {
      const canvas = ctx.canvas;

      const text = 'Game Over';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = 48;

      const padding = 10;
      const boxWidth = textWidth + padding * 2;
      const boxHeight = textHeight + padding * 2;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const boxX = centerX - boxWidth / 2;
      const boxY = centerY - boxHeight / 2;

      ctx.fillStyle = 'white';
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

      ctx.fillStyle = 'black';
      ctx.fillText(text, centerX, centerY);
    } else {
      this.player.render(ctx);
    }
  }
}
