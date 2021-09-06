import { type } from "jquery";

export const STORE = "STORE";
export const StoreAction = (alertState) => {
  return {
    type: "STORE",
    payload: {
      store: alertState.store,
    }
  }
}

export const SUCCESS = "SUCCESS";
export const SuccessAction = (alertState) => {
  return {
    type: "SUCCESS",
    payload: {
      success: alertState.success
    }
  }
}

export const ALERT_OPEN = "ALERT_OPEN";
export const AlertOpenAction = (alertState) => {
  return {
    type: "ALERT_OPEN",
    payload: {
      open: alertState.open
    }
  }
}