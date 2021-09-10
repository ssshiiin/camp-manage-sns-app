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
import ShowNestedBring from "./ShowNestedBring";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    display: "flex"
  },
  subHeader: {
    display: "flex"
  }
}));

const ShowBring = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleNestClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        role="listitem"
        button
        onClick={handleNestClick}
        className={classes.subHeader}
      >
        <ListItemText primary={`${props.bring_gear.category}`} style={{ flex: "initial" }} />
        <ListItemText secondary={`${props.bring_gear.countTrue}/${props.bring_gear.countAll}  selected`} style={{ flex: "1", marginLeft: 20 }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.bring_gear.gearList.map((gear, i) =>
            <ShowNestedBring gear={gear} key={i} />
          )}
        </List>
      </Collapse>
    </>
  );
}
export default ShowBring;