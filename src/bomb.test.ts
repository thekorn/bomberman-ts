import { expect, test } from 'vitest';
import { Bomb } from './bomb';
import { Pos } from './pos';

class TestBomb extends Bomb {
  getSpriteName(): string {
    return super.getSpriteName();
  }
}

test('should get position from index', () => {
  const pos = new Pos(0, 0);
  const b = new TestBomb(pos, 10, 10, new Map());
  expect(b.isDone).toBe(false);
  expect(b.getSpriteName()).toBe('bomb-0');
  expect(b.isDone).toBe(false);

  for (let i = 0; i <= 10; i++) {
    b.tick();
  }
  expect(b.getSpriteName()).toBe('bomb-1');
  expect(b.isDone).toBe(false);

  for (let i = 0; i <= 10; i++) {
    b.tick();
  }
  expect(b.getSpriteName()).toBe('bomb-2');
  expect(b.isDone).toBe(false);

  for (let i = 0; i <= 10; i++) {
    b.tick();
  }
  expect(b.getSpriteName()).toBe('bomb-2');
  expect(b.isDone).toBe(true);
});
