import { AlertOpenAction, StoreAction, SuccessAction } from "../alerts/actions";
import { BringGearsActions } from "../bring_gears/actions";
import { ModalTemplatesCreateAction } from "../modals/actions";
import { createTemplatesAction, getTemplatesAction } from "./actions";



export const getTemplates = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getTemplates");
    const url = `/api/templates/${user_id}`;
    const response = await axios.get(url);
  
    dispatch(getTemplatesAction({
      templates: response.data
    }));
  }
}

export const useTemplate = (useTemplate_name, user_id) => {
  return async (dispatch, getState) => {
    console.log("useTemplates");
    const url = `/api/templates/use/${user_id}`;
    await axios.post(url, 
    {
      useTemplate_name: useTemplate_name
    })
    .then((res) => {
      dispatch(BringGearsActions({
        bring_gears: res.data.bring,
        count_all: res.data.bring_all_count
      }));
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

export const createTemplates = () => {
  return async (dispatch, getState) => {
    console.log("createTemplates");
    const state = getState();
    const template_name = state.templates.template_name;
    const bring_gears = state.bring_gears.bring_gears;
    const user_id = state.users.user_id;

    const url = `/api/templates/create/${user_id}`;
    await axios.post(url, 
      {
        template_name: template_name,
        bring_gears: bring_gears
      })
      .then((res) => {
        dispatch(getTemplatesAction({
          templates: res.data
        }));
        dispatch(SuccessAction({
          success: true
        }));
        dispatch(AlertOpenAction({
          open: false
        }))
        dispatch(ModalTemplatesCreateAction({
          modal_templates_create_open: false
        }));
        dispatch(StoreAction({
          store: true
        }));
      })
      .catch((err) => {console.log(err)});
  
  }
}

export const handleTemplate_nameChange = (event) => {
  return (dispatch, getState) => {
    dispatch(createTemplatesAction({
      template_name: event.target.value,
    }));
    dispatch(StoreAction({
      store: false
    }));
  }
};