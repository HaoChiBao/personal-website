/**
 * Next.js 16 + Turbopack can call performance.measure with a negative
 * timestamp when a route is aborted (notFound/redirect). That throws in
 * the browser and trips the dev overlay. Swallow only that known case.
 * @see https://github.com/vercel/next.js/issues/86060
 */
if (process.env.NODE_ENV === "development") {
  const original = performance.measure.bind(performance);
  performance.measure = ((
    ...args: Parameters<typeof performance.measure>
  ) => {
    try {
      return original(...args);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (
        message.includes("negative time stamp") ||
        message.includes("cannot be negative")
      ) {
        return undefined as unknown as PerformanceMeasure;
      }
      throw error;
    }
  }) as typeof performance.measure;
}
