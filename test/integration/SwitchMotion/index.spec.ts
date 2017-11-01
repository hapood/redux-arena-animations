import { ReactWrapper } from "enzyme";
import { expect } from "chai";
import { spy } from "sinon";
import createSwitchMotionMounter from "./createSwitchMotionMounter";
import { Phases } from "src/SwitchMotion";
import { createArenaStore, EnhancedStore } from "redux-arena";
import { History } from "history";
import createHistory from "history/createBrowserHistory";
import { MountSwitchMotion } from "./types";

function selectAnimationState(allStates: any): any {
  let animationState;
  Object.keys(allStates).forEach(key => {
    if (allStates[key].phase != null) {
      animationState = allStates[key];
    }
  });
  return animationState;
}

describe("<ArenaSceneMotion /> integration", () => {
  let store: EnhancedStore,
    wrapper: ReactWrapper,
    mount: MountSwitchMotion,
    cleanUp: () => void,
    history: History;

  before(() => {
    history = createHistory();
    [mount, cleanUp] = createSwitchMotionMounter();
    store = createArenaStore();
  });

  after(() => {
    cleanUp();
    store.close();
  });

  it("should loop phase correctly", () => {
    let queue = [Phases.OUT, Phases.IN];
    wrapper = mount(store, history);
    let flagPromise = new Promise(resolve => {
      let unsubscribe = store.subscribe(() => {
        let animationState = selectAnimationState(store.getState());
        if (queue.length > 0) {
          if (animationState && queue[0] === animationState.phase) {
            queue.shift();
          }
        } else {
          unsubscribe();
          resolve(true);
        }
      });
    });
    history.push("/pageA");
    return flagPromise;
  });
});
