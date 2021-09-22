import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { BringNav, ProfileNav } from ".";

const NavHeader = (props) => {
  if (props.type == "Profile") {
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    const name = selector.users.profile.app_name;
    console.log(name);
    return (
      <>
        <h2>
          <ArrowBackIcon onClick={() => { dispatch(push('/')) }} />
        </h2>
        <h2>
          {name}
        </h2>
        <ProfileNav user_id={props.user_id} />
      </>
    )
  }
  else if (props.type == "Bring") {
    return (
      <>
        <h2>
          {props.title}
        </h2>
        <BringNav user_id={props.user_id} />
      </>
    )
  }
}

export default NavHeader;