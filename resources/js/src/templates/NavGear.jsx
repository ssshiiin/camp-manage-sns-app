import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MediaQuery from 'react-responsive';

import { useDispatch, useSelector } from 'react-redux';
import { deleteGear } from '../reducks/gears/operations';
import { EditGear } from './Profile';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { createSaveGears } from '../reducks/save_gears/operations';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    color: 'black',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  settingIcon: {
    height: 50,
    marginLeft: 'auto',
  },
}));

const NavGear = React.forwardRef((props, ref) => {
  console.log(props);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const login_user = selector.users.user_id;
  const [open, setOpen] = useState(null);

  const handleClick = (event) => {
    if (props.user_id == login_user) {
      setOpen(event.currentTarget);
    } else {
      dispatch(createSaveGears(props.gear_id));
    }
  };

  const handleClose = () => {
    setOpen(null);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <IconButton className={classes.settingIcon} aria-label="settings" onClick={handleClick}>
        {props.user_id == login_user ? <MoreVertIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      {props.user_id == login_user && (
        <StyledMenu id="customized-menu" anchorEl={open} keepMounted open={Boolean(open)} onClose={handleClose}>
          <EditGear gear_id={props.gear_id} />
          <MenuItem onClick={() => dispatch(deleteGear(props.gear_id))}>削除</MenuItem>
        </StyledMenu>
      )}
    </React.Fragment>
  );
});

export default NavGear;
