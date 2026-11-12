export function autoBurstCount(input: {
  narrow: boolean;
  sparks: number;
  sparkBudget: number;
  litCells: number;
}): 0 | 1 | 2 {
  const { narrow, sparks, sparkBudget, litCells } = input;

  if (sparks >= sparkBudget || litCells > 180) return 0;
  if (narrow) return sparks < sparkBudget * 0.55 ? 1 : 0;
  if (sparks >= sparkBudget * 0.75) return 0;
  if (sparks >= sparkBudget * 0.4) return 1;
  return 2;
}
