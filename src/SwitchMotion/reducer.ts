import { AnyAction } from "redux";
import { SceneReducer } from "redux-arena";
import initState from "./state";
import ActionTypes from "./ActionTypes";
import Phases from "./Phases";
import PlayStrategies from "./PlayStrategies";
import { State, PlayEntity } from "./types";

function nextPhaseState(
  state: State,
  action: {
    phase: Phases;
    oldPlayKey: "play1" | "play2";
    oldPlay: PlayEntity;
  }
) {
  let { phase, oldPlayKey, oldPlay } = action;
  if (state.phase !== phase || state[oldPlayKey] !== oldPlay) return state;
  switch (state.phase) {
    case Phases.ENTERING:
      let newPlayKey;
      if (state.newPlayKey === "play2") {
        newPlayKey = "play1";
      } else {
        newPlayKey = "play2";
      }
      return Object.assign({}, state, {
        phase: Phases.IN,
        [newPlayKey]: {},
        newPlayKey
      });
    case Phases.LEAVING:
      return Object.assign({}, state, { phase: Phases.OUT });
    case Phases.OUT:
      return Object.assign({}, state, { phase: Phases.ENTERING });
    default:
      return state;
  }
}

function playRemoveState(state: State, action: AnyAction) {
  let oldPlayKey = state.newPlayKey === "play1" ? "play2" : "play1";
  if (
    state.phase == Phases.IN &&
    (state as any)[oldPlayKey].node === action.node
  ) {
    return Object.assign({}, state, { phase: Phases.LEAVING });
  } else if (state[state.newPlayKey].node === action.node) {
    return Object.assign({}, state, { autoClearPlay: action.node });
  } else {
    return Object.assign({}, state, {
      playlist: state.playlist.filter(entity => entity.node !== action.node)
    });
  }
}

function playUpdateState(state: State, action: AnyAction) {
  let oldPlayKey = state.newPlayKey === "play1" ? "play2" : "play1";
  let { oldNode, newNode } = action;
  if ((state as any)[oldPlayKey].node === oldNode) {
    return Object.assign({}, state, { [oldPlayKey]: { node: newNode } });
  } else if (state[state.newPlayKey].node === oldNode) {
    return Object.assign({}, state, {
      [state.newPlayKey]: { node: newNode }
    });
  } else {
    let index = state.playlist.findIndex(entity => entity.node === oldNode);
    if (index > -1) {
      return Object.assign({}, state, {
        playlist: state.playlist
          .slice(0, index)
          .concat({ node: newNode })
          .concat(state.playlist.slice(index + 1))
      });
    }
    return state;
  }
}

function reducer(state = initState, action: AnyAction) {
  switch (action.type) {
    case ActionTypes.ARENA_SWITCH_ANIMATION_NEXTPHRASE:
      return nextPhaseState(state, action as any);
    case ActionTypes.ARENA_SWITCH_ANIMATION_PLAY_NEXT:
      if (state.playlist.length === 0 && state.autoClearPlay == null)
        return state;
      let newState = Object.assign({}, state);
      if (state.phase === Phases.IN) {
        newState.phase = Phases.LEAVING;
      } else if (state.phase === Phases.OUT && state.autoClearPlay != null) {
        newState.autoClearPlay = null;
      } else {
        return state;
      }
      if (state.playlist.length > 0) {
        if (state.play1.node == null && state.play2.node == null) {
          newState.phase = Phases.OUT;
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
    case ActionTypes.ARENA_SWITCH_ANIMATION_PLAY_UPDATE:
      return playUpdateState(state, action);
    default:
      return state;
  }
}

export default reducer as SceneReducer<State>;
