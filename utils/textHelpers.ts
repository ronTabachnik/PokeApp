export function getLongestNameLength<T>(
  items: T[],
  keyPath: (keyof any)[]
): number {
  return items.reduce((max: number, item: T) => {
    const value = keyPath.reduce(
      (obj, key) => (obj ? obj[key] : undefined),
      item
    );
    return Math.max(max, (value || "").length);
  }, 0);
}
