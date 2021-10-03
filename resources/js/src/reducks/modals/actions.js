export const MODAL_PROF_EDIT = 'MODAL_PROF_EDIT';
export const openModalProfEditAction = (modalState) => {
  return {
    type: 'MODAL_PROF_EDIT',
    payload: {
      modalProfEdit: modalState.modalProfEdit,
    },
  };
};

export const MODAL_POST_CREATE = 'MODAL_POST_CREATE';
export const openModalPostCreateAction = (modalState) => {
  return {
    type: 'MODAL_POST_CREATE',
    payload: {
      modalPostCreate: modalState.modalPostCreate,
    },
  };
};

export const MODAL_GEAR_CREATE = 'MODAL_GEAR_CREATE';
export const openModalGearCreateAction = (modalState) => {
  return {
    type: 'MODAL_GEAR_CREATE',
    payload: {
      modalGearCreate: modalState.modalGearCreate,
    },
  };
};

export const MODAL_POST_EDIT = 'MODAL_POST_EDIT';
export const openModalPostEditAction = (modalState) => {
  return {
    type: 'MODAL_POST_EDIT',
    payload: {
      modalPostEdit: modalState.modalPostEdit,
    },
  };
};

export const MODAL_BRING_EDIT = 'MODAL_BRING_EDIT';
export const openModalBringEditAction = (modalState) => {
  return {
    type: 'MODAL_BRING_EDIT',
    payload: {
      modalBringEdit: modalState.modalBringEdit,
    },
  };
};

export const MODAL_TEMPLATE_CREATE = 'MODAL_TEMPLATE_CREATE';
export const openModalTemplateCreateAction = (modalState) => {
  return {
    type: 'MODAL_TEMPLATE_CREATE',
    payload: {
      modalTemplateCreate: modalState.modalTemplateCreate,
    },
  };
};

export const MODAL_TEMPLATE_USE = 'MODAL_TEMPLATE_USE';
export const openModalTemplateUseAction = (modalState) => {
  return {
    type: 'MODAL_TEMPLATE_USE',
    payload: {
      modalTemplateUse: modalState.modalTemplateUse,
    },
  };
};
