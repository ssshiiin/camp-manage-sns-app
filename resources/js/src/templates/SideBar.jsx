import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../reducks/users/selector";
import { push } from "connected-react-router";
import { SignIn } from "../reducks/users/operations";


const SideBar = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const user_id = getUserId(selector);

  useEffect(() => {
    dispatch(SignIn())
  }, []);


  return (
    <nav className="side-bar">
      <div className="logo">
        logo
      </div>
      <ul className="side-nav">
        <li onClick={() => dispatch(push("/"))}><img src={'/images/ホームアイコン.jpeg'} width="36px" height="36px" /><p>Home</p></li>
        <li onClick={() => dispatch(push(`/${user_id}/schedule`))}><img src={'/images/schedule.jpeg'} width="36px" height="36px" /><p>Schedule</p></li>
        <li onClick={() => dispatch(push(`/${user_id}/bring_lists`))}><img src={'/images/ランタンアイコン1.jpeg'} width="36px" height="36px" /><p>Gear</p></li>
        <li onClick={() => dispatch(push(`/${user_id}/dm`))}><img src={'/images/メールの無料アイコンその8.jpeg'} width="36px" height="36px" /><p>Messages</p></li>
        <li onClick={() => dispatch(push(`/${user_id}`))} ><img src={'/images/履歴書アイコン6.jpeg'} width="36px" height="36px" /><p>Profile</p></li>
      </ul>
    </nav>
  )
}

export default SideBar;