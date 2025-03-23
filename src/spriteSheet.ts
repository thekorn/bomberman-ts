// [sprite name, [x, y, width, height]]
type SpriteDefinition = [string, [number, number, number, number]];

async function loadSpriteSheetFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

const spriteSheetCreator =
  (createBitmapImage: typeof window.createImageBitmap) =>
  async (
    sheet: CanvasImageSource,
    definitions: SpriteDefinition[],
  ): Promise<Map<string, ImageBitmap>> => {
    const sprites = await Promise.all(
      definitions.map(([, dimensions]) =>
        createBitmapImage(sheet, ...dimensions),
      ),
    );

    return new Map<string, ImageBitmap>(
      definitions.map(([name], i) => [name, sprites[i]]),
    );
  };

const createSpriteSheet = spriteSheetCreator(window.createImageBitmap);

export async function loadSpriteSheet(
  url: string,
  definitions: SpriteDefinition[],
): Promise<Map<string, ImageBitmap>> {
  const sheet = await loadSpriteSheetFromUrl(url);
  return createSpriteSheet(sheet, definitions);
}

export type ISpriteSheet = Awaited<ReturnType<typeof createSpriteSheet>>;
