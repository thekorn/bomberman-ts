import Level from './level';
import { createMap } from './map';

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

function draw() {
  // Draw game here
}

function update() {
  requestAnimationFrame((currentTimeMs) => {
    const deltaTimeMs = currentTimeMs - previousTimeMs;
    if (deltaTimeMs >= FRAME_INTERVAL_MS) {
      updatePhysics();
      // Synchronize next frame to arrive on time
      const offset = deltaTimeMs % FRAME_INTERVAL_MS;
      previousTimeMs = currentTimeMs - offset;
    }
    draw();
    update();
  });
}

export function setupGame(element: HTMLCanvasElement) {
  console.log('setupGame', element);
  const ctx = element.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, element.width, element.height);

  document.addEventListener('keydown', (e) => pressedKeys.add(e.key));
  document.addEventListener('keyup', (e) => pressedKeys.delete(e.key));

  levelMap = createMap(23, 12, Level);
  console.log('map', levelMap);

  update();
}
