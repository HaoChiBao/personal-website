/** Map of lowercase letter → public URLs for that glyph's variants. */
export type LetterVariantMap = Record<string, string[]>;

/** One URL per unique letter in `text` — the first visible wave. */
export function firstVariantUrls(
  text: string,
  variants: LetterVariantMap,
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const char of text) {
    const first = variants[char.toLowerCase()]?.[0];
    if (!first || seen.has(first)) continue;
    seen.add(first);
    out.push(first);
  }
  return out;
}

/**
 * Up to `perLetter` not-yet-loaded variants for each unique letter.
 * Used to unlock the intro shuffle without fetching the full 50+ set.
 */
export function extraVariantUrls(
  text: string,
  variants: LetterVariantMap,
  loaded: Iterable<string>,
  perLetter = 1,
): string[] {
  const have = new Set(loaded);
  const seen = new Set<string>();
  const added = new Map<string, number>();
  const out: string[] = [];

  for (const char of text) {
    const key = char.toLowerCase();
    const urls = variants[key];
    if (!urls) continue;
    let n = added.get(key) ?? 0;
    for (const src of urls) {
      if (have.has(src) || seen.has(src)) continue;
      if (n >= perLetter) break;
      seen.add(src);
      out.push(src);
      n += 1;
    }
    added.set(key, n);
  }

  return out;
}
