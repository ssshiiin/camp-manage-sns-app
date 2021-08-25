import React, { useState, useEffect } from 'react';

import MoreHorizOutlined from '@material-ui/icons/MoreHorizOutlined';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SimpleModal from '../ReactUI/SimpleModal';
import EditProfile from './EditProfile';
import CreatePost from './CreatePost';
import CreateGear from './CreateGear';


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
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function ProfilePostHeader(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const classes = useStyles();
    
    return (
        <div className="title">
            <div className="GearBringNav">
                <Button
                    className="BringNavButton"
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={handleClick}
                    style={{border: 'none', backgroundColor: 'white'}}
                >
                    <MoreHorizOutlined fontSize="large" />
                </Button>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <CreatePost 
                        user_id={props.user_id} 
                        getUserPosts={props.getUserPosts}
                    />
                    <MenuItem>
                        ギアを登録する
                    </MenuItem>
                    <EditProfile 
                        user_id={props.user_id} 
                        profile={props.profile}
                        getProfile={props.getProfile}
                    />
                    <MenuItem>
                        設定
                    </MenuItem>
                </StyledMenu> 
                </div>
        </div>
    )
}

export default ProfilePostHeader;