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

export const CREATE_GEAR_NAME = "CREATE_GEAR_NAME"
export const CreateGearNameAction =  (gearsState) => {
  return {
    type: "CREATE_GEAR_NAME",
    payload: {
      gear_name: gearsState.gear_name,
    }
  }
}

export const CREATE_CATEGORY = "CREATE_CATEGORY"
export const CreateCategoryAction =  (gearsState) => {
  return {
    type: "CREATE_CATEGORY",
    payload: {
      gear_category: gearsState.gear_category,
    }
  }
}

export const CREATE_PURCHASED_DAY = "CREATE_PURCHASED_DAY"
export const CreatePurchasedDayAction =  (gearsState) => {
  return {
    type: "CREATE_PURCHASED_DAY",
    payload: {
      gear_purchased_day: gearsState.gear_purchased_day,
    }
  }
}

export const CREATE_BRAND = "CREATE_BRAND"
export const CreateBrandAction =  (gearsState) => {
  return {
    type: "CREATE_BRAND",
    payload: {
      gear_brand: gearsState.gear_brand,
    }
  }
}

export const CREATE_PRICE = "CREATE_PRICE"
export const CreatePriceAction =  (gearsState) => {
  return {
    type: "CREATE_PRICE",
    payload: {
      gear_price: gearsState.gear_price,
    }
  }
}

export const CREATE_AMOUNT = "CREATE_AMOUNT"
export const CreateAmountAction =  (gearsState) => {
  return {
    type: "CREATE_AMOUNT",
    payload: {
      gear_amount: gearsState.gear_amount,
    }
  }
}

export const CREATE_IMAGES = "CREATE_IMAGES"
export const CreateImagesAction =  (gearsState) => {
  return {
    type: "CREATE_IMAGES",
    payload: {
      gear_bolb_urls: gearsState.gear_bolb_urls,
      gear_image: gearsState.gear_image,
    }
  }
}

export const CREATE_ERRORS = "CREATE_ERRORS";
export const CreateErrorsAction = (gearsState) => {
  return {
    type: "CREATE_ERRORS",
    payload: {
      create_errors: gearsState.create_errors
    }
  }
}