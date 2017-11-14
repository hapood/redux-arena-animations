import * as React from "react";
import { Provider } from "react-redux";
import { SceneMotion } from "src";
import { EnhancedStore } from "redux-arena";
import { bundleToElement } from "redux-arena/tools";
import * as sceneAnimation from "./sceneAnimation";
import { SceneBundleThunk } from "src/SceneMotion";

export type TestHOCProps = {
  store: EnhancedStore;
  sceneBundleThunk: SceneBundleThunk;
  reducerKey?: string;
  vReducerKey?: string;
};

export default class TestHOC extends React.Component<TestHOCProps> {
  render() {
    let props = this.props;
    let ProviderA = Provider as any;
    return (
      <ProviderA store={props.store}>
        <SceneMotion
          sceneBundleThunk={props.sceneBundleThunk}
          loadingPlay={<div />}
          initStyles={sceneAnimation.initStyles}
          styleCalculators={sceneAnimation.styleCalculators}
          numberToStyles={sceneAnimation.numberToStyles}
          nextPhaseCheckers={sceneAnimation.nextPhaseCheckers}
        >
          {bundle =>
            bundleToElement(
              Object.assign({}, bundle, {
                options: { reducerKey: "bundle" }
              })
            )
          }
        </SceneMotion>
      </ProviderA>
    );
  }
}
