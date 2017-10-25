import { ReactWrapper } from "enzyme";
import { EnhancedStore, SceneBundle, SceneBundleThunk } from "redux-arena";

export type MountBundleThunk = (
  store: EnhancedStore,
  sceneBundleThunk: SceneBundleThunk
) => ReactWrapper;
