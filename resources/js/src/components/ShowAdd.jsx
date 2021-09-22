import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import ShowNestedAdd from "./ShowNestedAdd";

const ShowAdd = (props) => {
  const category = props.category;

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
      >
        <ListItemText primary={`${category.category}`} secondary={`${category.countTrue}/${category.countAll}  selected`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {category.gearList.map((gear, i) =>
            <ShowNestedAdd gear={gear} key={i} type={props.type} />
          )}
        </List>
      </Collapse>
    </>
  )
}
export default ShowAdd;