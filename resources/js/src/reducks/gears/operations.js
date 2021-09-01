import axios from "axios";
import { GearsAction } from "./actions";

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