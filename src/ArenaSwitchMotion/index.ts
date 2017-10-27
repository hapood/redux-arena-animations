import { ComponentClass } from "react";
import { SceneBundle } from "redux-arena";
import { bundleToComponent } from "redux-arena/tools";
import { withRouter } from "react-router-dom";
import ArenaSwitchMotion from "./ArenaSwitchMotion";
import actions from "./actions";
import reducer from "./reducer";
import { Props } from "./types";

export default withRouter(
  bundleToComponent({
    Component: ArenaSwitchMotion,
    actions,
    reducer,
    options: {
      vReducerKey: "_arenaSwitchAnimation"
    }
  } as SceneBundle<Props>)
) as ComponentClass<Props>;

export {
  StyleCalculators,
  InitMotionStyle,
  NextPhaseCheckers,
  NumberToStyles,
  Props
} from "./types";

export { default as AnimationPhases } from "./AnimationPhases";
