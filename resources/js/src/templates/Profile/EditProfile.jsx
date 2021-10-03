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
  handleAppNameChange,
  handleImageChange,
  handleProfileChange,
  update,
} from '../../reducks/profiles/operations';
import { closeModalProfEdit, openModalProfEdit } from '../../reducks/modals/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
  },
  mobileRoot: {
    margin: theme.spacing(2),
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
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
  console.log('ModalProfile');
  const classes = useStyles();
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles);
  const modals = useSelector((state) => state.modals);

  const appName = profiles.appName;
  const profContent = profiles.profContent;
  const bolbUrl = profiles.profUrl;
  const errors = profiles.errors;

  const open = modals.modalProfEdit;

  return (
    <MenuItem>
      <MediaQuery minWidth={767}>
        <SimpleModal
          top={20}
          left={50}
          transX={50}
          width={600}
          modalOpen={openModalProfEdit}
          modalClose={closeModalProfEdit}
          open={open}
          nav={'プロフィールを編集する'}
          body={
            <>
              <form className={classes.root} noValidate autoComplete="off">
                <img src={bolbUrl} className={classes.bolb} />
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
                    error={errors.app_name !== undefined}
                    helperText={errors.app_name}
                    id="outlined-textarea"
                    label="表示名"
                    defaultValue={appName}
                    placeholder="Placeholder"
                    variant="outlined"
                    onChange={(event) => dispatch(handleAppNameChange(event))}
                  />
                  <TextField
                    error={errors.profile !== undefined}
                    helperText={errors.profile}
                    id="outlined-multiline-static"
                    label="プロフィール"
                    multiline
                    rows={6}
                    defaultValue={profContent}
                    variant="outlined"
                    onChange={(event) => dispatch(handleProfileChange(event))}
                  />
                  <Button
                    variant="contained"
                    className={classes.upImg}
                    startIcon={<CloudUploadIcon />}
                    onClick={() => dispatch(update())}
                  >
                    保存する
                  </Button>
                </div>
              </form>
            </>
          }
        />
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <SimpleModal
          top={20}
          left={50}
          transX={50}
          width={300}
          modalOpen={openModalProfEdit}
          modalClose={closeModalProfEdit}
          open={open}
          nav={'プロフィールを編集する'}
          body={
            <>
              <form className={classes.mobileRoot} noValidate autoComplete="off">
                <div className={classes.mobileTextForm}>
                  <div>
                    <img src={bolbUrl} className={classes.mobileBolb} />
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
                        <IconButton
                          className={classes.button}
                          aria-label="upload picture"
                          component="span"
                        >
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
                      defaultValue={appName}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handleAppNameChange(event))}
                    />
                    <TextField
                      error={errors.profile !== undefined}
                      helperText={errors.profile}
                      id="outlined-multiline-static"
                      label="プロフィール"
                      multiline
                      rows={6}
                      defaultValue={profContent}
                      variant="outlined"
                      onChange={(event) => dispatch(handleProfileChange(event))}
                    />
                    <Button
                      variant="contained"
                      className={classes.mobileUpImg}
                      startIcon={<CloudUploadIcon />}
                      onClick={() => dispatch(update())}
                    >
                      保存する
                    </Button>
                  </div>
                </div>
              </form>
            </>
          }
        />
      </MediaQuery>
    </MenuItem>
  );
});

export default EditProfile;
