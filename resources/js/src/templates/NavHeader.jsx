import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { NavBring, NavProfile } from ".";

const NavHeader = (props) => {
  console.log("NavHeader")
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  if (props.type == "Profile") {
    const name = selector.users.profile.app_name;

    return (
      <>
        <h2>
          <ArrowBackIcon onClick={() => { dispatch(push('/')) }} />
        </h2>
        <h2>
          {name}
        </h2>
        <NavProfile user_id={props.user_id} />
      </>
    )
  }
  else if (props.type == "Bring") {
    const login = selector.users.user_id;
    return (
      <>
        <h2>
          {props.title}
        </h2>
        {
          props.user_id == login &&
          <NavBring />
        }
      </>
    )
  }
}

export default NavHeader;