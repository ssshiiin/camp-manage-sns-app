import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";


import { SimpleModal } from '../components';
import { handleApp_nameChange, handleImageChange, handleProfileChange, handleSubmit } from '../reducks/users/operations';
import { handleProfEditModalOpen, ModalClose } from '../reducks/modals/operations';
import { handleAlertClose, handleAlertOpen } from '../reducks/alerts/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  bolb: {
    width: 160,
    height: 160,
    borderRadius: "100%",
    objectFit: "cover"
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#1876d1",
    color: "white"
  },
  buttonRoot: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  },
  upImg: {
    marginTop: 190,
    backgroundColor: "#1876d1",
    color: "white"
  },
  textForm: {
    display: "flex",
    flexDirection: "column"
  }
}));

const EditProfile = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const app_name = selector.users.app_name;
  const prof_content = selector.users.prof_content;
  const prof_bolb_url = selector.users.prof_bolb_url;
  const open = selector.modals.modal_prof_edit_open;
  const alertOpen = selector.alerts.open;

  return (
    <MenuItem>
      <SimpleModal
        alertOpen={alertOpen}
        handleAlertOpen={handleAlertOpen}
        handleAlertClose={handleAlertClose}
        modalOpen={handleProfEditModalOpen}
        open={open}
        nav={"プロフィールを編集する"}
        body=
        {
          <form className={classes.root} noValidate autoComplete="off">
            {prof_bolb_url &&
              <img src={prof_bolb_url} className={classes.bolb} />
            }
            <div className={classes.buttonRoot}>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(event) => dispatch(handleImageChange(event))}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  className={classes.button}
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            <div className={classes.textForm}>
              <TextField
                id="outlined-textarea"
                label="表示名"
                defaultValue={app_name}
                placeholder="Placeholder"
                variant="outlined"
                onChange={(event) => dispatch(handleApp_nameChange(event))}
              />
              <TextField
                id="outlined-multiline-static"
                label="プロフィール"
                multiline
                rows={6}
                defaultValue={prof_content}
                variant="outlined"
                onChange={(event) => dispatch(handleProfileChange(event))}
              />
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.upImg}
                startIcon={<CloudUploadIcon />}
                onClick={() => dispatch(handleSubmit())}
              >
                保存する
              </Button>
            </div>
          </form>
        }
      />
    </MenuItem>
  )
})

export default EditProfile;