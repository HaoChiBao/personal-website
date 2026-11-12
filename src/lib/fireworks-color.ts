export type Rgb = [number, number, number];

export function quantizeChannel(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(255, Math.max(0, Math.round(value / 16) * 16));
}

export function quantizeRgb(rgb: Rgb): Rgb {
  return [quantizeChannel(rgb[0]), quantizeChannel(rgb[1]), quantizeChannel(rgb[2])];
}
