import React, { useState, useEffect, memo, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import MediaQuery from 'react-responsive';

import { SimpleModal } from '../../components/Modal';
import {
  create,
  handleContentChange,
  handleDayChange,
  handleImageChange,
  handlePlaceChange,
} from '../../reducks/posts/operations';
import { closeModalPostCreate, openModalPostCreate } from '../../reducks/modals/operations';
import { handleAlertClose, handleAlertOpen } from '../../reducks/alerts/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
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
    maxHeight: 168,
    objectFit: 'cover',
    borderBottom: 'solid 1px rgb(219, 219, 219)',
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
}));

const CreatePost = memo(
  forwardRef((props, ref) => {
    console.log('ModalPost');
    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const modals = useSelector((state) => state.modals);

    const place = posts.place;
    const day = posts.day;
    const content = posts.content;
    const bolbUrl = posts.bolbUrl;
    const errors = posts.errors;

    const open = modals.modalPostCreate;

    return (
      <MenuItem>
        <SimpleModal
          top={20}
          left={50}
          transX={50}
          modalOpen={openModalPostCreate}
          modalClose={closeModalPostCreate}
          open={open}
          nav={'投稿する'}
          body={
            <>
              <MediaQuery query="(min-width: 767px)">
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
                        <IconButton className={classes.button} aria-label="upload picture" component="span">
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
                        dispatch(create());
                      }}
                    >
                      保存する
                    </Button>
                  </div>
                </form>
              </MediaQuery>
              <MediaQuery query="(max-width: 767px)">
                <form className={classes.root} noValidate autoComplete="off">
                  <div className={classes.textForm}>
                    <div>
                      <img src={bolbUrl} className={classes.mobileBolb} />
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
                        <IconButton className={classes.button} aria-label="upload picture" component="span">
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
                      <Grid container justifyContent="space-around">
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
                      </Grid>
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
                        dispatch(create());
                      }}
                    >
                      保存する
                    </Button>
                  </div>
                </form>
              </MediaQuery>
            </>
          }
        />
      </MenuItem>
    );
  })
);
export default CreatePost;
