import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useDispatch, useSelector } from 'react-redux';
import { getGears } from '../reducks/gears/operations';
import { IndexGears } from '../components';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: "rgb(250, 250, 250)",
  },
  tab: {
    minWidth: 140,
    backgroundColor: "rgb(250, 250, 250)",
  },
  pag: {
    backgroundColor: "rgb(250, 250, 250)",
  },
  bar: {
    borderTop: "1px solid rgb(219, 219, 219)",
    borderBottom: "1px solid rgb(219, 219, 219)",
    boxShadow: "none",
  }
}));

export default function IndexGearsNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const user_id = props.match.params.id;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const categories = selector.gears.gears;

  useEffect(() => {
    dispatch(getGears(user_id));
  }, [user_id]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" component="nav" className={classes.bar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="category nav"
          className={classes.pag}
        >
          {categories.map((category, i) =>
            <Tab label={category.category} {...a11yProps(i)} className={classes.tab} key={i} />
          )}
        </Tabs>
        {categories.map((category, i) =>
          <IndexGears user_id={user_id} category={category} index={i} value={value} key={i} />
        )}
      </AppBar>
    </div>
  );
}
