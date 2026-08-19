/**
 * Optimized willow-hill GLB as the page background, locked to
 * Sketchfab annotation 2 (in-forest slope). Camera is already in
 * the flattened GLB's Y-up world space.
 */
export const FOREST_URL = "/media/forest/willow-hill.glb";

export const ANNOTATION_2_EYE = [
  -14.44099630998425, 4.622859088834488, -124.14273994109034,
] as const;
export const ANNOTATION_2_TARGET = [
  2.415586540042585, 5.578757521485262, -143.8838710759468,
] as const;
export const ANNOTATION_2_UP = [0, 0.9966657433134176, 0.08159286798190718] as const;

export const FOREST_FOV = 45;
export const FOREST_FOG = 0xdce8ee;
export const FOREST_FOG_DENSITY = 0.0045;
export const FOREST_CLEAR = "#dce8ee";

export const SUNSET_TOP = 0x4a9ad8;
export const SUNSET_MID = 0xb5d6ef;
export const SUNSET_HORIZON = 0xf2efe6;
export const SUNSET_GROUND = 0xd5d8cc;

/** World-space meters of leaf travel at peak. */
export const LEAF_SWAY_AMP = 0.003;
/** Wind cycle speed. */
export const LEAF_SWAY_SPEED = 1.05;
