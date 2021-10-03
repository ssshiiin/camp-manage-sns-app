import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import { destroy } from '../../reducks/gears/operations';
import { EditGear } from '.';
import { create } from '../../reducks/save_gears/operations';

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
  const loginUser = selector.users.user_id;
  const [open, setOpen] = useState(null);

  const handleClick = (event) => {
    if (props.userId == loginUser) {
      setOpen(event.currentTarget);
    } else {
      dispatch(create(props.gearId));
    }
  };

  const handleClose = () => {
    setOpen(null);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <IconButton className={classes.settingIcon} aria-label="settings" onClick={handleClick}>
        {props.userId == loginUser ? <MoreVertIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      {props.userId == loginUser && (
        <StyledMenu
          id="customized-menu"
          anchorEl={open}
          keepMounted
          open={Boolean(open)}
          onClose={handleClose}
        >
          <EditGear gearId={props.gearId} />
          <MenuItem onClick={() => dispatch(destroy(props.gearId))}>削除</MenuItem>
        </StyledMenu>
      )}
    </React.Fragment>
  );
});

export default NavGear;
