import "./style.css";
import { setupGame } from "./game.ts";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
    <h1>Bomberman</h1>
    <canvas id="game" width="800" height="600"></canvas>
  </main>
`;

// biome-ignore lint/style/noNonNullAssertion: <explanation>
setupGame(document.querySelector<HTMLCanvasElement>("#game")!);
