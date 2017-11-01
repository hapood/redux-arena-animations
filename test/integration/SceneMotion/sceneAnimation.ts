import { spring, presets } from "react-motion";
import {
  Phases,
  StyleCalculators,
  NextPhaseCheckers,
  NumberToStyles,
  InitMotionStyle
} from "src/SceneMotion";

export const initStyles: InitMotionStyle[] = [
  {
    key: "container",
    style: {}
  },
  {
    key: "loadingPlay",
    style: {}
  },
  {
    key: "scenePlay",
    style: {
      opacity: 0
    }
  }
];

export const styleCalculators: StyleCalculators = {
  container: (style, phase) => style,
  loadingPlay: (style, phase) => style,
  scenePlay: (style, phase) => {
    if (phase === Phases.LOADING) {
      return {
        opacity: 0
      };
    } else {
      return {
        opacity: 1
      };
    }
  }
};

export const nextPhaseCheckers: NextPhaseCheckers = {
  container: () => false,
  loadingPlay: (style, isSceneReady) => {
    if (style.phase === Phases.LOADING && isSceneReady === true) return true;
    return false;
  },
  scenePlay: style => {
    if (style.phase === Phases.ENTERING && style.opacity === 1) return true;
    if (style.phase !== Phases.LOADING && style.phase !== Phases.ENTERING) {
      return true;
    }
    return false;
  }
};

export const numberToStyles: NumberToStyles = {
  container: (style, phase, isSceneReady) => ({}),
  loadingPlay: (style, phase, isSceneReady) => ({}),
  scenePlay: (style, phase, isSceneReady) => ({})
};
