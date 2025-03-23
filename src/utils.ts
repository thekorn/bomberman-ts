export function assert(condition: boolean, message: string): asserts condition {
  console.log('ffff');
  if (!condition) {
    throw new Error(message);
  }
}
