export function setupGame(element: HTMLCanvasElement) {
  console.log("setupGame", element);
  const ctx = element.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, element.width, element.height);
}
