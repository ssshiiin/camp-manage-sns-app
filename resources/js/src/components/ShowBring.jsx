import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";


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
  console.log("showBring")
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
        <ListItemText primary={`${props.category.category}`} style={{ flex: "initial" }} />
        <ListItemText secondary={`${props.category.count_true}/${props.category.count_all}  selected`} style={{ flex: "1", marginLeft: 20 }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.category.gear_list.map((gear, i) =>
            <ShowNestedBring gear={gear} key={i} />
          )}
        </List>
      </Collapse>
    </>
  );
}

export default ShowBring;