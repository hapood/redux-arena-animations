import Phases from "./Phases";
import {
  TransitionPlainStyle,
  TransitionStyle,
  PlainStyle,
  Style
} from "react-motion";
import {
  CombinedStyleCalculator,
  StyleCalculators,
  StyleCalculator,
  NextPhaseCheckers,
  ExtendedPlainMotionStyle,
  ExtendedMotionStyle
} from "./types";

export function isCurPhaseEnd(
  prevStyles: ExtendedPlainMotionStyle[],
  nextPhaseCheckers: NextPhaseCheckers
) {
  return prevStyles.find(styleObj => {
    let { key, style } = styleObj;
    switch (key) {
      case "container":
        return nextPhaseCheckers.container
          ? nextPhaseCheckers.container(style) === true ? true : false
          : false;
      case "oldPlay":
        return nextPhaseCheckers.oldPlay
          ? nextPhaseCheckers.oldPlay(style) === true ? true : false
          : false;
      case "newPlay":
        return nextPhaseCheckers.newPlay
          ? nextPhaseCheckers.newPlay(style) === true ? true : false
          : false;
      default:
        return false;
    }
  }) == null
    ? false
    : true;
}

function calcStyle(
  style: PlainStyle,
  phase: Phases,
  calculator: StyleCalculator
): Style {
  return Object.assign({}, calculator ? calculator(style, phase) : style, {
    phase
  });
}

export function buildStyleCalculator(
  styleCalculators: StyleCalculators,
  phase: Phases,
  nextPhaseCheckers: NextPhaseCheckers,
  nextPhase: (curPhase: Phases) => void
): CombinedStyleCalculator {
  return function(prevStyles: ExtendedPlainMotionStyle[]) {
    return <ExtendedMotionStyle[]>prevStyles.map(styleObj => {
      let { key, style } = styleObj;
      switch (key) {
        case "container":
          return {
            key: "container",
            style: calcStyle(style, phase, styleCalculators.container)
          };
        case "oldPlay":
          return {
            key: "oldPlay",
            style: calcStyle(style, phase, styleCalculators.oldPlay)
          };
        case "newPlay":
          return {
            key: "newPlay",
            style: calcStyle(style, phase, styleCalculators.newPlay)
          };
        case "nextPhase":
          if (isCurPhaseEnd(prevStyles, nextPhaseCheckers)) {
            nextPhase(style.phase);
          }
          return {
            key: "nextPhase",
            style: {
              phase
            }
          } as ExtendedPlainMotionStyle;
        default:
          return styleObj;
      }
    });
  };
}

export function calcKeys(newPlayKey: "play1" | "play2") {
  if (newPlayKey === "play2")
    return {
      newPlayKey,
      oldPlayKey: "play1"
    };
  else
    return {
      newPlayKey,
      oldPlayKey: "play2"
    };
}
