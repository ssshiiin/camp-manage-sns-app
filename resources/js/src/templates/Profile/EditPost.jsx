import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { alpha } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';

import { SimpleModal } from '../../components/Modal';
import {
  handleContentChange,
  handleDayChange,
  handleImageChange,
  handlePlaceChange,
  update,
} from '../../reducks/posts/operations';
import { closeModalPostEdit, openModalPostEdit } from '../../reducks/modals/operations';
import MediaQuery from 'react-responsive';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
    minWidth: 300,
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
    minWidth: 800,
    width: 800,
    objectFit: 'cover',
  },
  mobileBolb: {
    minWidth: 300,
    width: 300,
    objectFit: 'cover',
  },
  buttonRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
    textAlign: 'right',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#1876d1',
    color: 'white',
  },
  input: {
    display: 'none',
  },
  upImg: {
    margin: theme.spacing(2),
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
    flexDirection: 'column',
    width: 'calc(100% - 32px)',
  },
}));

const EditPost = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const modals = useSelector((state) => state.modals);

  const place = posts.place;
  const day = posts.day;
  const content = posts.content;
  const bolbUrl = posts.bolbUrl;
  const errors = posts.errors;

  const open = modals.modalPostEdit;

  console.log(posts);

  return (
    <MenuItem>
      <MediaQuery query="(min-width: 767px)">
        <SimpleModal
          top={20}
          left={50}
          transX={50}
          modalOpen={openModalPostEdit}
          modalClose={closeModalPostEdit}
          open={open}
          nav={'編集する'}
          body={
            <>
              <img src={bolbUrl} className={classes.bolb} />
              <form className={classes.root} noValidate autoComplete="off">
                <div className={classes.textForm}>
                  <div>
                    {errors.img && (
                      <>
                        <Typography variant="body2" color="error" align="center">
                          {errors.img}
                        </Typography>
                      </>
                    )}
                  </div>
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
                  <TextField
                    error={errors.place !== undefined}
                    helperText={errors.place}
                    id="outlined-textarea"
                    label="キャンプ場"
                    defaultValue={place}
                    placeholder="ふもとっぱら"
                    variant="outlined"
                    onChange={(event) => dispatch(handlePlaceChange(event))}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="date-picker-dialog"
                      label="日付"
                      format="yyyy/MM/dd"
                      value={day}
                      variant="outlined"
                      disableFuture="true"
                      onChange={(date) => dispatch(handleDayChange(date))}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    error={errors.content !== undefined}
                    helperText={errors.content}
                    id="outlined-multiline-static"
                    label="キャプション"
                    multiline
                    rows={6}
                    defaultValue={content}
                    variant="outlined"
                    onChange={(event) => dispatch(handleContentChange(event))}
                  />
                  <Button
                    variant="contained"
                    className={classes.upImg}
                    startIcon={<CloudUploadIcon />}
                    onClick={() => {
                      dispatch(update(props.post.id));
                      // handleClose();
                      // props.menuClose();
                    }}
                  >
                    保存する
                  </Button>
                </div>
              </form>
            </>
          }
        />
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <SimpleModal
          top={20}
          left={50}
          transX={50}
          width={300}
          modalOpen={openModalPostEdit}
          modalClose={closeModalPostEdit}
          open={open}
          nav={'編集する'}
          body={
            <>
              <img src={bolbUrl} className={classes.mobileBolb} />
              <form className={classes.mobileRoot} noValidate autoComplete="off">
                <div className={classes.mobileTextForm}>
                  <div>
                    {errors.img && (
                      <>
                        <Typography variant="body2" color="error" align="center">
                          {errors.img}
                        </Typography>
                      </>
                    )}
                  </div>
                  <div className={classes.buttonRoot}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                      onChange={(event) => dispatch(handleImageChange(event))}
                      multiple
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
                  <TextField
                    error={errors.place !== undefined}
                    helperText={errors.place}
                    id="outlined-textarea"
                    label="キャンプ場"
                    defaultValue={place}
                    placeholder="ふもとっぱら"
                    variant="outlined"
                    onChange={(event) => dispatch(handlePlaceChange(event))}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="日付"
                      format="yyyy/MM/dd"
                      value={day}
                      variant="outlined"
                      disableFuture="true"
                      onChange={(date) => dispatch(handleDayChange(date))}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    error={errors.content !== undefined}
                    helperText={errors.content}
                    id="outlined-multiline-static"
                    label="キャプション"
                    multiline
                    rows={6}
                    defaultValue={content}
                    variant="outlined"
                    onChange={(event) => dispatch(handleContentChange(event))}
                  />
                  <Button
                    variant="contained"
                    className={classes.upImg}
                    startIcon={<CloudUploadIcon />}
                    onClick={() => {
                      handleClose();
                      props.menuClose();
                      dispatch(update(props.post.id));
                    }}
                  >
                    保存する
                  </Button>
                </div>
              </form>
            </>
          }
        />
      </MediaQuery>
    </MenuItem>
  );
});

export default EditPost;
