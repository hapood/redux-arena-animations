import { ComponentClass } from "react";
import { SceneBundle } from "redux-arena";
import { bundleToComponent } from "redux-arena/tools";
import { withRouter } from "react-router-dom";
import SwitchMotion from "./SwitchMotion";
import actions from "./actions";
import reducer from "./reducer";
import { Props } from "./types";

export default withRouter(
  bundleToComponent({
    Component: SwitchMotion,
    actions,
    reducer,
    options: {
      vReducerKey: "_arenaSwitchAnimation"
    }
  } as SceneBundle<Props>)
) as ComponentClass<Props>;

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
