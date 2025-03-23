import { expect, test } from 'vitest';
import { Pos } from './pos';

test('should get position from index', () => {
  let pos = Pos.fromIndex(0, 5, 10);
  expect(pos.x).toBe(0);
  expect(pos.y).toBe(0);

  pos = Pos.fromIndex(3, 5, 10);
  expect(pos.x).toBe(3);
  expect(pos.y).toBe(0);

  pos = Pos.fromIndex(13, 5, 10);
  expect(pos.x).toBe(3);
  expect(pos.y).toBe(1);
});

test('should throw on negative index', () => {
  expect(() => Pos.fromIndex(-1, 5, 10)).toThrow();
});

test('should throw on negative width', () => {
  expect(() => Pos.fromIndex(0, -10, 5)).toThrow();
});

test('should throw on negative height', () => {
  expect(() => Pos.fromIndex(0, 10, -5)).toThrow();
});

test('should throw on negative width and height', () => {
  expect(() => Pos.fromIndex(0, -10, -5)).toThrow();
});

test('should throw when index is out of range', () => {
  expect(() => Pos.fromIndex(50, 5, 10)).toThrow();
});
