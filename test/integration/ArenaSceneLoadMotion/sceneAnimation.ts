import { spring, presets } from "react-motion";
import {
  LoadMotionPhase,
  StyleCalculators,
  NextPhaseCheckers,
  NumberToStyles,
  InitMotionStyle
} from "redux-arena";

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
    if (phase === LoadMotionPhase.LOADING) {
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
    if (style.phase === LoadMotionPhase.LOADING && isSceneReady === true)
      return true;
    return false;
  },
  scenePlay: style => {
    if (style.phase === LoadMotionPhase.ENTERING && style.opacity === 1)
      return true;
    if (
      style.phase !== LoadMotionPhase.LOADING &&
      style.phase !== LoadMotionPhase.ENTERING
    ) {
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
