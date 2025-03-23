import { setupGame } from './game.ts';
import './style.css';

// biome-ignore lint/style/noNonNullAssertion: we know it exists
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <h1>Bomberman</h1>
    <canvas id="game" width="800" height="600"></canvas>
  </main>
`;

// biome-ignore lint/style/noNonNullAssertion: we know it exists
setupGame(document.querySelector<HTMLCanvasElement>('#game')!);
