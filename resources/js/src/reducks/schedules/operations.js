import axios from 'axios';
import { getScheduleAction } from './actions';

export const handleSchedulePlaceChange = (event) => {
  return (dispatch, getState) => {
    dispatch(
      RegisterSchedulePlaceAction({
        schedule_place: event.target.value,
      })
    );
  };
};

export const searchSchedulePlace = (place) => {
  return async (dispatch, getState) => {
    const state = getState();

    const url = `/schedule/search?place=${place}`;

    await axios
      .get(url)
      .then((res) => {
        if (res.data.nap !== null && res.data.dayout !== null) {
          dispatch(
            getScheduleAction({
              nap_camp: res.data.nap.camp_name,
              nap_check_in: res.data.nap.check_in,
              nap_check_out: res.data.nap.check_out,
              nap_address: res.data.nap.address,
              dayout_camp: res.data.dayout.camp_name,
              dayout_tel: res.data.dayout.tel,
              dayout_home_page: res.data.dayout.home_page,
            })
          );
        } else if (res.data.nap === null && res.data.dayout !== null) {
          dispatch(
            getScheduleAction({
              nap_camp: '',
              nap_check_in: '',
              nap_check_out: '',
              nap_address: '',
              dayout_camp: res.data.dayout.camp_name,
              dayout_tel: res.data.dayout.tel,
              dayout_home_page: res.data.dayout.home_page,
            })
          );
        } else if (res.data.nap !== null && res.data.dayout === null) {
          dispatch(
            getScheduleAction({
              nap_camp: res.data.nap.camp_name,
              nap_check_in: res.data.nap.check_in,
              nap_check_out: res.data.nap.check_out,
              nap_address: res.data.nap.address,
              dayout_camp: '',
              dayout_tel: '',
              dayout_home_page: '',
            })
          );
        } else {
          dispatch(
            getScheduleAction({
              nap_camp: '',
              nap_check_in: '',
              nap_check_out: '',
              nap_address: '',
              dayout_camp: '',
              dayout_tel: '',
              dayout_home_page: '',
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
