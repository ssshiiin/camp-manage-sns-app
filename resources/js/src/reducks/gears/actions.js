export const GEARS = "GEARS";
export const  GearsAction = (gearsState) => {
  return {
    type: "GEARS",
    payload: {
      gears: gearsState.gears
    }
  }
}