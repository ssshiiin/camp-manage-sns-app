import axios from "axios";
import { CountGearsAction, GearsAction } from "./actions";

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