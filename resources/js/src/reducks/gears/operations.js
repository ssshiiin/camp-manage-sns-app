import axios from "axios";
import { push } from "connected-react-router";
import moment from "moment";
import { AlertOpenAction, StoreAction, SuccessAction } from "../alerts/actions";
import { ModalGearCreateAction } from "../modals/actions";
import { MenuAction } from "../users/actions";
import { CountGearsAction, CreateAmountAction, CreateBrandAction, CreateCategoryAction, CreateErrorsAction, CreateGearNameAction, CreateImagesAction, CreatePriceAction, CreatePurchasedDayAction, GearsAction } from "./actions";

export const getGears = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getGears");
    const url = `/api/gears/category/${user_id}`;

    const response = await axios.get(url)
      .catch((err) => {console.log(err)});

    dispatch(GearsAction({
      gears: response.data.data
    }))
  }
}

//Gearを編集するために各項目をstateに保存する
export const getShowGears = (gear_id) => {
  return async (dispatch, getState) => {
    console.log("getShowGears");
    const url = `/api/gears/show/${gear_id}`;

    const response = await axios.get(url)
      .catch((err) => {console.log(err)});


    dispatch(CreateGearNameAction({
      gear_name: response.data.data.gear_name
    }))

    dispatch(CreateCategoryAction({
      gear_category: response.data.data.category
    }))

    dispatch(CreateBrandAction({
      gear_brand: response.data.data.brand
    }))

    dispatch(CreateAmountAction({
      gear_amount: response.data.data.amount
    }))

    dispatch(CreatePriceAction({
      gear_price: response.data.data.price
    }))

    dispatch(CreatePurchasedDayAction({
      gear_purchased_day: response.data.data.purchased_day
    }))

    dispatch(CreateImagesAction({
      gear_bolb_urls: [response.data.data.image_path[0].image_path]
    }))
  }
}

export const getCountGears = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getCountGears");
    const url = `/api/count/gears/${user_id}`;

    const response = await axios.get(url)
      .catch((err) => {console.log(err)});

    dispatch(CountGearsAction({
      count_gears: response.data
    }))
  }
}

export const createGear = () => {
  return async (dispatch, getState) => {
    console.log("createGear");
    const state = getState();
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const gear_name = state.gears.gear_name;
    const category = state.gears.gear_category
    const day = state.gears.gear_purchased_day;
    const brand = state.gears.gear_brand;
    const price = state.gears.gear_price;
    const amount = state.gears.gear_amount;
    const image  = state.gears.gear_image;
    const user_id = state.users.user_id;
    
    const data = new FormData();

    data.append("gear_name", (gear_name === null) ? "": gear_name)
    data.append("category", (category === null) ? "": category)
    data.append("brand", (brand === null) ? "": brand)
    data.append("purchased_day", (day === null) ? "": moment(day).format("YYYY/MM/DD"))
    data.append("price", (price === null) ? "": price)
    data.append("amount", (amount === null) ? "": amount)
    data.append(`img`, (image === null) ? "": image)
    data.append("_token", csrf_token);

    const url = `/api/gears/create/${user_id}`;
    await axios.post(url, 
      data, 
      {
        headers: {
          'content-type': 'multipart/form-data',
          }
      })
      .then((res) => {
        dispatch(GearsAction({
          gears: res.data.data
        }));
        dispatch(SuccessAction({
          success: true
        }));
        dispatch(AlertOpenAction({
          open: false
        }))
        dispatch(ModalGearCreateAction({
          modal_gear_create_open: false
        }));
        dispatch(MenuAction({
          menu_open: null
        }));
        dispatch(StoreAction({
          store: true
        }));
      })
      .catch((err) => {dispatch(CreateErrorsAction({
        create_errors: err.response.data.errors
      }))});
  }
}

export const deleteGear = (gear_id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const user_id = state.users.user_id;
    const url = `/api/gears/delete/${gear_id}`;

    const response = await axios.post(url)
      .catch((err) => {console.log(err);});

    dispatch(GearsAction({
      gears: response.data.data
    }));
    dispatch(push(`/${user_id}/gear`));
  }
}

export const updateGear = (gear_id) => {
  return async (dispatch, getState) => {
    console.log("updateGear");
    const state = getState();
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const gear_name = state.gears.gear_name;
    const category = state.gears.gear_category
    const day = state.gears.gear_purchased_day;
    const brand = state.gears.gear_brand;
    const price = state.gears.gear_price;
    const amount = state.gears.gear_amount;
    const image  = state.gears.gear_image;
    const user_id = state.users.user_id;
    
    const data = new FormData();

    data.append("gear_name", (gear_name === null) ? "": gear_name)
    data.append("category", (category === null) ? "": category)
    data.append("brand", (brand === null) ? "": brand)
    data.append("purchased_day", (day === null) ? "": moment(day).format("YYYY/MM/DD"))
    data.append("price", (price === null) ? "": price)
    data.append("amount", (amount === null) ? "": amount)
    data.append(`img`, (image === null || typeof image === "undefined") ? "": image)
    data.append("_token", csrf_token);

    const url = `/api/gears/update/${gear_id}`;
    await axios.post(url, 
      data, 
      {
        headers: {
          'content-type': 'multipart/form-data',
          }
      })
      .then((res) => {
        dispatch(GearsAction({
          gears: res.data.data
        }));
        dispatch(SuccessAction({
          success: true
        }));
        dispatch(AlertOpenAction({
          open: false
        }))
        dispatch(ModalGearCreateAction({
          modal_gear_create_open: false
        }));
        dispatch(StoreAction({
          store: true
        }));
      })
      .catch((err) => {dispatch(CreateErrorsAction({
        create_errors: err.response.data.errors
      }))});
  }
}



export const handleImageChange = (event) => {
  return (dispatch, getState) => {
    const image = event.target.files[0];
    const bolbUrl = (URL.createObjectURL(image));
    dispatch(CreateImagesAction({
      gear_bolb_urls: bolbUrl,
      gear_image: image,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};

export const handleGearNameChange = (event) => {
  return (dispatch, getState) => {
    dispatch(CreateGearNameAction({
      gear_name: event.target.value,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};

export const handleCategoryChange = (event) => {
  return (dispatch, getState) => {
    dispatch(CreateCategoryAction({
      gear_category: event.target.value,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};

export const handleBrandChange = (event) => {
  return (dispatch, getState) => {
    dispatch(CreateBrandAction({
      gear_brand: event.target.value,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};

export const handlePriceChange = (event) => {
  return (dispatch, getState) => {
    dispatch(CreatePriceAction({
      gear_price: event.target.value,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};

export const handleAmountChange = (event) => {
  return (dispatch, getState) => {
    dispatch(CreateAmountAction({
      gear_amount: event.target.value,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};

export const handlePurchasedDayChange = (date) => {
  return (dispatch, getState) => {
    dispatch(CreatePurchasedDayAction({
      gear_purchased_day: date,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};