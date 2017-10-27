import * as React from "react";
import { TransitionMotion } from "react-motion";
import AnimationPhases from "./AnimationPhases";
import { calcKeys, buildStyleCalculator, isCurPhaseEnd } from "./utils";
import {
  ConnectedProps,
  State,
  ExtendedMotionStyle,
  CombinedStyleCalculator
} from "./types";

export type InnerState = {
  initStyles: ExtendedMotionStyle[];
  styleCalculator: CombinedStyleCalculator;
  playElement: React.ReactElement<{}> | null;
  oldPlayKey: "play1" | "play2";
  newPlayKey: "play1" | "play2";
};

export default class ArenaSwitchAnimation extends React.Component<
  ConnectedProps,
  InnerState
> {
  componentWillMount() {
    this.props.actions.playNext();
    let state = {
      initStyles: (this.props.initStyles as ExtendedMotionStyle[]).concat({
        key: "nextPhase",
        style: { phase: AnimationPhases.IN }
      })
    } as InnerState;
    Object.assign(state, calcKeys(this.props.newPlayKey));
    state.styleCalculator = buildStyleCalculator(
      this.props.styleCalculators,
      this.props.phase,
      this.props.nextPhaseCheckers,
      phase =>
        setImmediate(() =>
          this.props.actions.nextPhase(
            phase,
            state.oldPlayKey,
            this.props[state.oldPlayKey]
          )
        )
    );
    this.setState(state);
  }

  componentWillReceiveProps(nextProps: ConnectedProps) {
    let state: InnerState = Object.assign({}, this.state);
    if (nextProps.newPlayKey !== this.props.newPlayKey) {
      Object.assign(state, calcKeys(nextProps.newPlayKey));
    }
    if (
      nextProps.actions !== this.props.actions ||
      nextProps.phase !== this.props.phase ||
      nextProps.newPlayKey !== this.props.newPlayKey ||
      nextProps.styleCalculators !== this.props.styleCalculators ||
      nextProps.nextPhaseCheckers !== this.props.nextPhaseCheckers
    ) {
      state.styleCalculator = buildStyleCalculator(
        nextProps.styleCalculators,
        nextProps.phase,
        nextProps.nextPhaseCheckers,
        phase =>
          setImmediate(() =>
            nextProps.actions.nextPhase(
              phase,
              state.oldPlayKey,
              nextProps[state.oldPlayKey]
            )
          )
      );
    }
    if (nextProps.initStyles !== this.props.initStyles) {
      let nextPhaseStyle: any = this.state.initStyles.find(
        style => style.key === "nextPhase"
      );
      state.initStyles = (nextProps.initStyles as ExtendedMotionStyle[]).concat(
        nextPhaseStyle
      );
    }
    this.setState(state);
    if (
      nextProps.phase === AnimationPhases.IN &&
      nextProps.playlist.length > 0
    ) {
      nextProps.actions.playNext();
    } else if (
      nextProps.phase === AnimationPhases.OUT &&
      nextProps.autoClearPlay
    ) {
      nextProps.actions.playNext();
    }
  }

  render() {
    let { phase, numberToStyles } = this.props;
    let { newPlayKey, oldPlayKey, initStyles, styleCalculator } = this.state;
    return (
      <TransitionMotion defaultStyles={initStyles} styles={styleCalculator}>
        {interpolatedStyles => {
          let containerStyle, newPlayStyle, oldPlayStyle;
          let animationPhase: AnimationPhases = (interpolatedStyles.find(
            styleObj => styleObj.key === "nextPhase"
          ) as any).style.phase;
          interpolatedStyles.forEach(styleObj => {
            let { key, style } = styleObj;
            switch (key) {
              case "container":
                containerStyle = numberToStyles.container(style, phase);
                break;
              case "oldPlay":
                oldPlayStyle = numberToStyles.oldPlay(style, phase);
                break;
              case "newPlay":
                newPlayStyle = numberToStyles.newPlay(style, phase);
                break;
            }
          });
          return (
            <div style={containerStyle}>
              {this.props.children}
              <div key={oldPlayKey} style={oldPlayStyle}>
                {this.props[oldPlayKey].element}
              </div>
              {animationPhase === AnimationPhases.IN ? null : (
                <div key={newPlayKey} style={newPlayStyle}>
                  {this.props[newPlayKey].element}
                </div>
              )}
            </div>
          );
        }}
      </TransitionMotion>
    );
  }
}
