import { ReactNode } from "react";
import ArenaActionTypes from "redux-arena/ActionTypes";
import ActionTypes from "./ActionTypes";
import Phases from "./Phases";
import { State, PlayEntity } from "./types";
import PlayStrategies from "./PlayStrategies";

export function setState(state: State) {
  return {
    type: ArenaActionTypes.ARENA_SCENE_SET_STATE,
    state
  };
}

export function nextPhase(
  phase: Phases,
  oldPlayKey: string,
  oldPlay: PlayEntity
) {
  return {
    type: ActionTypes.ARENA_SWITCH_ANIMATION_NEXTPHRASE,
    phase,
    oldPlayKey,
    oldPlay
  };
}

export function addPlay(node: ReactNode) {
  return {
    type: ActionTypes.ARENA_SWITCH_ANIMATION_PLAY_ADD,
    entity: {
      node
    }
  };
}

export function removePlay(node: ReactNode) {
  return {
    type: ActionTypes.ARENA_SWITCH_ANIMATION_PLAY_REMOVE,
    node
  };
}

export function playNext(PlayStrategies?: PlayStrategies) {
  return {
    type: ActionTypes.ARENA_SWITCH_ANIMATION_PLAY_NEXT,
    PlayStrategies
  };
}

export default { setState, nextPhase, addPlay, removePlay, playNext };
