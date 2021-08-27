import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../reducks/users/operations";
import { getUserId } from "../reducks/users/selector";
import { push } from "connected-react-router";

const SideBar = () => {
  const selector = useSelector(state => state);
  const dispatch = useDispatch();
  dispatch(SignIn());
  console.log(getUserId(selector))
  const user_id = getUserId(selector);


  return (
    <div>
      {user_id}
      SideBar
      <button onClick={() => dispatch(push("/"))}>HOME</button>
      <button onClick={() => dispatch(push(`/${user_id}`))}>PROFILE</button>
    </div>
  )
}

export default SideBar;