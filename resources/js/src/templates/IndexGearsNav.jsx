import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MediaQuery from 'react-responsive';

import { useDispatch, useSelector } from 'react-redux';
import { IndexGears } from '../components';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'rgb(250, 250, 250)',
  },
  tab: {
    minWidth: 140,
    backgroundColor: 'rgb(250, 250, 250)',
  },
  mobileTab: {
    minWidth: 75,
    backgroundColor: 'rgb(250, 250, 250)',
  },
  pag: {
    backgroundColor: 'rgb(250, 250, 250)',
  },
  bar: {
    borderTop: '1px solid rgb(219, 219, 219)',
    borderBottom: '1px solid rgb(219, 219, 219)',
    boxShadow: 'none',
  },
}));

export default function IndexGearsNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const userId = props.match.params.id;
  const selector = useSelector((state) => state.gears);

  const categories = selector.gears;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" component="nav" className={classes.bar}>
        <MediaQuery query="(min-width: 767px)">
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
            {categories.map((category, i) => (
              <Tab label={category.category} className={classes.tab} key={i} />
            ))}
          </Tabs>
          {categories.map((category, i) => (
            <IndexGears userId={userId} category={category} index={i} value={value} key={i} />
          ))}
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
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
            {categories.map((category, i) => (
              <Tab label={category.category} className={classes.mobileTab} key={i} />
            ))}
          </Tabs>
          {categories.map((category, i) => (
            <IndexGears userId={userId} category={category} index={i} value={value} key={i} />
          ))}
        </MediaQuery>
      </AppBar>
    </div>
  );
}
