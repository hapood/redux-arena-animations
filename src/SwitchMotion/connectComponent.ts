import { ComponentType, ReactNode, Component, StatelessComponent } from "react";
import { StateDict, ActionsDict, DefaultSceneActions } from "redux-arena";
import { bundleToComponent } from "redux-arena";
import { Route } from "redux-arena-router";
import { Actions } from "./types";
import { AnimationProps } from "../types";

function propsPicker(
  _: StateDict<{}>,
  {
    _arenaScene: actions,
    _arenaSwitchAnimation: animationActions
  }: ActionsDict<
    DefaultSceneActions,
    {
      _arenaSwitchAnimation: Actions;
    }
  >
) {
  return {
    actions,
    isAnimationOn: true,
    addPlay: animationActions.addPlay,
    removePlay: animationActions.removePlay
  };
}

export default function connectComponent<P extends AnimationProps>(
  Component: ComponentType<P>
) {
  return bundleToComponent({
    Component,
    propsPicker: (
      _: StateDict<{}>,
      {
        _arenaScene: actions,
        _arenaSwitchAnimation: animationActions
      }: ActionsDict<
        DefaultSceneActions,
        {
          _arenaSwitchAnimation: Actions;
        }
      >
    ) => {
      return {
        isRenderDisabled: true,
        onMount: animationActions.addPlay,
        onUnmount: animationActions.removePlay,
        onUpdate: animationActions.updatePlay
      };
    }
  });
}
