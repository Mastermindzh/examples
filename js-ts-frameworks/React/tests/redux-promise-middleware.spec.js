import { PENDING, FULFILLED, REJECTED } from "redux-promise-middleware";

export default function handleReduxPromiseMiddleware(
  reducer,
  actionType,
  initialState,
  statusKey,
  meta = {}
) {
  it(`should handle ${PENDING} (redux-promise-middleware)`, () => {
    let taintedState = Object.assign({}, initialState);
    taintedState[statusKey] = "TAINTED";

    const pendingAction = {
      type: `${actionType}_${PENDING}`,
      payload: PENDING,
      meta: meta,
    };

    expect(reducer(taintedState, pendingAction)[statusKey]).toEqual(PENDING);
  });

  it(`should handle ${REJECTED} (redux-promise-middleware)`, () => {
    let taintedState = Object.assign({}, initialState);
    taintedState[statusKey] = "TAINTED";

    const rejectAction = {
      type: `${actionType}_${REJECTED}`,
      payload: REJECTED,
      meta: meta,
    };

    expect(reducer(taintedState, rejectAction)[statusKey]).toEqual(REJECTED);
  });

  it(`should handle ${FULFILLED} (redux-promise-middleware)`, () => {
    let taintedState = Object.assign({}, initialState);
    taintedState[statusKey] = "TAINTED";

    const fulfillAction = {
      type: `${actionType}_${FULFILLED}`,
      payload: FULFILLED,
      meta: meta,
    };

    expect(reducer(taintedState, fulfillAction)[statusKey]).toEqual(FULFILLED);
  });
}

/**
USAGE:
import {
  handleReduxPromiseMiddleware
} from "redux-promise-middleware.spec.js";
handleReduxPromiseMiddleware(
  reducer,
  "ACTION_KEY",
  initialState,
  "status", {
    data: {
      access_token: "",
      token_type: ""
    }
  }
);
**/
