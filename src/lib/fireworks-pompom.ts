export function pompomCount(arms: number, size: number, density: number): number {
  return Math.max(24, Math.round(arms * size * density));
}

export function pompomChar(
  age: number,
  twinkle: number,
  zDir: number,
  base: string,
): string {
  if (Math.abs(zDir) >= 0.35) return base;

  const wave = Math.sin(age * 16 + twinkle);
  if (wave > 0.55) return "*";
  if (wave < -0.55) return ".";
  return base;
}
