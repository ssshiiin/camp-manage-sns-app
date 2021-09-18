import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { SimpleModal } from '../components';
import { createPost, handleContentChange, handleDayChange, handleImageChange, handlePlaceChange, resetPost } from '../reducks/posts/operations';
import { handlePostCreateModalOpen, handlePostEditModalOpen, handleTemplatesCreateModalOpen, handleTemplatesUseModalOpen, ModalClose } from '../reducks/modals/operations';
import { handleAlertClose, handleAlertOpen } from '../reducks/alerts/operations';
import { useTemplate } from '../reducks/templates/operations';

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
  },
  paper: {
    minWidth: 350,
    border: '1px solid #d3d4d5',
  }
}));



const UseTemplates = React.memo(React.forwardRef((props, ref) => {
  console.log("------useTemplate");
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const user_id = selector.users.user_id;
  const templates = selector.templates.templates;
  const open = selector.modals.modal_templates_use_open;
  const alertOpen = selector.alerts.open;



  return (
    <MenuItem>
      <SimpleModal
        alertOpen={alertOpen}
        handleAlertOpen={handleAlertOpen}
        handleAlertClose={handleAlertClose}
        modalOpen={handleTemplatesUseModalOpen}
        open={open}
        nav={"テンプレートを使う"}
        body=
        {
          <Paper className={classes.paper}>
            <MenuList>
              {templates.map((template) => (
                <MenuItem
                  key={template.template_name}
                  onClick={() => dispatch(useTemplate(template.template_name, user_id))}
                >{template.template_name}</MenuItem>
              ))}
            </MenuList>
          </Paper>
        }
      />
    </MenuItem>
  )
}))

export default UseTemplates;