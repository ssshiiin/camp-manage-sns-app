import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Checkbox from "@material-ui/core/Checkbox";

import CheckBoxes from "./CheckBoxes";
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  console.log(props)
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
      // onClick={handleToggle(gear)}
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