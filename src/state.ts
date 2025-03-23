import { Bomb } from './bomb';
import type { Player } from './player';
import { Pos } from './pos';

export class State {
  public pressedKeys = new Set<string>();
  public bombs = new Map<string, Bomb>();

  constructor(public player: Player) {}
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
        const p = new Pos(this.player.pos.x, this.player.pos.y);
        this.bombs.set(key, new Bomb(p));
      }
    }
    console.log('update physics', this.bombs);
  }
}
