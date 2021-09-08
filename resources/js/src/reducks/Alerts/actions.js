export const STORE = "STORE";
export const StoreAction = (alertsState) => {
  return {
    type: "STORE",
    payload: {
      store: alertsState.store,
    }
  }
}

export const SUCCESS = "SUCCESS";
export const SuccessAction = (alertsState) => {
  return {
    type: "SUCCESS",
    payload: {
      success: alertsState.success
    }
  }
}

export const ALERT_OPEN = "ALERT_OPEN";
export const AlertOpenAction = (alertsState) => {
  return {
    type: "ALERT_OPEN",
    payload: {
      open: alertsState.open
    }
  }
}