import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 0,
  },
});

const ProfileSlideNav = memo((props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const userId = props.userId;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
        <Tab
          label="Achievement"
          onClick={() => {
            dispatch(push(`/${userId}`));
          }}
        />
        <Tab
          label="Gear Lists"
          onClick={() => {
            dispatch(push(`/${userId}/gear`));
          }}
        />
      </Tabs>
    </Paper>
  );
});

export default ProfileSlideNav;
