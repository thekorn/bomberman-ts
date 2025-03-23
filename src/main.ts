import { setupGame } from './game.ts';
import './style.css';

const GridCols = 23;
const GridRows = 12;

// biome-ignore lint/style/noNonNullAssertion: we know it exists
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <h1>Bomberman</h1>
    <canvas id="game" width="${GridCols * 35}" height="${GridRows * 35}"></canvas>
  </main>
`;

setupGame(
  GridCols,
  GridRows,
  // biome-ignore lint/style/noNonNullAssertion: we know it exists
  document.querySelector<HTMLCanvasElement>('#game')!,
);
