import axios from "axios";
import { getScheduleAction, RegisterSchedulePlaceAction } from "./actions";

export const handleSchedulePlaceChange = (event) => {
  return (dispatch, getState) => {
    dispatch(RegisterSchedulePlaceAction({
      schedule_place: event.target.value,
    }));
  }
};

export const searchSchedulePlace = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const place = state.schedules.schedule_place;

    console.log(place);

    const url = '/api/schedule/search/place';

    const response = await axios.post(url,
      {
        place: place
      })
      .catch((err) => {console.log(err)});


    if (response.data.nap !== null && response.data.dayout !== null){
      dispatch(getScheduleAction({
        nap_camp: response.data.nap.camp_name,
        nap_check_in: response.data.nap.check_in,
        nap_check_out: response.data.nap.check_out,
        nap_address: response.data.nap.address,
        dayout_camp: response.data.dayout.camp_name,
        dayout_tel: response.data.dayout.tel,
        dayout_home_page: response.data.dayout.home_page,
      }));
    }
    else if (response.data.nap === null && response.data.dayout !== null){
      dispatch(getScheduleAction({
        nap_camp: "",
        nap_check_in: "",
        nap_check_out: "",
        nap_address: "",
        dayout_camp: response.data.dayout.camp_name,
        dayout_tel: response.data.dayout.tel,
        dayout_home_page: response.data.dayout.home_page,
      }));
    }
    else if (response.data.nap !== null && response.data.dayout === null){
      dispatch(getScheduleAction({
        nap_camp: response.data.nap.camp_name,
        nap_check_in: response.data.nap.check_in,
        nap_check_out: response.data.nap.check_out,
        nap_address: response.data.nap.address,
        dayout_camp: "",
        dayout_tel: "",
        dayout_home_page: "",
      }));
    }
    else {
      dispatch(getScheduleAction({
        nap_camp: "",
        nap_check_in: "",
        nap_check_out: "",
        nap_address: "",
        dayout_camp: "",
        dayout_tel: "",
        dayout_home_page: "",
      }));
    }
  }
}