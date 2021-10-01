import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';

import MediaQuery from 'react-responsive';

import { SimpleModal } from '../../components/Modal';
import {
  handleApp_nameChange,
  handleImageChange,
  handleProfileChange,
  handleSubmit,
} from '../../reducks/users/operations';
import { handleProfEditModalOpen, ModalClose } from '../../reducks/modals/operations';
import { handleAlertClose, handleAlertOpen } from '../../reducks/alerts/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
  },
  mobileRoot: {
    margin: theme.spacing(4),
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
    minWidth: 300,
  },
  bolb: {
    minWidth: 160,
    width: 160,
    height: 160,
    borderRadius: '100%',
    objectFit: 'cover',
    border: 'solid 1px rgb(219, 219, 219)',
  },
  mobileBolb: {
    margin: 10,
    width: 80,
    height: 80,
    borderRadius: '100%',
    objectFit: 'cover',
    border: 'solid 1px rgb(219, 219, 219)',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#1876d1',
    color: 'white',
  },
  buttonRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
    textAlign: 'right',
  },
  input: {
    display: 'none',
  },
  upImg: {
    backgroundColor: '#1876d1',
    color: 'white',
    margin: theme.spacing(2),
  },
  mobileUpImg: {
    margin: theme.spacing(1),
    backgroundColor: '#1876d1',
    color: 'white',
  },
  textForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  mobileTextForm: {
    display: 'flex',
  },
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
  const errors = selector.users.errors;

  console.log(selector.users);

  return (
    <MenuItem>
      <SimpleModal
        top={20}
        left={50}
        transX={50}
        width={600}
        alertOpen={alertOpen}
        handleAlertOpen={handleAlertOpen}
        handleAlertClose={handleAlertClose}
        modalOpen={handleProfEditModalOpen}
        open={open}
        nav={'プロフィールを編集する'}
        body={
          <>
            <MediaQuery minWidth={767}>
              <form className={classes.root} noValidate autoComplete="off">
                <img src={prof_bolb_url} className={classes.bolb} />
                {errors.img && (
                  <>
                    <Typography variant="body2" color="error" align="center">
                      {errors.img}
                    </Typography>
                  </>
                )}
                <div className={classes.buttonRoot}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={(event) => dispatch(handleImageChange(event))}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton className={classes.button} aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
                <div className={classes.textForm}>
                  <TextField
                    error={errors.app_name !== undefined}
                    helperText={errors.app_name}
                    id="outlined-textarea"
                    label="表示名"
                    defaultValue={app_name}
                    placeholder="Placeholder"
                    variant="outlined"
                    onChange={(event) => dispatch(handleApp_nameChange(event))}
                  />
                  <TextField
                    error={errors.profile !== undefined}
                    helperText={errors.profile}
                    id="outlined-multiline-static"
                    label="プロフィール"
                    multiline
                    rows={6}
                    defaultValue={prof_content}
                    variant="outlined"
                    onChange={(event) => dispatch(handleProfileChange(event))}
                  />
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
            </MediaQuery>
            <MediaQuery maxWidth={767}>
              <form className={classes.mobileRoot} noValidate autoComplete="off">
                <div className={classes.mobileTextForm}>
                  <div>
                    <img src={prof_bolb_url} className={classes.mobileBolb} />
                    {errors.img && (
                      <>
                        <Typography variant="body2" color="error" align="center">
                          {errors.img}
                        </Typography>
                      </>
                    )}
                    <div className={classes.buttonRoot}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={(event) => dispatch(handleImageChange(event))}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton className={classes.button} aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </div>
                  </div>
                  <div className={classes.textForm}>
                    <TextField
                      error={errors.app_name !== undefined}
                      helperText={errors.app_name}
                      id="outlined-textarea"
                      label="表示名"
                      defaultValue={app_name}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handleApp_nameChange(event))}
                    />
                    <TextField
                      error={errors.profile !== undefined}
                      helperText={errors.profile}
                      id="outlined-multiline-static"
                      label="プロフィール"
                      multiline
                      rows={6}
                      defaultValue={prof_content}
                      variant="outlined"
                      onChange={(event) => dispatch(handleProfileChange(event))}
                    />
                    <Button
                      variant="contained"
                      className={classes.mobileUpImg}
                      startIcon={<CloudUploadIcon />}
                      onClick={() => dispatch(handleSubmit())}
                    >
                      保存する
                    </Button>
                  </div>
                </div>
              </form>
            </MediaQuery>
          </>
        }
      />
    </MenuItem>
  );
});

export default EditProfile;
