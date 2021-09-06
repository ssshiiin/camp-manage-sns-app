export const MODAL_PROF_EDIT_OPEN = "MODAL_PROF_EDIT_OPEN";
export const ModalProfEditAction = (modalState) => {
  return {
    type: "MODAL_PROF_EDIT_OPEN",
    payload: {
      modal_prof_edit_open: modalState.modal_prof_edit_open
    }
  }
} 