import * as React from "react";
import { EnhancedStore } from "redux-arena";
import { History } from "history";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router-dom";
import { ArenaRoute } from "redux-arena-router";
import { ArenaSwitchMotion } from "src";
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
          <ArenaSwitchMotion
            initStyles={initStyles}
            styleCalculators={styleCalculators}
            numberToStyles={numberToStyles}
            nextPhaseCheckers={nextPhaseCheckers}
          >
            <Switch>
              <ArenaRoute key="1" path="/pageA">
                <div />
              </ArenaRoute>
              <ArenaRoute key="2" path="/pageB">
                <div />
              </ArenaRoute>
            </Switch>
          </ArenaSwitchMotion>
        </Router>
      </Provider>
    );
  }
}
