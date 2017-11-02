import Phases from "./Phases";
import { State } from "./types";
export default {
  play1: { node: null },
  play2: { node: null },
  newPlayKey: "play2",
  playlist: [],
  autoClearPlay: null,
  phase: Phases.IN
} as State;
