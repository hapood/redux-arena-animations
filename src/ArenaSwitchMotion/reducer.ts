import { AnyAction } from "redux";
import initState from "./state";
import ActionTypes from "./ActionTypes";
import AnimationPhases from "./AnimationPhases";
import PlayStrategies from "./PlayStrategies";
import { State, PlayEntity } from "./types";

function nextPhaseState(state: State, action: AnyAction) {
  let {
    phase,
    oldPlayKey,
    oldPlay
  }: {
    phase: AnimationPhases;
    oldPlayKey: "play1" | "play2";
    oldPlay: PlayEntity;
  } = action as any;
  if (state.phase !== phase || state[oldPlayKey] !== oldPlay) return state;
  switch (state.phase) {
    case AnimationPhases.ENTERING:
      let newPlayKey;
      if (state.newPlayKey === "play2") {
        newPlayKey = "play1";
      } else {
        newPlayKey = "play2";
      }
      return Object.assign({}, state, {
        phase: AnimationPhases.IN,
        [newPlayKey]: {},
        newPlayKey
      });
    case AnimationPhases.LEAVING:
      return Object.assign({}, state, { phase: AnimationPhases.OUT });
    case AnimationPhases.OUT:
      return Object.assign({}, state, { phase: AnimationPhases.ENTERING });
    default:
      return state;
  }
}

function playRemoveState(state: State, action: AnyAction) {
  let oldPlayKey = state.newPlayKey === "play1" ? "play2" : "play1";
  if (
    state.phase == AnimationPhases.IN &&
    (state as any)[oldPlayKey] === action.element
  ) {
    return Object.assign({}, state, { phase: AnimationPhases.LEAVING });
  } else if (state[state.newPlayKey].element === action.element) {
    return Object.assign({}, state, { autoClearPlay: action.element });
  } else {
    return Object.assign({}, state, {
      playlist: state.playlist.filter(
        entity => entity.element !== action.element
      )
    });
  }
}

export default function(state = initState, action: AnyAction) {
  switch (action.type) {
    case ActionTypes.ARENA_SWITCH_ANIMATION_NEXTPHRASE:
      return nextPhaseState(state, action);
    case ActionTypes.ARENA_SWITCH_ANIMATION_PLAY_NEXT:
      if (state.playlist.length === 0 && state.autoClearPlay == null)
        return state;
      let newState = Object.assign({}, state);
      if (state.phase === AnimationPhases.IN) {
        newState.phase = AnimationPhases.LEAVING;
      } else if (
        state.phase === AnimationPhases.OUT &&
        state.autoClearPlay != null
      ) {
        newState.autoClearPlay = null;
      } else {
        return state;
      }
      if (state.playlist.length > 0) {
        if (state.play1.element == null && state.play2.element == null) {
          newState.phase = AnimationPhases.OUT;
        }
        switch (action.PlayStrategies) {
          case PlayStrategies.PLAT_NEXT:
            newState[state.newPlayKey] = state.playlist[0];
            newState.playlist = state.playlist.slice(1);
          default:
            newState[state.newPlayKey] =
              state.playlist[state.playlist.length - 1];
            newState.playlist = [];
        }
      }
      return newState;
    case ActionTypes.ARENA_SWITCH_ANIMATION_PLAY_ADD:
      return Object.assign({}, state, {
        playlist: state.playlist.concat(action.entity)
      });
    case ActionTypes.ARENA_SWITCH_ANIMATION_PLAY_REMOVE:
      return playRemoveState(state, action);
    default:
      return state;
  }
}
