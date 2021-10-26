import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { ShowBring } from '../components';
import { useDispatch, useSelector } from 'react-redux';

import { FlexListSubheader } from '../components/Header';
import { getBring, updateBringCheck } from '../reducks/bring_gears/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'static',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    padding: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const IndexBring = () => {
  console.log('indexBring');
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const classes = useStyles();

  const userId = selector.users.user_id;
  const bringGears = selector.bring_gears.brings;
  const bringsCountAll = selector.bring_gears.brings_count_all;
  const bringsCountTrue = selector.bring_gears.brings_count_true;

  useEffect(() => {
    if (typeof userId !== 'undefined') {
      dispatch(getBring(userId));
    }
  }, [userId]);

  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <div style={{ display: 'flex', padding: '16px 16px' }}>
            <FlexListSubheader title={'持ち物リスト'} countTrue={bringsCountTrue} countAll={bringsCountAll} />
          </div>
        }
        className={classes.root}
      >
        <Divider />
        {bringGears.map((category, i) => (
          <ShowBring category={category} update={updateBringCheck} mode={'Bring'} key={i} />
        ))}
      </List>
    </>
  );
};

export default IndexBring;
