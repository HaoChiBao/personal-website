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
