import { ReactWrapper } from "enzyme";
import { EnhancedStore, SceneBundle } from "redux-arena";
import { SceneBundleThunk } from "src/SceneMotion";

export type MountBundleThunk = (
  store: EnhancedStore,
  sceneBundleThunk: SceneBundleThunk
) => ReactWrapper;
