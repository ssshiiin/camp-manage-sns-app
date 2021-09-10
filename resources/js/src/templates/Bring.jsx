import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
import { ShowBring } from '../components';
import { useDispatch, useSelector } from 'react-redux';

import { getAddBringGear, getBringGear, getCountAllAdd, getCountAllBring } from '../reducks/bring_gears/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "static",
    backgroundColor: theme.palette.background.paper,
    width: 910
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const Bring = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = props.match.params.id;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(0);

  const bring_gears = selector.bring_gears.bring_gears;
  const count_all = selector.bring_gears.count_all;
  const [count, setCount] = useState(0);
  const [templates, setTemplates] = useState([]);

  console.log(selector)

  useEffect(() => {
    dispatch(getBringGear(user_id));
    dispatch(getAddBringGear(user_id));
    dispatch(getCountAllBring(user_id));
    dispatch(getCountAllAdd(user_id));
    // getTemplates();
  }, [])

  const handleClick = () => {
    setOpen(!open);
  };

  const allDeleteBringGear = async () => {
    const response = await axios.post(`/api/all/delete/bring_gears/${user_id}`);
    setCategories(response.data.data);
    getCountBring();
  }

  const createTemplates = async (template_name) => {
    const response = await axios.post(`/api/create/templates/${user_id}`
      , [categories, template_name]);
    getTemplates();
  }

  const useTemplates = async (useTemplate_name) => {
    const response = await axios.post(`/api/templates/use/${user_id}`
      , [useTemplate_name]);
    setCategories(response.data.data);
    getTemplates();
  }

  const deleteTemplate = async (deleteTemplate_name) => {
    const response = await axios.post(`/api/templates/delete/${user_id}`
      , [deleteTemplate_name]);

    getTemplates();
    getGear();
    getCountBring();
  }

  const getTemplates = async () => {
    const response = await axios.get(`/api/templates/${user_id}`);

    setTemplates(response.data);
    getCountBring();
  }

  return (
    <div className="gear">
      <div className="gear-main">
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <>
              <ListSubheader component="div" id="gearList">
                {count_all.countTrue}/{count_all.countAll}  selected
              </ListSubheader>
            </>
          }
          className={classes.root}
        >
          {bring_gears.map((bring_gear, i) =>
            <ShowBring bring_gear={bring_gear} key={i} />
          )}
        </List>
      </div>
    </div>
  )
}

export default Bring;