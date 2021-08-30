import React, { useState, useEffect } from 'react';

import MoreHorizOutlined from '@material-ui/icons/MoreHorizOutlined';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import EditProfile from './EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import { MenuAction } from '../reducks/users/actions';



const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
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
  root: {
    height: 80,
    position: "relative"
  },
  NavButton: {
    position: "absolute",
    top: "50%",
    right: "20px",
    transform: "translate(0, -50%)",
    backgroundColor: "rgb(100, 100, 100)",
    color: "white"
  }

}));

function ProfileHeader(props) {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = props.match.params.id;
  const open = selector.users.menu_open;

  const handleClick = (event) => {
    dispatch(MenuAction({
      menu_open: event.currentTarget
    }))
  };

  const handleClose = () => {
    dispatch(MenuAction({
      menu_open: null
    }));
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        className={classes.NavButton}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        <MoreHorizOutlined fontSize="large" />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={open}
        keepMounted
        open={Boolean(open)}
        onClose={handleClose}
      >
        <EditProfile
          user_id={user_id}
        />
        <MenuItem>
          設定
        </MenuItem>
      </StyledMenu>
    </div>
  )
}

export default ProfileHeader;