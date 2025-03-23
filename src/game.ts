import SPRITES from '/sprite.png';
import BaseLevel, { Level } from './level';
import type { createMap } from './map';
import createSpriteSheet, { loadSpriteSheetFromUrl } from './spriteSheet';

const MAX_FPS = 60;
const FRAME_INTERVAL_MS = 1000 / MAX_FPS;

let previousTimeMs = 0;
let levelMap: ReturnType<typeof createMap>;

const pressedKeys = new Set<string>();
const isKeyDown = (key: string) => pressedKeys.has(key);

function updatePhysics() {
  if (isKeyDown('ArrowLeft')) {
    console.log('move left');
  } else if (isKeyDown('ArrowRight')) {
    console.log('move right');
  } else if (isKeyDown('ArrowUp')) {
    console.log('move up');
  } else if (isKeyDown('ArrowDown')) {
    console.log('move down');
  }
}

function draw(ctx: CanvasRenderingContext2D, level: Level) {
  // Draw game here
  level.render(ctx);
}

function update(ctx: CanvasRenderingContext2D, level: Level) {
  requestAnimationFrame((currentTimeMs) => {
    const deltaTimeMs = currentTimeMs - previousTimeMs;
    if (deltaTimeMs >= FRAME_INTERVAL_MS) {
      updatePhysics();
      // Synchronize next frame to arrive on time
      const offset = deltaTimeMs % FRAME_INTERVAL_MS;
      previousTimeMs = currentTimeMs - offset;
    }
    draw(ctx, level);
    update(ctx, level);
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

  document.addEventListener('keydown', (e) => pressedKeys.add(e.key));
  document.addEventListener('keyup', (e) => pressedKeys.delete(e.key));

  const sprites = await loadSpriteSheetFromUrl(SPRITES);

  const spriteSheet = await createSpriteSheet(sprites, [
    ['O', [0, 0, 64, 64]],
    ['W', [64, 0, 64, 64]],
  ]);

  const level = new Level(cols, rows, BaseLevel, spriteSheet);

  console.log(spriteSheet);

  update(ctx, level);
}
