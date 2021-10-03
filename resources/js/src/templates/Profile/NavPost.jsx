import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import { destroy } from '../../reducks/posts/operations';
import { EditPost } from '.';

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loginUser = users.user_id;

  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    if (loginUser === props.post.user_id) {
      setOpen(event.currentTarget);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu id="customized-menu" anchorEl={open} keepMounted open={Boolean(open)} onClose={handleClose}>
        <EditPost post={props.post} menuClose={handleClose} />
        <MenuItem onClick={() => dispatch(destroy(props.post.id))}>削除</MenuItem>
      </StyledMenu>
    </React.Fragment>
  );
});

export default NavPost;
