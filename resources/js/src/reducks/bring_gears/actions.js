export const BRING_GEARS = "BRING_GEARS";
export const BringGearsActions = (bring_gearsState) => {
  return {
    type: "BRING_GEARS",
    payload: {
      bring_gears: bring_gearsState.bring_gears
    }
  }
}

export const ADD_GEARS = "ADD_GEARS";
export const AddGearsActions = (bring_gearsState) => {
  return {
    type: "ADD_GEARS",
    payload: {
      add_gears: bring_gearsState.add_gears
    }
  }
}

export const BRING_COUNT_ALL = "BRING_COUNT_ALL";
export const BringCountAllActions = (bring_gearsState) => {
  return {
    type: "BRING_COUNT_ALL",
    payload: {
      count_all: bring_gearsState.count_all
    }
  }
}

export const ADD_COUNT_ALL = "ADD_COUNT_ALL";
export const AddCountAllActions = (bring_gearsState) => {
  return {
    type: "ADD_COUNT_ALL",
    payload: {
      count_add_all: bring_gearsState.count_add_all
    }
  }
}