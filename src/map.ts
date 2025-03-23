import { Pos } from './pos';
import { assert } from './utils';

type Wall = 'W';
type Walkable = 'O';
type Player = 'P';

export type Tile = Wall | Walkable | Player;

export function createMap(
  width: number,
  height: number,
  level: Tile[][],
): [Tile[], Pos] {
  let playerPos: Pos | undefined = undefined;
  assert(height === level.length, 'height must match level length');
  console.log('Creating map...');
  const result: Tile[] = [];
  for (let y = 0; y < height; y++) {
    assert(level[y].length === width, 'width must match level width');
    for (let x = 0; x < width; x++) {
      if (level[y][x] === 'P') {
        assert(playerPos === undefined, 'only one player allowed');
        playerPos = new Pos(x, y);
        result.push('O');
      } else {
        result.push(level[y][x]);
      }
    }
  }
  assert(playerPos !== undefined, 'no player found');
  return [result, playerPos];
}
