/**
 * Flowchart execution engine — pure, framework-agnostic, no DOM access.
 *
 * A program is a directed graph of FlowNode connected by FlowEdge. Each
 * edge leaves a node by a named "handle" (plain nodes have one: "out";
 * decision-like nodes have two: if = yes/no, repeat = loop/done). Running
 * the graph yields a stream of events the caller can animate and/or feed
 * straight into assertions in a test.
 */

export type FlowNodeType = "start" | "end" | "move" | "turnLeft" | "turnRight" | "if" | "repeat";
export type SensorDir = "ahead" | "left" | "right";
export type OutHandle = "out" | "yes" | "no" | "loop" | "done";

export interface FlowNode {
  id: number;
  type: FlowNodeType;
  x: number;
  y: number;
  sensorDir?: SensorDir; // only meaningful on "if"
}

export interface FlowEdge {
  id: number;
  source: number;
  sourceHandle: OutHandle;
  target: number;
}

export interface MazePos {
  x: number;
  y: number;
}

/** World the engine moves through — supplied by the caller, kept dumb on purpose. */
export interface MazeWorld {
  start: MazePos;
  startDir: number;
  atGoal(pos: MazePos): boolean;
  /** true when the cell in `dir` (relative to facing `dir`, 0=N 1=E 2=S 3=W) from pos is walkable. */
  isOpen(pos: MazePos, dir: number): boolean;
  step(pos: MazePos, dir: number): MazePos;
  turn(dir: number, way: "turnLeft" | "turnRight"): number;
}

export type FlowEvent =
  | { type: "init"; pos: MazePos; dir: number }
  | { type: "move"; nodeId: number; pos: MazePos }
  | { type: "turn"; nodeId: number; dir: number }
  | { type: "branch"; nodeId: number; handle: OutHandle }
  | { type: "blocked"; nodeId: number }
  | { type: "win"; pos: MazePos }
  | { type: "end" }
  | { type: "stopped" }
  | { type: "error"; message: string };

export const MAX_STEPS = 300;

function outEdge(nodeId: number, handle: OutHandle, edges: FlowEdge[]): FlowEdge | undefined {
  return edges.find((e) => e.source === nodeId && e.sourceHandle === handle);
}

/**
 * Runs a flowchart against a maze world. A generator so the UI can pace
 * animation between events (or a test can simply drain it with Array.from).
 */
export function* runFlow(nodes: FlowNode[], edges: FlowEdge[], world: MazeWorld): Generator<FlowEvent> {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const starts = nodes.filter((n) => n.type === "start");
  if (starts.length === 0) {
    yield { type: "error", message: "Add a Start node to begin." };
    return;
  }

  let pos: MazePos = { ...world.start };
  let dir = world.startDir;
  yield { type: "init", pos, dir };

  let current: FlowNode | undefined = (() => {
    const e = outEdge(starts[0].id, "out", edges);
    return e ? byId.get(e.target) : undefined;
  })();
  if (!current) {
    yield { type: "error", message: "Connect the Start node to a block to begin." };
    return;
  }

  let guard = 0;
  while (current) {
    if (guard++ > MAX_STEPS) {
      yield { type: "error", message: "Infinite loop detected — check your Repeat and Path Ahead connections." };
      return;
    }
    if (world.atGoal(pos)) {
      yield { type: "win", pos };
      return;
    }

    const node = current;
    if (node.type === "move") {
      if (!world.isOpen(pos, dir)) {
        yield { type: "blocked", nodeId: node.id };
        return;
      }
      pos = world.step(pos, dir);
      yield { type: "move", nodeId: node.id, pos };
      const e = outEdge(node.id, "out", edges);
      if (!e) {
        yield { type: "error", message: '"Maju" belum disambung ke blok berikutnya.' };
        return;
      }
      current = byId.get(e.target);
    } else if (node.type === "turnLeft" || node.type === "turnRight") {
      dir = world.turn(dir, node.type);
      yield { type: "turn", nodeId: node.id, dir };
      const e = outEdge(node.id, "out", edges);
      if (!e) {
        yield { type: "error", message: '"Belok" belum disambung ke blok berikutnya.' };
        return;
      }
      current = byId.get(e.target);
    } else if (node.type === "if") {
      const rel = node.sensorDir === "left" ? 3 : node.sensorDir === "right" ? 1 : 0;
      const open = world.isOpen(pos, (((dir + rel) % 4) + 4) % 4);
      const handle: OutHandle = open ? "yes" : "no";
      yield { type: "branch", nodeId: node.id, handle };
      const e = outEdge(node.id, handle, edges);
      if (!e) {
        yield { type: "error", message: `"Jika ada jalan?" belum punya sambungan ${open ? "Ya" : "Tidak"}.` };
        return;
      }
      current = byId.get(e.target);
    } else if (node.type === "repeat") {
      const notDone = !world.atGoal(pos);
      const handle: OutHandle = notDone ? "loop" : "done";
      yield { type: "branch", nodeId: node.id, handle };
      const e = outEdge(node.id, handle, edges);
      if (!e) {
        if (notDone) {
          yield { type: "error", message: '"Perulangan" belum punya isi pengulangan.' };
          return;
        }
        current = undefined; // done with nothing after it: fall through to the stop check below
        break;
      }
      current = byId.get(e.target);
    } else if (node.type === "end") {
      yield { type: "end" };
      return;
    } else if (node.type === "start") {
      // A second Start reached mid-run is just treated as a pass-through.
      const e = outEdge(node.id, "out", edges);
      current = e ? byId.get(e.target) : undefined;
    }
  }

  yield world.atGoal(pos) ? { type: "win", pos } : { type: "stopped" };
}

export function createWorld(grid: number[][], start: MazePos, goal: MazePos, startDir: number): MazeWorld {
  const DIRS: [number, number][] = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ]; // N E S W
  const cellAt = (x: number, y: number) => {
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) return 0;
    return grid[y][x];
  };
  return {
    start,
    startDir,
    atGoal: (pos) => pos.x === goal.x && pos.y === goal.y,
    isOpen: (pos, d) => {
      const [dx, dy] = DIRS[(((d % 4) + 4) % 4)];
      return cellAt(pos.x + dx, pos.y + dy) !== 0;
    },
    step: (pos, d) => {
      const [dx, dy] = DIRS[(((d % 4) + 4) % 4)];
      return { x: pos.x + dx, y: pos.y + dy };
    },
    turn: (d, way) => ((((way === "turnLeft" ? d - 1 : d + 1) % 4) + 4) % 4),
  };
}
