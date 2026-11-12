export type FireworkQuality = {
  columns: number;
  maxDpr: number;
  sparkBudget: number;
  pompomDensity: number;
};

export function fireworkQuality(
  cssWidth: number,
  devicePixelRatio: number,
): FireworkQuality {
  const width = cssWidth < 1 ? 1 : cssWidth;
  const ratio = Number.isFinite(devicePixelRatio) ? devicePixelRatio : 1;
  const narrow = width < 800;
  const columns =
    width >= 1200 ? 302 : Math.min(302, Math.max(64, Math.round(width / 6)));

  return {
    columns,
    maxDpr: narrow ? 1 : Math.min(ratio || 1, 2),
    sparkBudget: narrow ? 600 : 1400,
    pompomDensity: narrow ? 3.3 : 6.6,
  };
}
