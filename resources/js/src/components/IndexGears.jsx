import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { CardGear } from './Card';

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography className={classes.tabPanel} component={'span'}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  tabPanel: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    display: 'flex',
    width: '44%',
    margin: 24,
  },
  details: {
    minWidth: '40%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 0px 16px 16px',
  },
  cover: {
    width: 190,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const IndexGears = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userId = props.userId;
  const category = props.category;
  const index = props.index;
  const value = props.value;

  return (
    <React.Fragment>
      <TabPanel value={value} index={index}>
        {category.gears.map((gear, i) => (
          <CardGear userId={userId} gear={gear} key={i} />
        ))}
      </TabPanel>
    </React.Fragment>
  );
};

export default IndexGears;
