import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../reducks/users/selector";
import { push } from "connected-react-router";
import { signInUser } from "../reducks/users/operations";
import { pushMyProfile } from "../reducks/posts/operations";

import MediaQuery from "react-responsive";



const SideBar = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const user_id = getUserId(selector);

  useEffect(() => {
    dispatch(signInUser())
  }, []);

  const handleGearClick = () => {
    if (user_id === undefined) {
      dispatch(push("/login"));
    } else {
      dispatch(push(`/${user_id}/bring`));
    }
  }

  const handleMyPageClick = () => {
    if (user_id === undefined) {
      dispatch(push("/login"));
    } else {
      dispatch(pushMyProfile(user_id));
    }
  }


  return (
    <nav className="side-bar">
      <MediaQuery query="(min-width: 767px)">
        <div className="logo" style={{ height: 70, width: 218, paddingLeft: 14, marginTop: 10 }}>
          <img src={'/images/logoWideUnderBar.png'} width="178px" height="55px" />
        </div>
        <ul className="side-nav">
          <li onClick={() => dispatch(push("/"))}><img src={'/images/Home.png'} width="36px" height="36px" /><p>Home</p></li>
          <li onClick={() => dispatch(push(`/site`))}><img src={'/images/Site.png'} width="36px" height="36px" /><p>Site</p></li>
          <li onClick={handleGearClick} ><img src={'/images/Lantan.png'} width="36px" height="36px" /><p>Gear</p></li>
          <li onClick={handleMyPageClick} ><img src={'/images/Human.png'} width="36px" height="36px" /><p>Profile</p></li>
        </ul>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <ul className="side-nav">
          <li onClick={() => dispatch(push("/"))}><img src={'/images/mhome.png'} width="25px" height="25px" /></li>
          <li onClick={() => dispatch(push(`/site`))}><img src={'/images/msite.png'} width="25px" height="25px" /></li>
          <li onClick={handleGearClick} ><img src={'/images/mlantan.png'} width="25px" height="25px" /></li>
          <li onClick={handleMyPageClick} ><img src={'/images/mhuman.png'} width="25px" height="25px" /></li>
        </ul>
      </MediaQuery>
    </nav >
  )
}

export default SideBar;