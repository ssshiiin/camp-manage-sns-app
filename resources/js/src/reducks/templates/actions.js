export const TEMPLATES = "TEMPLATES";
export const getTemplatesAction = (templatesState) => {
  return {
    type: "TEMPLATES",
    payload: {
      templates: templatesState.templates
    }
  }
}

export const CREATE_TEMPLATE = "CREATE_TEMPLATE";
export const createTemplatesAction = (templatesState) => {
  return {
    type: "CREATE_TEMPLATE",
    payload: {
      template_name: templatesState.template_name
    }
  }
}