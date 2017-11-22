import * as React from "react";
import { EnhancedStore } from "redux-arena";
import { History } from "history";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router-dom";
import { Route } from "redux-arena-router";
import { SwitchMotion } from "src";
import {
  initStyles,
  styleCalculators,
  numberToStyles,
  nextPhaseCheckers
} from "./switchAnimation";

export type TestHOCProps = {
  store: EnhancedStore;
  history: History;
};

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
              <Route key="1" path="/pageA">
                <div />
              </Route>
              <Route key="2" path="/pageB">
                <div />
              </Route>
            </Switch>
          </SwitchMotion>
        </Router>
      </Provider>
    );
  }
}
