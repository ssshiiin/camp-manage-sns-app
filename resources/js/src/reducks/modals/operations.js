import { StoreAction } from "../Alerts/actions";
import { handleAlertOpen } from "../Alerts/operations";
import { ModalGearCreateAction, ModalPostCreateAction, ModalProfEditAction } from "./actions"

export const handleProfEditModalOpen = () => {
  return (dispatch, getState) => {
    dispatch(ModalProfEditAction({
      modal_prof_edit_open: true
    }));
  }
}

export const handlePostCreateModalOpen = () => {
  return (dispatch, getState) => {
    dispatch(ModalPostCreateAction({
      modal_post_create_open: true
    }));
  }
}

export const handleGearCreateModalOpen = () => {
  return (dispatch, getState) => {
    dispatch(ModalGearCreateAction({
      modal_gear_create_open: true
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
    dispatch(ModalPostCreateAction({
      modal_post_create_open: false
    }))
  }
}