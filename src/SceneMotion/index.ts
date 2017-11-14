import { StatelessComponent } from "react";
import { bundleToComponent } from "redux-arena";
import SceneMotion from "./SceneMotion";
import actions from "./actions";
import saga from "./saga";
import reducer from "./reducer";
import state from "./state";
import { State, Actions, Props } from "./types";

export default bundleToComponent({
  Component: SceneMotion,
  actions,
  reducer,
  saga,
  state,
  options: {
    vReducerKey: "_arenaSceneAnimation"
  }
});

export {
  State,
  Actions,
  StyleCalculators,
  NextPhaseCheckers,
  NumberToStyles,
  InitMotionStyle,
  Props,
  SceneBundleThunk
} from "./types";

export { default as Phases } from "./Phases";
