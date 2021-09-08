import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { alpha } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { SimpleModal } from '../components';
import { createPost, handleContentChange, handleDayChange, handleImageChange, handlePlaceChange, updatePost } from '../reducks/posts/operations';
import { handlePostCreateModalOpen, handlePostEditModalOpen, ModalClose } from '../reducks/modals/operations';
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
    width: 400,
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
    margin: 7,
    backgroundColor: "#1876d1",
    color: "white"
  },
  textForm: {
    display: "flex",
    flexDirection: "column"
  }
}));



const EditPost = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const place = selector.posts.post_place;
  const day = selector.posts.post_day;
  const content = selector.posts.post_content;
  const bolb_urls = selector.posts.post_bolb_urls;
  const open = selector.modals.modal_post_edit_open;
  const alertOpen = selector.alerts.open;


  return (
    <MenuItem>
      <SimpleModal
        alertOpen={alertOpen}
        handleAlertOpen={handleAlertOpen}
        handleAlertClose={handleAlertClose}
        modalOpen={handlePostEditModalOpen}
        open={open}
        nav={"編集する"}
        body=
        {
          <form className={classes.root} noValidate autoComplete="off">
            <img src={bolb_urls[0]} className={classes.bolb} />
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
            <div className={classes.textForm}>
              <TextField
                id="outlined-textarea"
                label="キャンプ場"
                defaultValue={place}
                placeholder="Placeholder"
                variant="outlined"
                onChange={(event) => dispatch(handlePlaceChange(event))}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="購入日"
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
                onClick={() => dispatch(updatePost(props.post_id))}
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

export default EditPost;