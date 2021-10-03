import axios from 'axios';
import { getScheduleAction, RegisterSchedulePlaceAction } from './actions';

export const handleSchedulePlaceChange = (event) => {
  return (dispatch, getState) => {
    dispatch(
      RegisterSchedulePlaceAction({
        schedule_place: event.target.value,
      })
    );
  };
};

export const searchSchedulePlace = (e) => {
  return async (dispatch, getState) => {
    e.preventDefault();
    const state = getState();
    const place = state.schedules.schedule_place;

    const url = '/schedule/search';

    await axios
      .post(url, {
        place: place,
      })
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
