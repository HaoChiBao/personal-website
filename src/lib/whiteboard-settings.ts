/**
 * Saved whiteboard scene settings.
 *
 * Flip `SHOW_WHITEBOARD` to `true` to restore the standing board, marker
 * drawing, and click-to-focus camera. Values below are the last live setup:
 * left of the desk, slightly behind, yawed 45° + 10° counterclockwise,
 * parked so the left edge clips the viewport, drawing on the white face.
 */
export const SHOW_WHITEBOARD = false;

export const BOARD_URL = "/media/tv/whiteboard-stand.glb";
/** Board height relative to the TV-plus-desk stack. */
export const BOARD_HEIGHT_FACTOR = 2.15 / 1.5;
/** Gap left of the desk, as a fraction of desk width. Negative tucks behind. */
export const BOARD_GAP = -0.04;
/** Push the board behind the desk, as a fraction of desk depth. */
export const BOARD_BEHIND = 0.12;
/** Desktop: park the board so its left edge sits just off-screen. */
export const BOARD_LEFT_NDC = -1.38;
/** How much of the view the board should fill when focused. */
export const BOARD_FOCUS_FILL = 0.8;
export const BOARD_FOCUS_MS = 560;
/** 45° plus 10° counterclockwise. */
export const BOARD_YAW = Math.PI / 4 + (10 * Math.PI) / 180;
export const BOARD_FACE_MATERIAL = "wire_115115115";
