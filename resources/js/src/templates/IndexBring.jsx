import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import { ShowBring } from '../components';
import { useDispatch, useSelector } from 'react-redux';

import { getBringGear, getCountAllBring } from '../reducks/bring_gears/operations';

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

const IndexBring = (props) => {
  console.log('IndexBring')
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const classes = useStyles();

  const user_id = props.user_id;

  const bring_gears = selector.bring_gears.bring_gears;
  const count_all = selector.bring_gears.count_all;

  useEffect(() => {
    dispatch(getBringGear(user_id));
    dispatch(getCountAllBring(user_id));
  }, [])

  return (
    <>
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
    </>
  )
}

export default IndexBring;