import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../reducks/posts/operations';
import { handlePostNavClose } from '../reducks/menus/operations';
import { EditPost } from './Profile';
import MediaQuery from 'react-responsive';

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
  root: {
    height: 80,
    position: 'relative',
  },
  NavButton: {
    position: 'absolute',
    top: '50%',
    right: '20px',
    transform: 'translate(0, -50%)',
    backgroundColor: 'white',
    color: 'black',
  },
}));

const NavPost = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const open = selector.menus.post_nav;

  const classes = useStyles();

  return (
    <React.Fragment>
      <StyledMenu
        id="customized-menu"
        anchorEl={open}
        keepMounted
        open={Boolean(open)}
        onClose={() => dispatch(handlePostNavClose())}
      >
        <EditPost post_id={props.post_id} />
        <MenuItem onClick={() => dispatch(deletePost(props.post_id))}>削除</MenuItem>
      </StyledMenu>
    </React.Fragment>
  );
});

export default NavPost;
