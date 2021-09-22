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

const ShowBring = React.memo((props) => {
  console.log("show")
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
})

export default ShowBring;