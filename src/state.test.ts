import { expect, test } from 'vitest';
import { Level } from './level';
import type { Tile } from './map';
import { Player } from './player';
import { State } from './state';

class TestState extends State {
  isKeyDown(key: string): boolean {
    return super.isKeyDown(key);
  }
}

test('should create an initial state and move the player', () => {
  const l: Tile[][] = [['O', 'O', 'P', 'O', 'O']];
  const level = new Level(5, 1, l, new Map());
  const player = new Player(5, 1, new Map(), level);

  const state = new TestState(player, 5, 1, new Map(), level);
  expect(player.isWalking).toBe(false);
  expect(state.isKeyDown('ArrowLeft')).toBe(false);
  state.emitKeyDown({ key: 'ArrowLeft' } as KeyboardEvent);
  expect(state.isKeyDown('ArrowLeft')).toBe(true);
  state.update();
  expect(player.isWalking).toBe(true);
  state.emitKeyUp({ key: 'ArrowLeft' } as KeyboardEvent);
  expect(state.isKeyDown('ArrowLeft')).toBe(false);
  expect(player.isWalking).toBe(false);

  expect(player.pos.x).toBe(1);
  expect(player.pos.y).toBe(0);
});
