import { ReactWrapper } from "enzyme";
import { EnhancedStore } from "redux-arena";
import { History } from "history";

export type MountSwitchMotion = (
  store: EnhancedStore,
  sceneBundle: History
) => ReactWrapper;
