import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuItem from '@material-ui/core/MenuItem';

import SimpleModal from '../../src/components/SimpleModal';
import { handleAlertClose, handleAlertOpen } from "../reducks/alerts/operations";
import { handleBringEditModalOpen } from "../reducks/modals/operations";
import ShowNestedAdd from "./ShowNestedAdd";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  subHeader: {
    display: "flex"
  }
}));

const ShowAdd = (props) => {
  console.log("-----ShowAdd");
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
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