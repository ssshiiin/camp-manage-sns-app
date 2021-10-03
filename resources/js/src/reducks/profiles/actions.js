export const PROFILES = 'PROFILES';
export const getProfileAction = (profileState) => {
  return {
    type: 'PROFILES',
    payload: {
      profile: profileState.profile,
    },
  };
};

export const CHANGE_APP_NAME = 'CHANGE_APP_NAME';
export const changeAppNameAction = (profileState) => {
  return {
    type: 'CHANGE_APP_NAME',
    payload: {
      appName: profileState.appName,
    },
  };
};

export const CHANGE_PROF_CONTENT = 'CHANGE_PROF_CONTENT';
export const changeProfContentAction = (profileState) => {
  return {
    type: 'CHANGE_PROF_CONTENT',
    payload: {
      profContent: profileState.profContent,
    },
  };
};

export const CHANGE_IMAGE = 'CHANGE_IMAGE';
export const changeImageAction = (profileState) => {
  return {
    type: 'CHANGE_IMAGE',
    payload: {
      bolbUrl: profileState.bolbUrl,
      image: profileState.image,
    },
  };
};

export const CATCH_ERROR = 'CATCH_ERROR';
export const catchErrorsAction = (profileState) => {
  return {
    type: 'CATCH_ERROR',
    payload: {
      errors: profileState.errors,
    },
  };
};
