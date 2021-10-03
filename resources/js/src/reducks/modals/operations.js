import { StoreAction } from '../alerts/actions';
import { handleAlertOpen } from '../alerts/operations';
import {
  changeAmountAction,
  changeBrandAction,
  changeCategoryAction,
  changeGearNameAction,
  changePriceAction,
  changePurchasedDayAction,
  changeImageAction as changeGearImageAction,
  catchErrorsAction as catchGearErrorsAction,
} from '../gears/actions';
import {
  changeContentAction,
  changeDayAction,
  catchErrorsAction,
  changePlaceAction,
  changeImageAction,
} from '../posts/actions';
import { catchErrorsAction as catchProfileErrorsAction } from '../profiles/actions';
import {
  openModalProfEditAction,
  openModalGearCreateAction,
  openModalPostCreateAction,
  openModalBringEditAction,
  openModalPostEditAction,
  openModalTemplateCreateAction,
  openModalTemplateUseAction,
} from './actions';

export const openModalProfEdit = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalProfEditAction({
        modalProfEdit: true,
      })
    );
    dispatch(
      catchProfileErrorsAction({
        errors: [],
      })
    );
  };
};

export const closeModalProfEdit = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalProfEditAction({
        modalProfEdit: false,
      })
    );
  };
};

export const openModalPostCreate = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalPostCreateAction({
        modalPostCreate: true,
      })
    );

    // 新規登録をする際にPostのstateをリセットする
    dispatch(
      changePlaceAction({
        place: null,
      })
    );

    dispatch(
      changeDayAction({
        day: null,
      })
    );

    dispatch(
      changeContentAction({
        content: null,
      })
    );

    dispatch(
      changeImageAction({
        bolbUrl: '',
        image: null,
      })
    );

    dispatch(
      catchErrorsAction({
        errors: [],
      })
    );
  };
};
export const closeModalPostCreate = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalPostCreateAction({
        modalPostCreate: false,
      })
    );
  };
};

export const openModalGearCreate = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalGearCreateAction({
        modalGearCreate: true,
      })
    );

    // 新規登録をする際にGearのstateをリセットする
    dispatch(
      changeGearNameAction({
        gearName: null,
      })
    );

    dispatch(
      changeCategoryAction({
        category: null,
      })
    );

    dispatch(
      changePriceAction({
        price: null,
      })
    );

    dispatch(
      changeAmountAction({
        amount: null,
      })
    );

    dispatch(
      changePurchasedDayAction({
        purchasedDay: null,
      })
    );

    dispatch(
      changeBrandAction({
        brand: null,
      })
    );

    dispatch(
      changeGearImageAction({
        image: null,
        bolbUrl: null,
      })
    );

    dispatch(
      catchGearErrorsAction({
        errors: [],
      })
    );
  };
};

export const closeModalGearCreate = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalGearCreateAction({
        modalGearCreate: false,
      })
    );
  };
};

export const openModalPostEdit = () => {
  return (dispatch, getState) => {
    const state = getState();

    dispatch(
      openModalPostEditAction({
        modalPostEdit: true,
      })
    );

    dispatch(
      changePlaceAction({
        place: state.posts.post.place,
      })
    );

    dispatch(
      changeDayAction({
        day: state.posts.post.day,
      })
    );

    dispatch(
      changeContentAction({
        content: state.posts.post.content,
      })
    );

    dispatch(
      changeImageAction({
        bolbUrl: state.posts.post.image_path[0].image_path,
      })
    );

    dispatch(
      catchErrorsAction({
        errors: [],
      })
    );
  };
};

export const closeModalPostEdit = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalPostEditAction({
        modalPostEdit: false,
      })
    );
  };
};

export const openModalBringEdit = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalBringEditAction({
        modalBringEdit: true,
      })
    );
  };
};

export const closeModalBringEdit = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalBringEditAction({
        modalBringEdit: false,
      })
    );
  };
};

export const openModalTemplateCreate = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalTemplateCreateAction({
        modalTemplateCreate: true,
      })
    );
  };
};

export const closeModalTemplateCreate = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalTemplateCreateAction({
        modalTemplateCreate: false,
      })
    );
  };
};

export const openModalTemplateUse = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalTemplateUseAction({
        modalTemplateUse: true,
      })
    );
  };
};

export const closeModalTemplateUse = () => {
  return (dispatch, getState) => {
    dispatch(
      openModalTemplateUseAction({
        modalTemplateUse: false,
      })
    );
  };
};

export const ModalClose = () => {
  return (dispatch, getState) => {
    const state = getState();
    const store = state.alerts.store;

    if (!store) {
      dispatch(handleAlertOpen());
      dispatch(
        StoreAction({
          store: true,
        })
      );
      return;
    } else {
      dispatch(
        StoreAction({
          store: true,
        })
      );
    }
    dispatch(
      ModalProfEditAction({
        modal_prof_edit_open: false,
      })
    );
    dispatch(
      ModalPostCreateAction({
        modal_post_create_open: false,
      })
    );
    dispatch(
      ModalPostEditAction({
        modal_post_edit_open: false,
      })
    );
    dispatch(
      ModalGearCreateAction({
        modal_gear_create_open: false,
      })
    );
    dispatch(
      ModalBringEditAction({
        modal_bring_edit_open: false,
      })
    );
    dispatch(
      ModalTemplatesCreateAction({
        modal_templates_create_open: false,
      })
    );
    dispatch(
      ModalTemplatesUseAction({
        modal_templates_use_open: false,
      })
    );
  };
};
