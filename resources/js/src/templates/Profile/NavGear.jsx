import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import { destroy } from '../../reducks/gears/operations';
import { destroy as saveGearsDestroy } from '../../reducks/save_gears/operations';
import { EditGear } from '.';
import { create } from '../../reducks/save_gears/operations';
import { checkNice } from '../../Function';

import styles from '../../../../sass/templates/nav.module.scss';

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
  console.log('navgear', props);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const loginUser = selector.users.user_id;
  const [open, setOpen] = useState(null);
  const [nice, setNice] = useState();
  const [count, setCount] = useState();

  useEffect(() => {
    const [nice, count] = checkNice(props.gear.save_gears, loginUser);
    setNice(nice);
    setCount(count);
  }, [props.gear.id]);

  const handleClick = (event) => {
    if (props.userId == loginUser) {
      setOpen(event.currentTarget);
    } else if (nice) {
      setNice(!nice);
      dispatch(saveGearsDestroy(props.gear.id));
    } else {
      setNice(!nice);
      dispatch(create(props.gear.id));
    }
  };

  const handleClose = () => {
    setOpen(null);
  };

  const classes = useStyles();

  console.log('check', props.gear.save_gears, checkNice(props.gear.save_gears, loginUser));

  return (
    <React.Fragment>
      <IconButton className={classes.settingIcon} aria-label="settings" onClick={handleClick}>
        {props.userId == loginUser ? <MoreVertIcon /> : nice ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      {props.userId == loginUser && (
        <StyledMenu id="customized-menu" anchorEl={open} keepMounted open={Boolean(open)} onClose={handleClose}>
          <MenuItem className={styles.menuItem}>
            <EditGear gear={props.gear} />
          </MenuItem>
          <MenuItem className={styles.menuItem}>
            <button type="submit" onClick={() => dispatch(destroy(props.gear.id))} className={styles.button__pull}>
              削除
            </button>
          </MenuItem>
        </StyledMenu>
      )}
    </React.Fragment>
  );
});

export default NavGear;
