import { Bomb } from './bomb';
import { Fire } from './fire';
import type { Level } from './level';
import { Wall } from './map';
import type { Player } from './player';
import { Pos } from './pos';
import type { ISpriteSheet } from './spriteSheet';

export class State {
  public pressedKeys = new Set<string>();
  public bombs = new Map<string, Bomb>();
  public fires = new Map<string, Fire>();

  constructor(
    public player: Player,
    /** grid width */
    public width: number,
    /** grid height */
    public height: number,
    public spriteSheet: ISpriteSheet,
    public level: Level,
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
      this.player.move(-1, 0);
    } else if (this.isKeyDown('ArrowRight')) {
      this.player.move(1, 0);
    } else if (this.isKeyDown('ArrowUp')) {
      this.player.move(0, -1);
    } else if (this.isKeyDown('ArrowDown')) {
      this.player.move(0, 1);
    } else if (this.isKeyDown(' ')) {
      const key = `${this.player.pos.x},${this.player.pos.y}`;
      if (!this.bombs.has(key)) {
        const p = new Pos(this.player.pos.x, this.player.pos.y);
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
        const newFirePos = this.getNewFirePositions(bomb.pos);

        for (const pos of newFirePos) {
          const fireKey = `${pos.x},${pos.y}`;
          this.fires.set(
            fireKey,
            new Fire(pos, this.width, this.height, this.spriteSheet),
          );
        }
      }
    }
    for (const [key, fire] of this.fires.entries()) {
      fire.tick();
      if (fire.isDone) {
        this.fires.delete(key);
      } else if (
        fire.pos.x === this.player.pos.x &&
        fire.pos.y === this.player.pos.y
      ) {
        this.player.takeDamage();
      }
    }
  }

  private getNewFirePositions(bombPos: Pos): MapIterator<Pos> {
    const newFirePos = new Map<string, Pos>();
    for (let i = 0; i <= 4; i++) {
      const x = bombPos.x - i;
      if (x < 0) continue;
      const pos = new Pos(x, bombPos.y);
      const item = this.level.levelMap[pos.toIndex(this.width, this.height)];
      if (item === Wall) {
        break;
      }
      newFirePos.set(`${pos.x},${pos.y}`, pos);
    }

    for (let i = 0; i <= 4; i++) {
      const x = bombPos.x + i;
      if (x > this.width) continue;
      const pos = new Pos(x, bombPos.y);
      const item = this.level.levelMap[pos.toIndex(this.width, this.height)];
      if (item === Wall) {
        break;
      }
      newFirePos.set(`${pos.x},${pos.y}`, pos);
    }

    for (let i = 0; i <= 4; i++) {
      const y = bombPos.y - i;
      if (y < 0) continue;
      const pos = new Pos(bombPos.x, y);
      const item = this.level.levelMap[pos.toIndex(this.width, this.height)];
      if (item === Wall) {
        break;
      }
      newFirePos.set(`${pos.x},${pos.y}`, pos);
    }

    for (let i = 0; i <= 4; i++) {
      const y = bombPos.y + i;
      if (y > this.height) continue;
      const pos = new Pos(bombPos.x, y);
      const item = this.level.levelMap[pos.toIndex(this.width, this.height)];
      if (item === Wall) {
        break;
      }
      newFirePos.set(`${pos.x},${pos.y}`, pos);
    }

    return newFirePos.values();
  }

  private renderGameOver(ctx: CanvasRenderingContext2D) {
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
  }

  render(ctx: CanvasRenderingContext2D) {
    this.level.render(ctx);
    for (const bomb of this.bombs.values()) {
      bomb.render(ctx);
    }

    for (const fire of this.fires.values()) {
      fire.render(ctx);
    }

    if (this.player.isDead) {
      this.renderGameOver(ctx);
    } else {
      this.player.render(ctx);
    }
  }
}
