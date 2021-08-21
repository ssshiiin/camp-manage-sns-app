import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SimpleModal from './SimpleModal';


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
    const [app_name, setApp_name] = useState(props.profile.app_name);
    const [profile, setProfile] = useState(props.profile.profile);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setApp_name(props.profile.app_name)
        setProfile(props.profile.profile)
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleApp_nameChange = (event) => {
        setApp_name(event.target.value);
    };
    
    const handleProfileChange = (event) => {
        setProfile(event.target.value);
    };
    
    const handleSubmit = (event) => {
        alert('保存しました');
        editProfile();
        event.preventDefault();
    }
    
    const editProfile = async () => {
        const response = axios.post(`api/edit/profile/${props.profile.id}`, 
        [app_name, profile]);
        props.getProfile();
    }
    
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
                    <MoreHorizIcon fontSize="large" />
                </Button>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem>
                        投稿する
                    </MenuItem>
                    <MenuItem>
                        ギアを登録する
                    </MenuItem>
                    <MenuItem>
                        <SimpleModal 
                        nav={"プロフィールを編集する"} 
                        body=
                            {
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <input type="text" value={app_name} onChange={handleApp_nameChange} /><br />
                                    <textarea  value={profile} onChange={handleProfileChange} />
                                </label>
                                <input type="submit" value="保存" />
                            </form>
                            }
                        />
                    </MenuItem>
                    <MenuItem>
                        設定
                    </MenuItem>
                </StyledMenu> 
                </div>
        </div>
    )
}

export default ProfilePostHeader;