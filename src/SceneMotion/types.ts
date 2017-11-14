import {
  SpringHelperConfig,
  TransitionPlainStyle,
  TransitionStyle,
  Style,
  PlainStyle
} from "react-motion";
import Phases from "./Phases";

export type SceneBundleThunk = () => Promise<any>;

export type StyleCalculator = (style: PlainStyle, phase: Phases) => Style;

export type StyleCalculators = {
  container: StyleCalculator;
  loadingPlay: StyleCalculator;
  scenePlay: StyleCalculator;
};

export type NextPhaseChecker = (
  style: PlainStyle,
  isSceneReady: boolean
) => boolean | null | undefined;

export type NextPhaseCheckers = {
  container: NextPhaseChecker;
  loadingPlay: NextPhaseChecker;
  scenePlay: NextPhaseChecker;
};
export type StyleKeys = "container" | "loadingPlay" | "scenePlay";
export interface InitMotionStyle extends TransitionPlainStyle {
  key: StyleKeys;
}

export type NumberToStyle = (
  style: PlainStyle,
  phase: Phases,
  isSceneReady: boolean
) => { [key: string]: string };

export type NumberToStyles = {
  container: NumberToStyle;
  loadingPlay: NumberToStyle;
  scenePlay: NumberToStyle;
};

export type Props = {
  loadingPlay: React.ReactNode;
  sceneBundleThunk: SceneBundleThunk;
  children: (bundle: any) => React.ReactNode;
  initStyles: InitMotionStyle[];
  styleCalculators: StyleCalculators;
  nextPhaseCheckers: NextPhaseCheckers;
  numberToStyles: NumberToStyles;
};

export type Actions = {
  setState: (state: State) => void;
  nextPhase: (phase: Phases) => void;
  startLeaving: () => void;
  loadSceneBundle: (sceneBundleThunk: SceneBundleThunk) => void;
};

export type ConnectedProps = {
  actions: Actions;
} & Props &
  State;

export type State = {
  isSceneReady: boolean;
  phase: Phases;
  bundle: any | null;
};

export type ExtendedStyleKeys = StyleKeys | "nextPhase";

export interface ExtendedMotionStyle extends TransitionPlainStyle {
  key: StyleKeys | "nextPhase";
}

export interface ExtendedPlainMotionStyle extends TransitionPlainStyle {
  key: StyleKeys | "nextPhase";
}

export type CombinedStyleCalculator = (
  prevStyles: ExtendedPlainMotionStyle[]
) => ExtendedMotionStyle[];
