import { spring, presets } from "react-motion";
import {
  Phases,
  InitMotionStyle,
  StyleCalculators,
  NextPhaseCheckers,
  NumberToStyles
} from "src/SwitchMotion";

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
  container: (style, phase) => style,
  oldPlay: (style, phase) => {
    if (phase === Phases.IN) {
      return {
        left: 0,
        opacity: 1
      };
    } else if (phase === Phases.LEAVING) {
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
  newPlay: (style, phase) => {
    if (phase === Phases.ENTERING) {
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
  oldPlay: style => {
    if (style.phase === Phases.LEAVING && style.opacity < 0.3) {
      return true;
    }
    if (style.phase === Phases.OUT) {
      return true;
    }
    return false;
  },
  newPlay: style => {
    if (style.phase === Phases.ENTERING && style.opacity === 1) {
      return true;
    }
    return false;
  }
};

export const numberToStyles: NumberToStyles = {
  container: (style, phase) => ({}),
  oldPlay: (style, phase) => ({}),
  newPlay: (style, phase) => ({})
};
