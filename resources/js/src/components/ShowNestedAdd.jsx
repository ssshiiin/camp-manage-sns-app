import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { useDispatch } from "react-redux";
import { AddIs_check, BringIs_check } from "../reducks/bring_gears/operations";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const ShowNestedAdd = (props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(props.gear.is_check);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (props.type == "bring") {
      dispatch(BringIs_check(!checked, props.gear.id));
    }
    else if (props.type == "add") {
      dispatch(AddIs_check(!checked, props.gear.gear_id))
    }
  };

  return (
    <ListItem
      button
      style={{ padding: 0 }}
    >
      <ListItemIcon>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText primary={props.gear.gear_name} className="BringNestedGear" />
    </ListItem>
  );
}
export default ShowNestedAdd;