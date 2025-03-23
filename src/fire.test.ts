import { expect, test } from 'vitest';
import { Fire } from './fire';
import { Pos } from './pos';

class TestFire extends Fire {
  getSpriteName(): string {
    return super.getSpriteName();
  }
}

test('should return the correct sprite name and isDone status', () => {
  const pos = new Pos(0, 0);
  const f = new TestFire(pos, 10, 10, new Map());
  expect(f.isDone).toBe(false);
  expect(f.getSpriteName()).toBe('fire-0');
  f.tick();
  expect(f.getSpriteName()).toBe('fire-4');
  f.tick();
  expect(f.getSpriteName()).toBe('fire-3');
  f.tick();
  expect(f.getSpriteName()).toBe('fire-2');
  f.tick();
  expect(f.getSpriteName()).toBe('fire-1');
  f.tick();
  expect(f.getSpriteName()).toBe('fire-0');
  expect(f.isDone).toBe(false);

  for (let i = 0; i <= 70; i++) {
    f.tick();
  }
  expect(f.isDone).toBe(true);
});
