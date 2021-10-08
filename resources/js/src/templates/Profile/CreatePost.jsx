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
import { create } from '../../reducks/posts/operations';
import { closeModalPostCreate, openModalPostCreate } from '../../reducks/modals/operations';
import { InputText, SelectDate, SubmitButton, UploadButton } from '../../components/Form';
import { useDate, useString, useImage } from '../../Function';

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

const CreatePost = memo(
  forwardRef((props, ref) => {
    console.log('ModalPost');
    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const modals = useSelector((state) => state.modals);

    const [place, handlePlace] = useString();
    const [date, handleDate] = useDate(null);
    const [content, handleContent] = useString();
    const [bolb, image, handleImage] = useImage();
    const errors = posts.postCreateErrors;

    const open = modals.modalPostCreate;

    return (
      <MenuItem>
        <MediaQuery query="(min-width: 767px)">
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
                <img src={bolb} className={classes.bolb} />
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
                      <UploadButton onChange={handleImage} />
                    </div>
                    <InputText
                      value={place}
                      onChange={handlePlace}
                      placeholder={'キャンプ場'}
                      label={'ふもとっぱら'}
                      error={errors.place}
                    />
                    <SelectDate value={date} onChange={handleDate} label={'日付'} />
                    <InputText
                      value={content}
                      onChange={handleContent}
                      label={'キャプション'}
                      error={errors.content}
                      multiline={true}
                      rows={6}
                    />
                    <SubmitButton label={'保存する'} onClick={create} />
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
            modalOpen={openModalPostCreate}
            modalClose={closeModalPostCreate}
            open={open}
            nav={'投稿する'}
            body={
              <>
                <img src={bolb} className={classes.mobileBolb} />
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
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton className={classes.button} aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </div>
                    <InputText
                      value={place}
                      onChange={handlePlace}
                      placeholder={'キャンプ場'}
                      label={'ふもとっぱら'}
                      error={errors.place}
                    />
                    <SelectDate value={date} onChange={handleDate} label={'日付'} />
                    <InputText
                      value={content}
                      onChange={handleContent}
                      label={'キャプション'}
                      error={errors.content}
                      multiline={true}
                      rows={6}
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
              </>
            }
          />
        </MediaQuery>
      </MenuItem>
    );
  })
);
export default CreatePost;
