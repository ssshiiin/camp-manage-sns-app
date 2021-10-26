import { getBringsAction } from '../bring_gears/actions';
import { createTemplatesAction, getTemplatesAction } from './actions';

export const getTemplates = (userId) => {
  return async (dispatch, getState) => {
    console.log('getTemplates');
    const url = `/templates/${userId}`;
    await axios
      .get(url)
      .then((res) => {
        dispatch(
          getTemplatesAction({
            templates: res.data.templates,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const useTemplate = (templateName, userId) => {
  return async (dispatch, getState) => {
    console.log('useTemplates');
    const url = `/templates/show/${userId}`;
    await axios
      .post(url, {
        template_name: templateName,
      })
      .then((res) => {
        dispatch(
          getBringsAction({
            brings: res.data.brings,
            brings_count_all: res.data.brings_count_all,
            brings_count_true: res.data.brings_count_true,
            not_brings: res.data.not_brings,
            not_brings_count_all: res.data.not_brings_count_all,
            not_brings_count_true: res.data.not_brings_count_true,
          })
        );
        dispatch(
          openModalTemplateUseAction({
            modalTemplateUse: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const create = (templateName, setOpen) => {
  return async (dispatch, getState) => {
    console.log('createTemplates');
    const state = getState();
    const brings = state.bring_gears.brings;
    const userId = state.users.user_id;

    const url = `/templates/create/${userId}`;
    await axios
      .post(url, {
        template_name: templateName,
        bring_gears: brings,
      })
      .then((res) => {
        dispatch(
          getTemplatesAction({
            templates: res.data.templates,
          })
        );
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
