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

export const CHANGE_GEAR_NAME = 'CHANGE_GEAR_NAME';
export const changeGearNameAction = (gearState) => {
  return {
    type: 'CHANGE_GEAR_NAME',
    payload: {
      gearName: gearState.gearName,
    },
  };
};

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const changeCategoryAction = (gearState) => {
  return {
    type: 'CHANGE_CATEGORY',
    payload: {
      category: gearState.category,
    },
  };
};

export const CHANGE_PURCHASED_DAY = 'CHANGE_PURCHASED_DAY';
export const changePurchasedDayAction = (gearState) => {
  return {
    type: 'CHANGE_PURCHASED_DAY',
    payload: {
      purchasedDay: gearState.purchasedDay,
    },
  };
};

export const CHANGE_BRAND = 'CHANGE_BRAND';
export const changeBrandAction = (gearState) => {
  return {
    type: 'CHANGE_BRAND',
    payload: {
      brand: gearState.brand,
    },
  };
};

export const CHANGE_PRICE = 'CHANGE_PRICE';
export const changePriceAction = (gearState) => {
  return {
    type: 'CHANGE_PRICE',
    payload: {
      price: gearState.price,
    },
  };
};

export const CHANGE_AMOUNT = 'CHANGE_AMOUNT';
export const changeAmountAction = (gearState) => {
  return {
    type: 'CHANGE_AMOUNT',
    payload: {
      amount: gearState.amount,
    },
  };
};

export const CHANGE_IMAGE = 'CHANGE_IMAGE';
export const changeImageAction = (gearState) => {
  return {
    type: 'CHANGE_IMAGE',
    payload: {
      bolbUrl: gearState.bolbUrl,
      image: gearState.image,
    },
  };
};

export const CATCH_ERRORS = 'CATCH_ERRORS';
export const catchErrorsAction = (gearState) => {
  return {
    type: 'CATCH_ERRORS',
    payload: {
      errors: gearState.errors,
    },
  };
};
