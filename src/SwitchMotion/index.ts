import { SFC, StatelessComponent } from "react";
import { SceneBundle } from "redux-arena";
import { bundleToComponent } from "redux-arena/tools";
import { withRouter } from "react-router-dom";
import SwitchMotion from "./SwitchMotion";
import actions from "./actions";
import reducer from "./reducer";
import state from "./state";
import { Props } from "./types";

export default (withRouter(
  bundleToComponent({
    Component: SwitchMotion,
    state,
    actions,
    reducer,
    options: {
      vReducerKey: "_arenaSwitchAnimation"
    }
  })
) as any) as SFC<Props>;

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
