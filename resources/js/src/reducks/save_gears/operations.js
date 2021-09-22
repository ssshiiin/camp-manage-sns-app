import axios from "axios";

export const createSaveGears = (gear_id) => { 
  return async (dispatch, getState) => {
    console.log('createSaveGears');
    const state = getState();
    const user_id = state.users.user_id;
    const url = '/api/save_gears/create';


    await axios.post(url,{
      user_id: user_id,
      gear_id: gear_id,
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

export const getSaveGears = () => {
  return async (dispatch, getState) => {
    console.log("getSaveGears");
    const state = getState();
    const user_id = state.users.user_id;
    const url = `/api/save_gears/${user_id}`;
    

    await axios.get(url)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}