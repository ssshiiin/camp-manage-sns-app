import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { ShowBring } from '../components';
import { useDispatch, useSelector } from 'react-redux';

import {
  CountAllBring,
  getBringGear,
  getCountAllBring,
} from '../reducks/bring_gears/operations';
import { AllSelected, FlexListSubheader } from '../components/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'static',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const IndexBring = React.memo((props) => {
  console.log('indexBring');
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const classes = useStyles();

  const user_id = selector.users.user_id;
  const bringGears = selector.bring_gears.bring_gears;
  const countBring = selector.bring_gears.count_all;

  useEffect(() => {
    if (typeof user_id !== 'undefined') {
      dispatch(getBringGear(user_id));
    }
  }, [user_id]);

  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <div style={{ display: 'flex', padding: '16px 16px' }}>
            <FlexListSubheader
              title={'持ち物リスト'}
              countTrue={countBring.countTrue}
              countAll={countBring.countAll}
            />
          </div>
        }
        className={classes.root}
      >
        <Divider />
        {bringGears.map((category, i) => (
          <ShowBring
            category={category}
            type={'Bring'}
            mode={'Bring'}
            key={i}
          />
        ))}
      </List>
    </>
  );
});

export default IndexBring;
