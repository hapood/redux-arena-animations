import initState from "./state";
import ActionTypes from "./ActionTypes";
import Phases from "./Phases";
import { State } from "./types";
import { AnyAction } from "redux";

export default function(
  state: State = initState,
  action: AnyAction,
  sceneReducerKey: string
) {
  if (action._sceneReducerKey !== sceneReducerKey) return state;
  switch (action.type) {
    case ActionTypes.ARENA_SCENE_ANIMATION_NEXTPHRASE:
      if (state.phase !== action.phase) return state;
      switch (state.phase) {
        case Phases.LOADING:
          return Object.assign({}, state, {
            phase: Phases.ENTERING
          });
        case Phases.ENTERING:
          return Object.assign({}, state, {
            phase: Phases.IN
          });
        case Phases.LEAVING:
          return Object.assign({}, state, { phase: Phases.OUT });
        default:
          return state;
      }
    case ActionTypes.ARENA_SCENE_ANIMATION_LEAVING_START:
      if (state.phase === Phases.IN)
        return Object.assign({}, state, { phase: Phases.LEAVING });
    default:
      return state;
  }
}
