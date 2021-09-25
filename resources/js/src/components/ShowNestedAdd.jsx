import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { useDispatch } from "react-redux";
import { updateBringCheck, updateNotBringCheck } from "../reducks/bring_gears/operations";


const ShowNestedAdd = (props) => {
  console.log("showNestedAdd")
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(props.gear.is_check);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (props.type == "bring") {
      dispatch(updateBringCheck(!checked, props.gear.id));
    }
    else if (props.type == "add") {
      dispatch(updateNotBringCheck(!checked, props.gear.gear_id))
    }
  };

  return (
    <ListItem style={{ padding: 0 }}>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        disableRipple
      />
      <ListItemText primary={props.gear.gear_name} className="BringNestedGear" />
    </ListItem>
  );
}
export default ShowNestedAdd;