import { StoreAction } from "../Alerts/actions";
import { handleAlertOpen } from "../Alerts/operations";
import { ModalProfEditAction } from "./actions"

export const handleProfEditModalOpen = () => {
  return (dispatch, getState) => {
    dispatch(ModalProfEditAction({
      modal_prof_edit_open: true
    }));
  }
}

export const ModalClose = () => {
  return (dispatch, getState) => {
    const state = getState();
    const store = state.alerts.store;
  

    if (!store) {
      dispatch(handleAlertOpen());
      return;
    }
    else {
      dispatch(StoreAction({
        store: true
      }));
    }
    dispatch(ModalProfEditAction({
      modal_prof_edit_open: false
    }))
  }
}