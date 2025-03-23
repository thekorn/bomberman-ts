// [sprite name, [x, y, width, height]]
type SpriteDefinition = [string, [number, number, number, number]];

export const loadSpriteSheetFromUrl = (
  url: string,
): Promise<HTMLImageElement> =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });

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
export default createSpriteSheet;

export type ISpriteSheet = Awaited<ReturnType<typeof createSpriteSheet>>;
