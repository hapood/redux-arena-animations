import { ForkEffect } from "redux-saga/effects";
import { takeLatestSceneAction, setSceneState } from "redux-arena/effects";
import ActionTypes from "./ActionTypes";
import Phases from "./Phases";
import { SceneBundleThunk } from "./types";
/**
 * The asynchronous loading function of the scene,
 * and finally the synchronous load function
 *
 * @param {any} { arenaReducerDict, asyncSceneBundle }
 * @returns
 */
function* loadSceneBundle({
  sceneBundleThunk
}: {
  sceneBundleThunk: SceneBundleThunk;
}) {
  yield setSceneState({
    isSceneReady: false,
    phase: Phases.LOADING,
    bundle: null
  });
  let bundleModule = yield sceneBundleThunk();
  let bundle = bundleModule.default ? bundleModule.default : bundleModule;
  yield setSceneState({
    isSceneReady: true,
    bundle
  });
}

export default function*() {
  yield takeLatestSceneAction(
    ActionTypes.ARENA_SCENE_ANIMATION_LOAD_BUNDLE,
    loadSceneBundle
  );
}
