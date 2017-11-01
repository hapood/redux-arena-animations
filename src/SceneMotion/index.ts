import { SFC } from "react";
import { bundleToComponent } from "redux-arena/tools";
import SceneMotion from "./SceneMotion";
import actions from "./actions";
import saga from "./saga";
import reducer from "./reducer";
import state from "./state";
import { State, Props } from "./types";

export default bundleToComponent({
  Component: SceneMotion,
  actions,
  reducer,
  saga,
  state,
  propsPicker: (state: State, actions, allState, { _arenaScene }) => ({
    ...state,
    actions,
    reducerKey: _arenaScene.reducerKey
  }),
  options: {
    vReducerKey: "_arenaSceneAnimation"
  }
}) as SFC<Props>;

export {
  State,
  Actions,
  StyleCalculators,
  NextPhaseCheckers,
  NumberToStyles,
  InitMotionStyle,
  Props
} from "./types";

export { default as Phases } from "./Phases";
