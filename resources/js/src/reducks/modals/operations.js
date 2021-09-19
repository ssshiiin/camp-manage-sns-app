import { StoreAction } from "../alerts/actions";
import { handleAlertOpen } from "../alerts/operations";
import { CreateImagesAction as GearImageAction ,CreateAmountAction, CreateBrandAction, CreateCategoryAction, CreateGearNameAction, CreatePriceAction, CreatePurchasedDayAction, CreateErrorsAction as GearErrorsAction } from "../gears/actions";
import { CreateErrorsAction , CreateContentAction, CreateDayAction, CreateImagesAction, CreatePlaceAction } from "../posts/actions";
import { ModalBringEditAction, ModalGearCreateAction, ModalPostCreateAction, ModalPostEditAction, ModalProfEditAction, ModalTemplatesCreateAction, ModalTemplatesUseAction } from "./actions"

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

    // 新規登録をする際にPostのstateをリセットする
    dispatch(CreatePlaceAction({
      post_place: ""
    }));

    dispatch(CreateDayAction({
      post_day: null
    }));

    dispatch(CreateContentAction({
      post_content: ""
    }));

    dispatch(CreateImagesAction({
      post_bolb_urls: "",
      post_image: null
    }));

    dispatch(CreateErrorsAction({
      create_errors: []
    }))
  }
}

export const handleGearCreateModalOpen = () => {
  return (dispatch, getState) => {
    dispatch(ModalGearCreateAction({
      modal_gear_create_open: true
    }));

    // 新規登録をする際にGearのstateをリセットする
    dispatch(CreateGearNameAction({
      gear_name: null
    }));

    dispatch(CreateCategoryAction({
      gear_category: null,
    }));

    dispatch(CreatePriceAction({
      gear_price: null
    }));

    dispatch(CreateAmountAction({
      gear_amount: null
    }));

    dispatch(CreatePurchasedDayAction({
      gear_purchased_day: null
    }));

    dispatch(CreateBrandAction({
      gear_brand: null
    }));

    dispatch(GearImageAction({
      gear_images: null,
      gear_bolb_urls: null
    }));

    dispatch(GearErrorsAction({
      create_errors: []
    }))

  }
}

export const handlePostEditModalOpen = () => {
  return (dispatch, getState) => {
    const state = getState();

    dispatch(ModalPostEditAction({
      modal_post_edit_open: true
    }));

    dispatch(CreatePlaceAction({
      post_place: state.posts.post[0].place,
    }));

    dispatch(CreateDayAction({
      post_day: state.posts.post[0].day,
    }));

    dispatch(CreateContentAction({
      post_content: state.posts.post[0].content,
    }));

    dispatch(CreateImagesAction({
      post_bolb_urls: [state.posts.post[0].image_path[0].image_path],
    }));
  }
}

export const handleBringEditModalOpen = () => {
  return (dispatch, getState) => {
    dispatch(ModalBringEditAction({
      modal_bring_edit_open: true
    }));
  }
}

export const handleTemplatesCreateModalOpen = () => {
  return (dispatch, getState) => {
    dispatch(ModalTemplatesCreateAction({
      modal_templates_create_open: true
    }));
  }
}

export const handleTemplatesUseModalOpen = () => {
  return (dispatch, getState) => {
    dispatch(ModalTemplatesUseAction({
      modal_templates_use_open: true
    }));
  }
}

export const ModalClose = () => {
  return (dispatch, getState) => {
    const state = getState();
    const store = state.alerts.store;
  

    if (!store) {
      dispatch(handleAlertOpen());
      dispatch(StoreAction({
        store: true
      }));
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
    dispatch(ModalPostEditAction({
      modal_post_edit_open: false
    }));
    dispatch(ModalGearCreateAction({
      modal_gear_create_open: false
    }));
    dispatch(ModalBringEditAction({
      modal_bring_edit_open: false
    }));
    dispatch(ModalTemplatesCreateAction({
      modal_templates_create_open: false
    }));
    dispatch(ModalTemplatesUseAction({
      modal_templates_use_open: false
    }));
  }
}