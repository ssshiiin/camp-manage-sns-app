import React, { useState, useEffect, memo } from 'react';

import MoreHorizOutlined from '@material-ui/icons/MoreHorizOutlined';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MediaQuery from 'react-responsive';

import { CreatePost, EditProfile, CreateGear } from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../sass/templates/nav.module.scss';

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
  pcRoot: {
    height: 80,
    display: 'flex',
    marginLeft: 'auto',
  },
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

const NavProfile = (props) => {
  console.log('nav profile');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const userId = props.userId;
  const loginUser = users.user_id;

  const [csrf_token, setCsrf_token] = useState(document.head.querySelector('meta[name="csrf-token"]').content);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  if (userId == loginUser) {
    return (
      <>
        <MediaQuery query="(min-width: 767px)">
          <div className={classes.pcRoot}>
            <MenuItem style={{ padding: 0, marginRight: 20 }}>
              <CreatePost menuClose={handleClose} />
            </MenuItem>
            <MenuItem style={{ padding: 0, marginRight: 20 }}>
              <CreateGear menuClose={handleClose} />
            </MenuItem>
            <MenuItem style={{ padding: 0, marginRight: 20 }}>
              <EditProfile />
            </MenuItem>
            <MenuItem style={{ padding: 0, marginRight: 20 }}>
              <form className={classes.form} noValidate method="POST" action="/logout">
                <input type="hidden" name="_token" value={csrf_token} />
                <button type="submit" className={styles.button}>
                  ログアウト
                </button>
              </form>
            </MenuItem>
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
              <MenuItem style={{ padding: 0 }}>
                <CreatePost menuClose={handleClose} />
              </MenuItem>
              <MenuItem style={{ padding: 0 }}>
                <CreateGear menuClose={handleClose} />
              </MenuItem>
              <MenuItem style={{ padding: 0 }}>
                <EditProfile />
              </MenuItem>
              <MenuItem style={{ padding: 0 }}>
                <form className={classes.form} noValidate method="POST" action="/logout">
                  <input type="hidden" name="_token" value={csrf_token} />
                  <button type="submit" className={styles.button}>
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
};

export default NavProfile;
