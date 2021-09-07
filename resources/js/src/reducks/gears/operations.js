import axios from "axios";
import { AlertOpenAction, StoreAction, SuccessAction } from "../Alerts/actions";
import { ModalGearCreateAction } from "../modals/actions";
import { MenuAction } from "../users/actions";
import { CountGearsAction, CreateAmountAction, CreateBrandAction, CreateCategoryAction, CreateGearNameAction, CreateImagesAction, CreatePriceAction, CreatePurchasedDayAction, GearsAction } from "./actions";

export const getGears = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getGears");
    const url = `/api/gears/category/${user_id}`;

    const response = await axios.get(url)
      .catch((err) => {console.log(err)});

    console.log(response.data.data)
    dispatch(GearsAction({
      gears: response.data.data
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
    const images  = state.gears.gear_images;
    const user_id = state.users.user_id;
    
    const data = new FormData();

    data.append("gearName", gear_name)
    data.append("category", category)
    data.append("brand", brand)
    data.append("purchasedDay", day)
    data.append("price", price)
    data.append("amount", amount)
    images.map((image, i) => {
      data.append(`${i}`, image);
    });
    data.append("_token", csrf_token);

    const url = `/api/gears/create/${user_id}`;
    const response = await axios.post(url, 
      data, 
      {
        headers: {
          'content-type': 'multipart/form-data',
          }
      })
      .catch((err) => {console.log("err:", err)});
    
    dispatch(getGears(user_id));
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
  }
}

export const handleImageChange = (event) => {
  return (dispatch, getState) => {
    let images = Array();
    let bolbUrls = Array();
    const len = event.target.files["length"];
    for (let i=0; i<len; i++){
      const image = event.target.files[i];
      images.push(image);
      bolbUrls.push(URL.createObjectURL(image));
    }
    dispatch(CreateImagesAction({
      gear_bolb_urls: bolbUrls,
      gear_images: images,
    }));
    dispatch(StoreAction({
      store: false
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
  }
};