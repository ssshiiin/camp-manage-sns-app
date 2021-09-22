export const SAVE_GEARS = "SAVE_GEARS";
export const getSaveGearsAction = (save_gearsState) => {
  return {
    type: "SAVE_GEARS",
    payload: {
      save_gears: save_gearsState.save_gears
    }
  }
} 