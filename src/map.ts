import { assert } from './utils';

type Wall = 'W';
type Walkable = 'O';

export type Tile = Wall | Walkable;

export function createMap(
  width: number,
  height: number,
  level: Tile[][],
): Tile[] {
  assert(height === level.length, 'height must match level length');
  console.log('Creating map...');
  const result: Tile[] = [];
  for (let y = 0; y < height; y++) {
    assert(level[y].length === width, 'width must match level width');
    for (let x = 0; x < width; x++) {
      result.push(level[y][x]);
    }
  }
  return result;
}
