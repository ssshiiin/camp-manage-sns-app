import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { SimpleModal } from '../../components/Modal';
import { closeModalTemplateCreate, openModalTemplateCreate } from '../../reducks/modals/operations';
import { create, handleTemplateNameChange } from '../../reducks/templates/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#1876d1',
    color: 'white',
  },
  upImg: {
    margin: 7,
    backgroundColor: '#1876d1',
    color: 'white',
  },
  textForm: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 32px)',
  },
}));

const CreateTemplates = React.memo(
  React.forwardRef((props, ref) => {
    console.log('CreateTem');
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const templatesSelector = useSelector((state) => state.templates);
    const modals = useSelector((state) => state.modals);

    const templateName = templatesSelector.template_name;
    const open = modals.modalTemplateCreate;

    return (
      <MenuItem>
        <SimpleModal
          top={50}
          left={50}
          transX={50}
          transY={50}
          width={300}
          modalOpen={openModalTemplateCreate}
          modalClose={closeModalTemplateCreate}
          open={open}
          nav={'テンプレートとして保存する'}
          body={
            <form className={classes.root} noValidate autoComplete="off">
              <div className={classes.textForm}>
                <TextField
                  id="outlined-textarea"
                  label="テンプレート名"
                  defaultValue={templateName}
                  placeholder="必需品"
                  variant="outlined"
                  onChange={(event) => dispatch(handleTemplateNameChange(event))}
                />
                <Button
                  variant="contained"
                  className={classes.upImg}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => dispatch(create())}
                >
                  保存する
                </Button>
              </div>
            </form>
          }
        />
      </MenuItem>
    );
  })
);

export default CreateTemplates;
