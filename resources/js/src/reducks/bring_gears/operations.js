import axios from "axios";
import { AddCountAllActions, AddGearsActions, BringCountAllActions, BringGearsActions } from "./actions";

export const getBringGear = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getBringGear")

    const url = `/api/bring_gears/${user_id}`;

    const response = await axios.get(url)
      .catch((err) => {console.log(err)});

    dispatch(BringGearsActions({
      bring_gears: response.data.data
    }));
  }
}

export const getAddBringGear = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getAddGear")

    const url = `/api/bring_gears/add/${user_id}`;

    const response = await axios.get(url)
      .catch((err) => {console.log(err)});

    dispatch(AddGearsActions({
      add_gears: response.data.data
    }));
  }
}

export const getCountAllBring = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getCountAllGear")

    const url = `/api/bring_gears/countAll/${user_id}`;

    const response = await axios.get(url)
      .catch((err) => {console.log(err)});

    dispatch(BringCountAllActions({
      count_all: response.data
    }));
  }
}

export const getCountAllAdd = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getCountAllAdd")

    const url = `/api/bring_gears/countAll/add/${user_id}`;

    const response = await axios.get(url)
      .catch((err) => {console.log(err)});

    dispatch(AddCountAllActions({
      count_add_all: response.data
    }));
  }
}

export const BringIs_check = (is_check, id) => {
  return async (dispatch, getState) => {
    console.log("BringIs_check")
    const state = getState();
    const user_id = state.users.user_id;

    const url = `/api/bring_gears/update/${id}`;
    const response = await axios.post(url,
      {
        is_check: is_check
      })
      .catch((err) => console.log(err));

    dispatch(BringGearsActions({
      bring_gears: response.data.data
    }));
    dispatch(getCountAllBring(user_id));
  }
}

export const BringAllIs_check = (user_id, is_check) => {
  return async (dispatch, getState) => {
    console.log("BringAllIs_check")
    const state = getState();

    const url = `/api/bring_gears/update/all/${user_id}`;
    const response = await axios.post(url,
      {
        is_check: is_check
      })
      .catch((err) => console.log(err));

    dispatch(BringGearsActions({
      bring_gears: response.data.data
    }));
    dispatch(getCountAllBring(user_id));
  }
}

export const AddIs_check = (is_check, id) => {
  return async (dispatch, getState) => {
    console.log("AddIs_check")
    const state = getState();
    const user_id = state.users.user_id;

    const url = `/api/bring_gears/update/add/${id}`;
    const response = await axios.post(url,
      {
          is_check: is_check
      })
      .catch((err) => console.log(err));

    dispatch(AddGearsActions({
      add_gears: response.data.data
    }));
    dispatch(getCountAllAdd(user_id));
  }
}

export const AddAllIs_check = (user_id, is_check) => {
  return async (dispatch, getState) => {
    console.log("AddAllIs_check")
    const state = getState();

    const url = `/api/bring_gears/update/add/all/${user_id}`;
    const response = await axios.post(url,
      {
        is_check: is_check
      })
      .catch((err) => console.log(err));

    dispatch(AddGearsActions({
      add_gears: response.data.data
    }));
    dispatch(getCountAllAdd(user_id));
  }
} 

export const createBringGear = (id) => {
  return async (dispatch, getState) => {
    console.log("createBringGear")
    const state = getState();
    const user_id = state.users.user_id;
    
    const url = `/api/bring_gears/create/${id}`;
    const response = await axios.post(url);
    dispatch(BringGearsActions({
      bring_gears: response.data.data
    }));
    dispatch(getAddBringGear(user_id));
    dispatch(getCountAllAdd(user_id));
    dispatch(getCountAllBring(user_id));
  }
}

export const deleteBringGear = (id) => {
  return async (dispatch, getState) => {
    console.log("deleteBringGear")
    const state = getState();
    const user_id = state.users.user_id;
    
    const url = `/api/bring_gears/delete/${id}`;
    const response = await axios.post(url);
    dispatch(BringGearsActions({
      bring_gears: response.data.data
    }));
    dispatch(getAddBringGear(user_id));
    dispatch(getCountAllAdd(user_id));
    dispatch(getCountAllBring(user_id));
  }
}