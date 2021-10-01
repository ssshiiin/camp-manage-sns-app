import React, { useState, useEffect } from 'react';

import MoreHorizOutlined from '@material-ui/icons/MoreHorizOutlined';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive';

import { CreatePost, EditProfile, CreateGear } from './Profile';
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

function NavProfile(props) {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = props.user_id;
  const login_user = selector.users.user_id;
  const open = selector.users.menu_open;
  const [csrf_token, setCsrf_token] = useState(document.head.querySelector('meta[name="csrf-token"]').content);

  const app_name = selector.users.app_name;

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

  if (user_id == login_user) {
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
              <CreatePost />
              <CreateGear />
              <EditProfile />
              <MenuItem>
                <form className={classes.form} noValidate method="POST" action="/logout">
                  <input type="hidden" name="_token" value={csrf_token} />
                  <button
                    type="submit"
                    style={{ border: 'none', backgroundColor: 'white', minWidth: '180px', textAlign: 'left' }}
                  >
                    ログアウト
                  </button>
                </form>
              </MenuItem>
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
              <CreatePost />
              <CreateGear />
              <EditProfile />
              <MenuItem>
                <form className={classes.form} noValidate method="POST" action="logout">
                  <input type="hidden" name="_token" value={csrf_token} />
                  <button
                    type="submit"
                    style={{ border: 'none', backgroundColor: 'white', minWidth: '120px', textAlign: 'left' }}
                  >
                    ログアウト
                  </button>
                </form>
              </MenuItem>
            </StyledMenu>
          </div>
        </MediaQuery>
      </>
    );
  } else {
    return null;
  }
}

export default NavProfile;
