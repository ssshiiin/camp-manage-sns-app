export const GEARS = 'GEARS';
export const getGearsAction = (gearState) => {
  return {
    type: 'GEARS',
    payload: {
      gears: gearState.gears,
      countGears: gearState.countGears,
    },
  };
};

export const COUNT_GEARS = 'COUNT_GEARS';
export const CountGearsAction = (gearState) => {
  return {
    type: 'COUNT_GEARS',
    payload: {
      count_gears: gearState.count_gears,
    },
  };
};
