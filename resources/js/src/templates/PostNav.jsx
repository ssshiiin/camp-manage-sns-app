import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../reducks/posts/operations';

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
    backgroundColor: "white",
    color: "black"
  }

}));

const PostNav = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const classes = useStyles();
  console.log(props);

  const handleClose = () => {
    props.setOpen(null);
  };

  return (
    <React.Fragment>
      <StyledMenu
        id="customized-menu"
        anchorEl={props.open}
        keepMounted
        open={Boolean(props.open)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => dispatch(deletePost(props.post_id))}>
          削除
        </MenuItem>
        <MenuItem>
          編集する
        </MenuItem>
        <MenuItem>
          設定
        </MenuItem>
      </StyledMenu>
    </React.Fragment >
  )
})

export default PostNav;