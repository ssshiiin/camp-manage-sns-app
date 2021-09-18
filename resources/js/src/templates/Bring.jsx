import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import { ShowBring } from '../components';
import { useDispatch, useSelector } from 'react-redux';

import { getAddBringGear, getBringGear, getCountAllAdd, getCountAllBring } from '../reducks/bring_gears/operations';
import { getTemplates } from '../reducks/templates/operations';
import ScrollToTopOnMount from './ScrollToTopOnMount';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "static",
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const Bring = (props) => {
  console.log("-----Bring");
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = props.match.params.id;
  const classes = useStyles();

  const bring_gears = selector.bring_gears.bring_gears;
  const count_all = selector.bring_gears.count_all;

  useEffect(() => {
    dispatch(getBringGear(user_id));
    dispatch(getAddBringGear(user_id));
    dispatch(getCountAllBring(user_id));
    dispatch(getCountAllAdd(user_id));
    dispatch(getTemplates(user_id));
  }, [])

  const deleteTemplate = async (deleteTemplate_name) => {
    const response = await axios.post(`/api/templates/delete/${user_id}`
      , [deleteTemplate_name]);

    getTemplates();
    getGear();
    getCountBring();
  }

  return (
    <>
      <ScrollToTopOnMount />
      <div className="gear">
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
    </>
  )
}

export default Bring;