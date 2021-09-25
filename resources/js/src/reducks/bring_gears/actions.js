export const GET_BRINGS = "GET_BRINGS";
export const getBringsAction = (bring_gears_state) => {
  return {
    type: "GET_BRINGS",
    payload: {
      brings: bring_gears_state.brings,
      brings_count_all: bring_gears_state.brings_count_all,
      brings_count_true: bring_gears_state.brings_count_true,
      not_brings: bring_gears_state.not_brings,
      not_brings_count_all: bring_gears_state.not_brings_count_all,
      not_brings_count_true: bring_gears_state.not_brings_count_true,
    }
  }
}

export const UPDATE_BRINGS = "UPDATE_BRINGS";
export const updateBringAction = (bring_gears_state) => {
  return {
    type: "UPDATE_BRINGS",
    payload: {
      brings: bring_gears_state.brings,
      brings_count_all: bring_gears_state.brings_count_all,
      brings_count_true: bring_gears_state.brings_count_true,
    }
  }
}

export const UPDATE_NOT_BRINGS = "UPDATE_NOT_BRINGS";
export const updateNotBringAction = (bring_gears_state) => {
  return {
    type: "UPDATE_NOT_BRINGS",
    payload: {
      not_brings: bring_gears_state.not_brings,
      not_brings_count_all: bring_gears_state.not_brings_count_all,
      not_brings_count_true: bring_gears_state.not_brings_count_true,
    }
  }
}