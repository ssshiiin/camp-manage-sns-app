import { createTemplatesAction, getTemplatesAction } from "./actions";
import { StoreAction } from "../alerts/actions";

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

export const createTemplates = () => {
  return async (dispatch, getState) => {
    console.log("createTemplates");
    const state = getState();
    const template_name = state.templates.template_name;
    const bring_gears = state.bring_gears.bring_gears;
    const user_id = state.users.user_id;
    console.log(state.templates)

    const url = `/api/templates/create/${user_id}`;
    const response = await axios.post(url, 
      {
        template_name: template_name,
        bring_gears: bring_gears
      })
      .catch((err) => {console.log(err)})
  
    dispatch(getTemplatesAction({
      templates: response.data
    }));
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