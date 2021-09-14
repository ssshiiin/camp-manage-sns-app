import { AlertOpenAction } from "./actions";

export const handleAlertOpen = () => {
  return (dispatch, getState) => {
    dispatch(AlertOpenAction({
      open: true
    }))
  }
};
export const handleAlertClose = (event, reason) => {
  return (dispatch, getState) => {
    console.log(reason)
    dispatch(AlertOpenAction({
      open: false
    }))
  }  
};