import * as React from "react";
import { createMount } from "../../testUtils";
import { EnhancedStore } from "redux-arena";
import { History } from "history";
import TestHOC from "./TestHOC";
import { MountSwitchMotion } from "./types";

export default function createSwitchMotionMounter(): [
  MountSwitchMotion,
  () => void
] {
  let [mount, cleanUp] = createMount();
  let mountWithProps = (store: EnhancedStore, history: History) =>
    mount(<TestHOC store={store} history={history} />);
  return [mountWithProps, cleanUp];
}
