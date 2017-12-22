import {
  SFC,
  StatelessComponent,
  ReactElement,
  ReactPortal,
  ComponentClass
} from "react";
import { SceneBundle } from "redux-arena";
import { bundleToComponent } from "redux-arena/tools";
import SwitchMotion from "./SwitchMotion";
import actions from "./actions";
import reducer from "./reducer";
import state from "./state";
import Phases from "./Phases";
import PlayerStrategies from "./PlayStrategies";
import { Props } from "./types";

export default bundleToComponent({
  Component: SwitchMotion,
  state,
  actions,
  reducer,
  options: {
    vReducerKey: "_arenaSwitchAnimation"
  }
});

export {
  Actions,
  State,
  StyleCalculators,
  InitMotionStyle,
  NextPhaseCheckers,
  NumberToStyles,
  Props
} from "./types";

export { default as Phases } from "./Phases";
export { default as connectComponent } from "./connectComponent";
