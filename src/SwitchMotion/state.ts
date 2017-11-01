import Phases from "./Phases";
import { State } from "./types";
export default {
  play1: { element: null },
  play2: { element: null },
  newPlayKey: "play2",
  playlist: [],
  autoClearPlay: null,
  phase: Phases.IN
} as State;
