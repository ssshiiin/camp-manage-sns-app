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

import ShowNestedList from './ShowNestedList'
 
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function IndexNestedList(props) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(0);
  
  const handleClick = () => {
  setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="gearList">
          <p className="count">{props.count.countTrue} / {props.count.countAll}</p>
        </ListSubheader>
      }
      className={classes.root}
      style={{position: "static"}}
      style={{width: "910px"}}
    >
    {props.categories.map((category)=>
      <ShowNestedList
        category={category} 
        key={category.category} 
        getCount={props.getCount} 
        getGear={props.getGear} 
        postIs_check={props.postIs_check} 
        deleteBringGear={props.deleteBringGear} 
        count={props.count} 
      />
    )}
  </List>
  );
}