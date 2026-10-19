/**
 * Level grids ported from the original Blockly Maze game (`X` array).
 * 0 = wall, 1 = path, 2 = pegman start, 3 = finish marker.
 * Every level starts facing East (direction 1), matching the original
 * (initial sprite frame 4 = 4 * T).
 */

export type SensorDir = "ahead" | "left" | "right";
/** Flowchart node types. "start"/"end" are always available and aren't level-gated. */
export type FlowNodeType = "move" | "turnLeft" | "turnRight" | "repeat" | "if";

export interface LevelDef {
  grid: number[][];
  /** flowchart node types available on this level (from the original #toolbox progression) */
  toolbox: FlowNodeType[];
  /** default sensor for new "if" nodes (L6 presets left) */
  ifDefault: SensorDir;
  /** max placed nodes (move/turn/if/repeat), copied from the original `maxBlocks` per level */
  maxBlocks: number;
}

const L1: LevelDef = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 1, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],
  toolbox: ["move", "turnLeft", "turnRight"],
  ifDefault: "ahead",
  maxBlocks: Infinity,
};

const L2: LevelDef = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 3, 0, 0, 0],
    [0, 0, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  toolbox: ["move", "turnLeft", "turnRight"],
  ifDefault: "ahead",
  maxBlocks: Infinity,
};

const L3: LevelDef = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  toolbox: ["move", "turnLeft", "turnRight", "repeat"],
  ifDefault: "ahead",
  maxBlocks: 2,
};

const L4: LevelDef = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 3, 1, 0],
    [0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 2, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
  ],
  toolbox: ["move", "turnLeft", "turnRight", "repeat"],
  ifDefault: "ahead",
  maxBlocks: 5,
};

const L5: LevelDef = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 2, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  toolbox: ["move", "turnLeft", "turnRight", "repeat"],
  ifDefault: "ahead",
  maxBlocks: 5,
};

const L6: LevelDef = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 3, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 2, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  toolbox: ["move", "turnLeft", "turnRight", "repeat", "if"],
  ifDefault: "left",
  maxBlocks: 5,
};

const L7: LevelDef = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
    [0, 2, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 3, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  toolbox: ["move", "turnLeft", "turnRight", "repeat", "if"],
  ifDefault: "ahead",
  maxBlocks: 5,
};

const L8: LevelDef = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [0, 2, 1, 1, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  toolbox: ["move", "turnLeft", "turnRight", "repeat", "if"],
  ifDefault: "ahead",
  maxBlocks: 10,
};

const L9: LevelDef = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [3, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 2, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  toolbox: ["move", "turnLeft", "turnRight", "repeat", "if"],
  ifDefault: "ahead",
  maxBlocks: 7,
};

const L10: LevelDef = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 3, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [0, 2, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  toolbox: ["move", "turnLeft", "turnRight", "repeat", "if"],
  ifDefault: "ahead",
  maxBlocks: 10,
};

export const LEVELS: LevelDef[] = [L1, L2, L3, L4, L5, L6, L7, L8, L9, L10];

/** Flowchart node fill colors — matches the design tokens in global.css. */
export const NODE_FILL: Record<"start" | "end" | FlowNodeType, string> = {
  start: "#19C37D", // --color-positive
  end: "#19C37D",
  move: "#4B3BFF", // --color-accent
  turnLeft: "#4B3BFF",
  turnRight: "#4B3BFF",
  if: "#3B76FF", // --color-flow
  repeat: "#FF5B24", // --color-mara
};

export const START_DIR = 1; // East on every level, like the original
