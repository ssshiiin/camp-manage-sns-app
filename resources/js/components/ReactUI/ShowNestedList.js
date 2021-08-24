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

import Checkboxes from './Checkboxes';

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

export default function ShowNestedList(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const handleClick = () => {
        setOpen(!open);
    };

  return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={`${props.category.category}  ${props.category.countTrue}/${props.category.countAll}`} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {props.category.gearList.map((gear) => 
                    <ListItem button className={classes.nested} key={gear.gear_id}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={gear.gear_name} />
                        <Checkboxes id={gear.id} is_check={gear.is_check} getCount={props.getCount} postIs_check={props.postIs_check} getGear={props.getGear} />
                        <DeleteForeverIcon onClick={() => props.deleteBringGear(gear.id)} />
                    </ListItem>
                )}
            </List>
            </Collapse>
        </div>  
  );
}
