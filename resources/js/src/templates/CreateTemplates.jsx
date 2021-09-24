import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { alpha } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
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
import { createPost, handleContentChange, handleDayChange, handleImageChange, handlePlaceChange, resetPost } from '../reducks/posts/operations';
import { handlePostCreateModalOpen, handlePostEditModalOpen, handleTemplatesCreateModalOpen, ModalClose } from '../reducks/modals/operations';
import { handleAlertClose, handleAlertOpen } from '../reducks/alerts/operations';
import { createTemplates, handleTemplate_nameChange } from '../reducks/templates/operations';

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



const CreateTemplates = React.memo(React.forwardRef((props, ref) => {
  console.log("CreateTem")
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const template_name = selector.templates.template_name;
  const open = selector.modals.modal_templates_create_open;
  const alertOpen = selector.alerts.open;



  return (
    <MenuItem>
      <SimpleModal
        alertOpen={alertOpen}
        handleAlertOpen={handleAlertOpen}
        handleAlertClose={handleAlertClose}
        modalOpen={handleTemplatesCreateModalOpen}
        open={open}
        nav={"テンプレートとして保存する"}
        body=
        {
          <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.textForm}>
              <TextField
                id="outlined-textarea"
                label="テンプレート名"
                defaultValue={template_name}
                placeholder="必需品"
                variant="outlined"
                onChange={(event) => dispatch(handleTemplate_nameChange(event))}
              />
              <Button
                variant="contained"
                className={classes.upImg}
                startIcon={<CloudUploadIcon />}
                onClick={() => dispatch(createTemplates())}
              >
                保存する
              </Button>
            </div>
          </form>
        }
      />
    </MenuItem>
  )
}))

export default CreateTemplates;