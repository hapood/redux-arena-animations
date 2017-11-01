import ArenaActionTypes from "redux-arena/ActionTypes";
import ActionTypes from "./ActionTypes";
import Phases from "./Phases";
import { SceneBundleThunk, State } from "./types";

export function setState(state: State) {
  return {
    type: ArenaActionTypes.ARENA_SCENE_SET_STATE,
    state
  };
}

export function nextPhase(phase: Phases) {
  return {
    type: ActionTypes.ARENA_SCENE_ANIMATION_NEXTPHRASE,
    phase
  };
}

export function startLeaving() {
  return {
    type: ActionTypes.ARENA_SCENE_ANIMATION_LEAVING_START
  };
}

export function loadSceneBundle(sceneBundleThunk: SceneBundleThunk) {
  return {
    type: ActionTypes.ARENA_SCENE_ANIMATION_LOAD_BUNDLE,
    sceneBundleThunk
  };
}

export default { setState, nextPhase, startLeaving, loadSceneBundle };
