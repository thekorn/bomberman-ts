import { expect, test } from 'vitest';
import { Level } from './level';
import type { Tile } from './map';
import { Player } from './player';

test('should create a player', () => {
  const l: Tile[][] = [['O', 'O', 'P', 'O', 'O']];
  const level = new Level(5, 1, l, new Map());
  const player = new Player(5, 1, new Map(), level);

  expect(player.isDead).toBe(false);
});

test('should check if the player can move to a position', () => {
  const l: Tile[][] = [['O', 'O', 'P', 'O', 'O']];
  const level = new Level(5, 1, l, new Map());
  const player = new Player(5, 1, new Map(), level);

  expect(player.canMoveTo(4, 0)).toBe(true);

  expect(player.canMoveTo(10, 10)).toBe(false);
  expect(player.canMoveTo(-1, 2)).toBe(false);
  expect(player.canMoveTo(0, -1)).toBe(false);
  expect(player.canMoveTo(1, 20)).toBe(false);
  expect(player.canMoveTo(20, 0)).toBe(false);
});

test('should move a player', () => {
  const l: Tile[][] = [['O', 'O', 'P', 'O', 'O']];
  const level = new Level(5, 1, l, new Map());
  const player = new Player(5, 1, new Map(), level);

  expect(player.pos.x).toBe(2);
  expect(player.pos.y).toBe(0);
  expect(player.isWalking).toBe(false);

  player.moveBy(2, 0);

  expect(player.pos.x).toBe(4);
  expect(player.pos.y).toBe(0);
});

test('should apply demage to player', () => {
  const l: Tile[][] = [['O', 'O', 'P', 'O', 'O']];
  const level = new Level(5, 1, l, new Map());
  const player = new Player(5, 1, new Map(), level);

  expect(player.isDead).toBe(false);
  player.takeDamage(10);
  expect(player.isDead).toBe(false);
  player.takeDamage(80);
  expect(player.isDead).toBe(true);
});
