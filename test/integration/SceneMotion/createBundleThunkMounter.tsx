import * as React from "react";
import { createMount } from "../../testUtils";
import { EnhancedStore } from "redux-arena";
import { MountBundleThunk } from "./types";
import TestHOC from "./TestHOC";
import { SceneBundleThunk } from "src/SceneMotion";

export default function createBundleMounter(): [MountBundleThunk, () => void] {
  let [mount, cleanUp] = createMount();
  let mountWithProps = (
    store: EnhancedStore,
    sceneBundleThunk: SceneBundleThunk
  ) => mount(<TestHOC store={store} sceneBundleThunk={sceneBundleThunk} />);
  return [mountWithProps, cleanUp];
}
