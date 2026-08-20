/**
 * Live TV + desk layout. `TV_DESK_CHECKPOINT` is the setup from 2026-08-19
 * (yawed CRT on the larger desk, parked bottom-right). To revert after
 * tweaks, copy those values back onto the live exports below.
 */
export const TV_DESK_CHECKPOINT = {
  MODEL_URL: "/media/tv/hitachi-crt.glb",
  DESK_URL: "/media/tv/office-desk.glb",
  SHOW_DESK: true,
  DESKTOP_YAW: -0.43,
  MOBILE_YAW: 0,
  FRAME_MARGIN: 1.12,
  COMPACT_QUERY: "(max-width: 52rem)",
  TV_WIDTH_M: 0.48,
  DESK_SCALE: 1.4,
  DESK_TV_RIGHT: 0.17,
  SLOT_ASPECT: 1.28,
  TV_RIGHT_NDC: 0.96,
  MOBILE_TV_WIDTH_NDC: 0.9,
  CAMERA_FOV: 24,
} as const;

export const SHOW_DESK = true;

/** Desktop: turn toward the page center from the bottom-right corner. */
export const DESKTOP_YAW = -0.43;
/** Mobile: face the camera straight on. */
export const MOBILE_YAW = 0;
export const FRAME_MARGIN = 1.12;
export const COMPACT_QUERY = "(max-width: 52rem)";
/** Assumed CRT width in meters, used to scale the 1.4m desk. */
export const TV_WIDTH_M = 0.48;
/** Make the desk larger than a strictly real-world ratio to the CRT. */
export const DESK_SCALE = 1.4;
/** Shift the TV toward the right side of the desk, as a fraction of desk width. */
export const DESK_TV_RIGHT = 0.17;
/** Film aspect around the yawed CRT so leftover width sits to the left. */
export const SLOT_ASPECT = 1.28;
/** Keep the TV's right edge this close to the film's right (NDC). */
export const TV_RIGHT_NDC = 0.96;
/**
 * How hard the film crop pins the CRT to the bottom. 1 sits on the bottom
 * edge; 0 sits on the top. Lower this to move the TV up in the viewport.
 */
export const TV_BOTTOM_BIAS = 0.62;
/** On mobile, fill this much of the canvas width with the CRT. */
export const MOBILE_TV_WIDTH_NDC = 0.98;
export const CAMERA_FOV = 24;

/** On the white-wall homepage, the CRT sits in front of the copy at 3/5 original size. */
export const DEFAULT_PAGE_TV_SCALE = 0.6;

export const MODEL_URL = "/media/tv/hitachi-crt.glb";
export const DESK_URL = "/media/tv/office-desk.glb";
