import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { useDispatch } from "react-redux";
import { updateBringCheck } from "../reducks/bring_gears/operations";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const ShowNestedBring = React.memo((props) => {
  console.log("showNestBring")
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  const [checked, setChecked] = React.useState(props.gear.is_check);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(updateBringCheck(!checked, props.gear.id));
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText primary={props.gear.gear_name} />
    </ListItem>
  );
})

export default ShowNestedBring;