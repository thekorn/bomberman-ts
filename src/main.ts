import { setupGame } from './game.ts';
import './style.css';
import { assert } from './utils.ts';

const GridCols = 23;
const GridRows = 12;

const CellSize = 35;

const app = document.querySelector<HTMLDivElement>('#app');
assert(app !== null, 'app element not found');
app.innerHTML = `
  <main>
    <h1>Bomberman</h1>
    <canvas id="game" width="${GridCols * CellSize}" height="${GridRows * CellSize}"></canvas>
  </main>
`;

const game = document.querySelector<HTMLCanvasElement>('#game');
assert(game !== null, 'game element not found');

setupGame(GridCols, GridRows, game);
