export const TEMPLATES = 'TEMPLATES';
export const getTemplatesAction = (templatesState) => {
  return {
    type: 'TEMPLATES',
    payload: {
      templates: templatesState.templates,
    },
  };
};
