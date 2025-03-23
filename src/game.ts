import SPRITES from '/sprite.png';
import BaseLevel, { Level } from './level';
import { Player } from './player';
import createSpriteSheet, { loadSpriteSheetFromUrl } from './spriteSheet';

const MAX_FPS = 10;
const FRAME_INTERVAL_MS = 1000 / MAX_FPS;

let previousTimeMs = 0;

const pressedKeys = new Set<string>();
const isKeyDown = (key: string) => pressedKeys.has(key);

function emitKeyDown(event: KeyboardEvent) {
  pressedKeys.add(event.key);
}

function emitKeyUp(event: KeyboardEvent, player: Player) {
  pressedKeys.delete(event.key);
  player.isWalking = false;
}

function updatePhysics(player: Player) {
  if (isKeyDown('ArrowLeft')) {
    console.log('move left');
    player.move(-1, 0);
  } else if (isKeyDown('ArrowRight')) {
    player.move(1, 0);
  } else if (isKeyDown('ArrowUp')) {
    console.log('move up');
    player.move(0, -1);
  } else if (isKeyDown('ArrowDown')) {
    console.log('move down');
    player.move(0, 1);
  }
}

function draw(ctx: CanvasRenderingContext2D, level: Level, player: Player) {
  // Draw game here
  level.render(ctx);
  player.render(ctx);
}

function update(ctx: CanvasRenderingContext2D, level: Level, player: Player) {
  requestAnimationFrame((currentTimeMs) => {
    const deltaTimeMs = currentTimeMs - previousTimeMs;
    if (deltaTimeMs >= FRAME_INTERVAL_MS) {
      updatePhysics(player);
      // Synchronize next frame to arrive on time
      const offset = deltaTimeMs % FRAME_INTERVAL_MS;
      previousTimeMs = currentTimeMs - offset;
    }
    draw(ctx, level, player);
    update(ctx, level, player);
  });
}

export async function setupGame(
  cols: number,
  rows: number,
  element: HTMLCanvasElement,
) {
  console.log('setupGame', element);
  const ctx = element.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, element.width, element.height);

  const sprites = await loadSpriteSheetFromUrl(SPRITES);

  const spriteSheet = await createSpriteSheet(sprites, [
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
  ]);

  const level = new Level(cols, rows, BaseLevel, spriteSheet);
  const player = new Player(cols, rows, spriteSheet, level);

  document.addEventListener('keydown', (e) => emitKeyDown(e));
  document.addEventListener('keyup', (e) => emitKeyUp(e, player));

  update(ctx, level, player);
}
