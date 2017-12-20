import * as React from "react";
import { EnhancedStore } from "redux-arena";
import { History } from "history";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router-dom";
import { Route, RouteProps } from "redux-arena-router";
import { SwitchMotion, switchConnCom } from "src";
import {
  initStyles,
  styleCalculators,
  numberToStyles,
  nextPhaseCheckers
} from "./switchAnimation";
import { AnimationProps } from "src";

export type TestHOCProps = {
  store: EnhancedStore;
  history: History;
};

let SwitchMotionRoute = switchConnCom(Route as React.ComponentType<
  RouteProps & AnimationProps
>);

export default class TestHOC extends React.Component<TestHOCProps> {
  render() {
    let props = this.props;
    return (
      <Provider store={props.store}>
        <Router history={props.history}>
          <SwitchMotion
            initStyles={initStyles}
            styleCalculators={styleCalculators}
            numberToStyles={numberToStyles}
            nextPhaseCheckers={nextPhaseCheckers}
          >
            <Switch>
              <SwitchMotionRoute key="1" path="/pageA">
                <div />
              </SwitchMotionRoute>
              <SwitchMotionRoute key="2" path="/pageB">
                <div />
              </SwitchMotionRoute>
            </Switch>
          </SwitchMotion>
        </Router>
      </Provider>
    );
  }
}
