import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';

import MoreHorizOutlined from '@material-ui/icons/MoreHorizOutlined';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { UseTemplates, CreateTemplates, EditBring } from './Bring';
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
    marginLeft: 'auto',
    display: 'flex',
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

const NavBring = () => {
  const [open, setOpen] = useState(null);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const classes = useStyles();

  return (
    <>
      <MediaQuery query="(min-width: 767px)">
        <div className={classes.pcRoot}>
          <MenuItem style={{ padding: 0, marginRight: 20 }}>
            <EditBring />
          </MenuItem>
          <MenuItem style={{ padding: 0, marginRight: 20 }}>
            <button type="submit" className={styles.button} onClick={handleClick}>
              テンプレート
            </button>
          </MenuItem>
          <StyledMenu id="customized-menu" anchorEl={open} keepMounted open={Boolean(open)} onClose={handleClose}>
            <MenuItem style={{ padding: 0 }}>
              <UseTemplates />
            </MenuItem>
            <MenuItem style={{ padding: 0 }}>
              <CreateTemplates />
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
