export const GET_SCHEDULE = 'GET_SCHEDULE';
export const getScheduleAction = (schedulesState) => {
  return {
    type: 'GET_SCHEDULE',
    payload: {
      nap_camp: schedulesState.nap_camp,
      nap_check_in: schedulesState.nap_check_in,
      nap_check_out: schedulesState.nap_check_out,
      nap_address: schedulesState.nap_address,
      dayout_camp: schedulesState.dayout_camp,
      dayout_tel: schedulesState.dayout_tel,
      dayout_home_page: schedulesState.dayout_home_page,
    },
  };
};
