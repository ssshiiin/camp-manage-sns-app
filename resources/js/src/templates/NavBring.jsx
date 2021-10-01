import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';

import MoreHorizOutlined from '@material-ui/icons/MoreHorizOutlined';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

import { MenuAction } from '../reducks/users/actions';
import { UseTemplates, CreateTemplates, EditBring } from './Bring';

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
    marginLeft: 'auto',
  },
  navButton: {
    top: '50%',
    transform: 'translate(0, -50%)',
    backgroundColor: 'white',
    color: 'black',
    marginRight: 20,
  },
  mobileRoot: {
    height: 60,
    marginLeft: 'auto',
  },
  mobileNavButton: {
    top: '50%',
    transform: 'translate(0, -50%)',
    backgroundColor: 'darkslategray',
    color: 'white',
    marginRight: 20,
  },
}));

const NavBring = () => {
  console.log('Nav');
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const open = selector.users.menu_open;

  const handleClick = (event) => {
    dispatch(
      MenuAction({
        menu_open: event.currentTarget,
      })
    );
  };

  const handleClose = () => {
    dispatch(
      MenuAction({
        menu_open: null,
      })
    );
  };

  const classes = useStyles();

  return (
    <>
      <MediaQuery query="(min-width: 767px)">
        <div className={classes.root}>
          <Button
            className={classes.navButton}
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizOutlined fontSize="large" />
          </Button>
          <StyledMenu id="customized-menu" anchorEl={open} keepMounted open={Boolean(open)} onClose={handleClose}>
            <EditBring />
            <UseTemplates />
            <CreateTemplates />
          </StyledMenu>
        </div>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <div className={classes.mobileRoot}>
          <Button
            className={classes.mobileNavButton}
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizOutlined fontSize="large" />
          </Button>
          <StyledMenu id="customized-menu" anchorEl={open} keepMounted open={Boolean(open)} onClose={handleClose}>
            <EditBring />
            <UseTemplates />
            <CreateTemplates />
          </StyledMenu>
        </div>
      </MediaQuery>
    </>
  );
};

export default NavBring;
