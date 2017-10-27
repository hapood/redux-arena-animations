import { ReactElement } from "react";
import {
  SpringHelperConfig,
  TransitionPlainStyle,
  TransitionStyle,
  Style,
  PlainStyle
} from "react-motion";
import AnimationPhases from "./AnimationPhases";
import PlayStrategies from "./PlayStrategies";

export type StyleCalculator = (
  style: PlainStyle,
  phase: AnimationPhases
) => Style;

export type StyleCalculators = {
  container: StyleCalculator;
  oldPlay: StyleCalculator;
  newPlay: StyleCalculator;
};

export type StyleKeys = "container" | "oldPlay" | "newPlay";
export interface InitMotionStyle extends TransitionPlainStyle {
  key: StyleKeys;
}

export type NumberToStyle = (
  style: PlainStyle,
  phase: AnimationPhases
) => { [key: string]: string };

export type NumberToStyles = {
  container: NumberToStyle;
  oldPlay: NumberToStyle;
  newPlay: NumberToStyle;
};

export type NextPhaseChecker = (
  style: PlainStyle
) => boolean | null | undefined;

export type NextPhaseCheckers = {
  container: NextPhaseChecker;
  oldPlay: NextPhaseChecker;
  newPlay: NextPhaseChecker;
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

export type Props = {
  children: ReactElement<{}>;
  initStyles: InitMotionStyle[];
  styleCalculators: StyleCalculators;
  nextPhaseCheckers: NextPhaseCheckers;
  numberToStyles: NumberToStyles;
};

export type ConnectedProps = {
  actions: {
    setState: (state: State) => void;
    nextPhase: (
      phase: AnimationPhases,
      oldPlayKey: string,
      oldPlay: PlayEntity
    ) => void;
    playNext: (PlayStrategies?: PlayStrategies) => void;
  };
} & Props &
  State;

export type PlayEntity = { element?: ReactElement<{}> | null | undefined };

export type State = {
  play1: PlayEntity;
  play2: PlayEntity;
  newPlayKey: "play1" | "play2";
  playlist: Array<PlayEntity>;
  autoClearPlay: PlayEntity | null;
  phase: AnimationPhases;
};
