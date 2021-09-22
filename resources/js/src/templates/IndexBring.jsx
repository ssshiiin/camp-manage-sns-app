import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import { ShowBring } from '../components';
import { useDispatch, useSelector } from 'react-redux';

import { CountAllBring, getBringGear, getCountAllBring } from '../reducks/bring_gears/operations';
import { Test } from '../components/Test';

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

const IndexBring = React.memo((props) => {
  console.log("index")
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const classes = useStyles();

  const user_id = props.user_id;

  const bring_gears = selector.bring_gears.bring_gears;

  useEffect(() => {
    dispatch(getBringGear(user_id));
  }, [])

  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <Test />
        }
        className={classes.root}
      >
        {bring_gears.map((bring_gear, i) =>
          <ShowBring bring_gear={bring_gear} key={i} />
        )}
      </List>
    </>
  )
})

export default IndexBring;