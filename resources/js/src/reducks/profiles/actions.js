export const PROFILE = 'PROFILE';
export const getProfileAction = (profileState) => {
  return {
    type: 'PROFILE',
    payload: {
      profile: profileState.profile,
    },
  };
};
