import SPRITES from '/sprite.png';
import BaseLevel, { Level } from './level';
import { Player } from './player';
import { loadSpriteSheet } from './spriteSheet';
import { State } from './state';
import { assert } from './utils';

const MAX_FPS = 10;
const FRAME_INTERVAL_MS = 1000 / MAX_FPS;

let previousTimeMs = 0;

function render(ctx: CanvasRenderingContext2D, state: State) {
  state.render(ctx);
}

function update(ctx: CanvasRenderingContext2D, state: State) {
  requestAnimationFrame((currentTimeMs) => {
    const deltaTimeMs = currentTimeMs - previousTimeMs;
    if (deltaTimeMs >= FRAME_INTERVAL_MS) {
      state.update();
      // Synchronize next frame to arrive on time
      const offset = deltaTimeMs % FRAME_INTERVAL_MS;
      previousTimeMs = currentTimeMs - offset;
    }
    render(ctx, state);
    update(ctx, state);
  });
}

export async function setupGame(
  cols: number,
  rows: number,
  element: HTMLCanvasElement,
) {
  console.log('setupGame', element);
  const ctx = element.getContext('2d');
  assert(!!ctx, 'Failed to get canvas context');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, element.width, element.height);

  const spriteSheet = await loadSpriteSheet(SPRITES, [
    ['O', [0, 0, 64, 64]],
    ['W', [64, 0, 64, 64]],

    ['bomber-man-0', [0 * 64, 64, 64, 128]],
    ['bomber-man-1', [1 * 64, 64, 64, 128]],
    ['bomber-man-2', [2 * 64, 64, 64, 128]],
    ['bomber-man-3', [3 * 64, 64, 64, 128]],
    ['bomber-man-4', [4 * 64, 64, 64, 128]],
    ['bomber-man-5', [5 * 64, 64, 64, 128]],
    ['bomber-man-6', [6 * 64, 64, 64, 128]],
    ['bomber-man-7', [7 * 64, 64, 64, 128]],

    ['bomb-0', [0, 192, 64, 64]],
    ['bomb-1', [64, 192, 64, 64]],
    ['bomb-2', [128, 192, 64, 64]],

    ['fire-0', [2 * 64, 0, 64, 64]],
    ['fire-1', [3 * 64, 0, 64, 64]],
    ['fire-2', [4 * 64, 0, 64, 64]],
    ['fire-3', [5 * 64, 0, 64, 64]],
    ['fire-4', [6 * 64, 0, 64, 64]],
  ]);

  const level = new Level(cols, rows, BaseLevel, spriteSheet);
  const player = new Player(cols, rows, spriteSheet, level);

  const state = new State(player, cols, rows, spriteSheet, level);

  document.addEventListener('keydown', (e) => state.emitKeyDown(e));
  document.addEventListener('keyup', (e) => state.emitKeyUp(e));

  update(ctx, state);
}
