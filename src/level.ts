import type { Tile } from './map';

const fill = (length: number, tile: Tile | Tile[]) => Array(length).fill(tile);

// 23 x 12
const level: Tile[][] = [
  [...fill(23, 'W')],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  ['W', ...fill(21, 'O'), 'W'],
  [...fill(23, 'W')],
];

export default level;
