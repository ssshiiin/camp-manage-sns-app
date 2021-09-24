import axios from "axios";
import { AddCountAllActions, AddGearsActions, BringCountAllActions, BringGearsActions } from "./actions";

export const getBringGear = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getBringGear-----");

    const url = `/api/bring_gears/${user_id}`;

    await axios.get(url)
      .then((res) => {
        dispatch(BringGearsActions({
          bring_gears: res.data.bring,
          count_all: res.data.bring_all_count
        }));
      })
      .catch((err) => {console.log(err)});
  }
}

export const getAddBringGear = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getAddGear-----")

    const url = `/api/bring_gears/add/${user_id}`;

    await axios.get(url)
      .then((res) => {
        dispatch(AddGearsActions({
          add_gears: res.data.add,
          count_add_all: res.data.add_all_count
        }));
      })
      .catch((err) => {console.log(err)});

  }
}

export const getCountAllBring = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getCountAllBring-----")

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
    console.log("getCountAllAdd-----")

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
    console.log("BringIs_check-----")

    const url = `/api/bring_gears/update/${id}`;
    await axios.post(url,
      {
        is_check: is_check
      })
      .then((res) => {
        dispatch(BringGearsActions({
          bring_gears: res.data.bring,
          count_all: res.data.bring_all_count
        }));
      })
      .catch((err) => console.log(err));
  }
}

export const BringAllIs_check = (user_id, is_check) => {
  return async (dispatch, getState) => {
    console.log("BringAllIs_check-----")
    const state = getState();

    const url = `/api/bring_gears/update/all/${user_id}`;
    await axios.post(url,
      {
        is_check: is_check
      })
      .then((res) => {
        dispatch(BringGearsActions({
          bring_gears: res.data.bring,
          count_all: res.data.bring_all_count
        }));
      })
      .catch((err) => console.log(err));

  }
}

export const AddIs_check = (is_check, id) => {
  return async (dispatch, getState) => {
    console.log("AddIs_check-----")
    const state = getState();
    const user_id = state.users.user_id;

    const url = `/api/bring_gears/update/add/${id}`;
    await axios.post(url,
      {
          is_check: is_check
      })
      .then((res) => {
        dispatch(AddGearsActions({
          add_gears: res.data.add,
          count_add_all: res.data.add_all_count
        }));
      })
      .catch((err) => console.log(err));
  }
}

export const AddAllIs_check = (user_id, is_check) => {
  return async (dispatch, getState) => {
    console.log("AddAllIs_check-----")
    const state = getState();

    const url = `/api/bring_gears/update/add/all/${user_id}`;
    await axios.post(url,
      {
        is_check: is_check
      })
      .then((res) => {
        dispatch(AddGearsActions({
          add_gears: res.data.add,
          count_add_all: res.data.add_all_count
        }));
      })
      .catch((err) => console.log(err));
  }
} 

export const createBringGear = (id) => {
  return async (dispatch, getState) => {
    console.log("createBringGear-----")
    const state = getState();
    const user_id = state.users.user_id;
    
    const url = `/api/bring_gears/create/${id}`;
    await axios.post(url)
    .then((res) => {
      dispatch(BringGearsActions({
        bring_gears: res.data.bring.bring,
        count_all: res.data.bring.bring_all_count
      }));
      dispatch(AddGearsActions({
        add_gears: res.data.add.add,
        count_add_all: res.data.add.add_all_count
      }));
    })
    .catch((err) => {
      console.log(err)
    });
  }
}

export const deleteBringGear = (id) => {
  return async (dispatch, getState) => {
    console.log("deleteBringGear-----")
    const state = getState();
    const user_id = state.users.user_id;
    
    const url = `/api/bring_gears/delete/${id}`;
    await axios.post(url)
    .then((res) => {
      dispatch(BringGearsActions({
        bring_gears: res.data.bring.bring,
        count_all: res.data.bring.bring_all_count
      }));
      dispatch(AddGearsActions({
        add_gears: res.data.add.add,
        count_add_all: res.data.add.add_all_count
      }));
    })
    .catch((err) => {
      console.log(err)
    });
  }
}