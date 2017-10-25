import { spring, presets, PlainStyle } from "react-motion";
import {
  AnimationPhases,
  InitMotionStyle,
  StyleCalculators,
  NextPhaseCheckers,
  NumberToStyles
} from "src/ArenaSwitchMotion";

export const initStyles: InitMotionStyle[] = [
  {
    key: "container",
    style: {}
  },
  {
    key: "oldPlay",
    style: {
      opacity: 1,
      left: 0
    }
  },
  {
    key: "newPlay",
    style: {
      opacity: 0,
      left: 15
    }
  }
];

export const styleCalculators: StyleCalculators = {
  container: (style: PlainStyle, phase: AnimationPhases) => style,
  oldPlay: (style: PlainStyle, phase: AnimationPhases) => {
    if (phase === AnimationPhases.IN) {
      return {
        left: 0,
        opacity: 1
      };
    } else if (phase === AnimationPhases.LEAVING) {
      return {
        opacity: spring(0, presets.stiff),
        left: spring(-15, presets.stiff)
      };
    } else {
      return {
        left: 0,
        opacity: 0
      };
    }
  },
  newPlay: (style: PlainStyle, phase: AnimationPhases) => {
    if (phase === AnimationPhases.ENTERING) {
      return {
        opacity: spring(1, presets.stiff),
        left: spring(0, presets.stiff)
      };
    } else {
      return {
        opacity: 0,
        left: 15
      };
    }
  }
};

export const nextPhaseCheckers: NextPhaseCheckers = {
  container: () => false,
  oldPlay: (style: PlainStyle) => {
    if (style.phase === AnimationPhases.LEAVING && style.opacity < 0.3) {
      return true;
    }
    if (style.phase === AnimationPhases.OUT) {
      return true;
    }
    return false;
  },
  newPlay: (style: PlainStyle) => {
    if (style.phase === AnimationPhases.ENTERING && style.opacity === 1) {
      return true;
    }
    return false;
  }
};

export const numberToStyles: NumberToStyles = {
  container: (style: PlainStyle, phase: AnimationPhases) => ({}),
  oldPlay: (style: PlainStyle, phase: AnimationPhases) => ({}),
  newPlay: (style: PlainStyle, phase: AnimationPhases) => ({})
};
