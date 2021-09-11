export const MODAL_PROF_EDIT_OPEN = "MODAL_PROF_EDIT_OPEN";
export const ModalProfEditAction = (modalState) => {
  return {
    type: "MODAL_PROF_EDIT_OPEN",
    payload: {
      modal_prof_edit_open: modalState.modal_prof_edit_open
    }
  }
}

export const MODAL_POST_CREATE_OPEN = "MODAL_POST_CREATE_OPEN";
export const ModalPostCreateAction = (modalState) => {
  return {
    type: "MODAL_POST_CREATE_OPEN",
    payload: {
      modal_post_create_open: modalState.modal_post_create_open
    }
  }
} 

export const MODAL_GEAR_CREATE_OPEN = "MODAL_GEAR_CREATE_OPEN";
export const ModalGearCreateAction = (modalState) => {
  return {
    type: "MODAL_GEAR_CREATE_OPEN",
    payload: {
      modal_gear_create_open: modalState.modal_gear_create_open
    }
  }
}

export const MODAL_POST_EDIT_OPEN = "MODAL_POST_EDIT_OPEN";
export const ModalPostEditAction = (modalState) => {
  return {
    type: "MODAL_POST_EDIT_OPEN",
    payload: {
      modal_post_edit_open: modalState.modal_post_edit_open
    }
  }
} 

export const MODAL_BRING_EDIT_OPEN = "MODAL_BRING_EDIT_OPEN";
export const ModalBringEditAction = (modalState) => {
  return {
    type: "MODAL_BRING_EDIT_OPEN",
    payload: {
      modal_bring_edit_open: modalState.modal_bring_edit_open
    }
  }
}

export const MODAL_TEMPLATES_CREATE_OPEN = "MODAL_TEMPLATES_CREATE_OPEN";
export const ModalTemplatesCreateAction = (modalState) => {
  return {
    type: "MODAL_TEMPLATES_CREATE_OPEN",
    payload: {
      modal_templates_create_open: modalState.modal_templates_create_open
    }
  }
}

export const MODAL_TEMPLATES_USE_OPEN = "MODAL_TEMPLATES_USE_OPEN";
export const ModalTemplatesUseAction = (modalState) => {
  return {
    type: "MODAL_TEMPLATES_USE_OPEN",
    payload: {
      modal_templates_use_open: modalState.modal_templates_use_open
    }
  }
} 