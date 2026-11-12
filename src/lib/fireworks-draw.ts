export function clearLitCells(
  ctx: CanvasRenderingContext2D,
  lit: ArrayLike<number>,
  litCount: number,
  cols: number,
  cellW: number,
  cellH: number,
  pad: number,
  cssW: number,
  cssH: number,
): void {
  if (litCount <= 0) return;
  if (litCount > 400) {
    ctx.clearRect(0, 0, cssW, cssH);
    return;
  }
  for (let n = 0; n < litCount; n++) {
    const i = lit[n];
    const col = i % cols;
    const row = (i / cols) | 0;
    ctx.clearRect(
      col * cellW - pad,
      row * cellH - pad,
      cellW + pad * 2,
      cellH + pad * 2,
    );
  }
}

export function useFillTextPaint(litCount: number, narrow: boolean): boolean {
  return narrow || litCount > 80;
}

export function paintCells(
  ctx: CanvasRenderingContext2D,
  lit: ArrayLike<number>,
  litCount: number,
  cols: number,
  cellW: number,
  cellH: number,
  glyphs: ArrayLike<string | undefined>,
  colors: ArrayLike<number>,
  font: string,
): void {
  ctx.font = font;
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  let color = -1;
  for (let n = 0; n < litCount; n++) {
    const i = lit[n];
    const glyph = glyphs[i];
    if (glyph == null) continue;
    const key = colors[i];
    if (key !== color) {
      color = key;
      const r = (key >> 16) & 255;
      const g = (key >> 8) & 255;
      const b = key & 255;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
    }
    ctx.fillText(glyph, (i % cols) * cellW, ((i / cols) | 0) * cellH);
  }
}
