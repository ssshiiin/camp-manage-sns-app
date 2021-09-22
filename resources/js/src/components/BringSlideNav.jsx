import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    borderBottom: "1px solid rgb(219, 219, 219)"
  },
});

const ProfileSlideNav = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const user_id = selector.users.user_id;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="持ち物リスト" onClick={() => { dispatch(push(`/${user_id}/bring`)) }} style={{ width: "50%", maxWidth: "auto" }} />
        <Tab label="欲しいものリスト" onClick={() => { dispatch(push(`/${user_id}/bring/save`)) }} style={{ width: "50%", maxWidth: "auto" }} />
      </Tabs>
    </Paper>
  )
}

export default ProfileSlideNav;