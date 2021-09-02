export const GEARS = "GEARS";
export const  GearsAction = (gearsState) => {
  return {
    type: "GEARS",
    payload: {
      gears: gearsState.gears
    }
  }
}

export const COUNT_GEARS = "COUNT_GEARS";
export const CountGearsAction = (gearsState) => {
  return {
    type: "COUNT_GEARS",
    payload: {
      count_gears: gearsState.count_gears
    }
  }
}