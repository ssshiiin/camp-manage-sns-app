import { push } from 'connected-react-router';
import { GearNavAction, PostNavAction } from "./actions";

export const handlePostNavClick = (event) => {
  return (dispatch, getState) => {
    dispatch(PostNavAction({
      post_nav: event.currentTarget
    }))
  }
};

export const handlePostNavClose = () => {
  return (dispatch, getState) => {
    dispatch(PostNavAction({
      post_nav: null
    }));
  }
};

export const handleGearNavClick = (event) => {
  return (dispatch, getState) => {
    dispatch(GearNavAction({
      gear_nav: event.currentTarget
    }))
  }
};

export const handleGearNavClose = () => {
  return (dispatch, getState) => {
    dispatch(GearNavAction({
      gear_nav: null
    }));
  }
};