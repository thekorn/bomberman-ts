import { expect, test } from 'vitest';
import { type Tile, createMap } from './map';

test('create an empty map', () => {
  const tiles: Tile[][] = [['O', 'O', 'P', 'O', 'O']];
  const [tilemap, pos] = createMap(5, 1, tiles);

  expect(tilemap).toEqual(['O', 'O', 'O', 'O', 'O']);
  expect(pos.x).toEqual(2);
  expect(pos.y).toEqual(0);
});
