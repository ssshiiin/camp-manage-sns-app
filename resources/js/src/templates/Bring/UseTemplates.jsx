import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';

import { SimpleModal } from '../../components/Modal';
import { handleTemplatesUseModalOpen } from '../../reducks/modals/operations';
import { handleAlertClose, handleAlertOpen } from '../../reducks/alerts/operations';
import { getTemplates, useTemplate } from '../../reducks/templates/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  bolb: {
    width: 400,
    objectFit: 'cover',
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
  },
  input: {
    display: 'none',
  },
  upImg: {
    margin: 7,
    backgroundColor: '#1876d1',
    color: 'white',
  },
  textForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    minWidth: 350,
    border: '1px solid #d3d4d5',
  },
}));

const UseTemplates = React.memo(
  React.forwardRef((props, ref) => {
    console.log('useTem');
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const user_id = selector.users.user_id;
    const templates = selector.templates.templates;
    const open = selector.modals.modal_templates_use_open;
    const alertOpen = selector.alerts.open;

    useEffect(() => {
      dispatch(getTemplates(user_id));
    }, []);

    return (
      <MenuItem>
        <SimpleModal
          top={20}
          left={50}
          transX={50}
          alertOpen={alertOpen}
          handleAlertOpen={handleAlertOpen}
          handleAlertClose={handleAlertClose}
          modalOpen={handleTemplatesUseModalOpen}
          open={open}
          nav={'テンプレートを使う'}
          body={
            <Paper className={classes.paper}>
              <MenuList>
                {templates.map((template) => (
                  <MenuItem
                    key={template.template_name}
                    onClick={() => dispatch(useTemplate(template.template_name, user_id))}
                  >
                    {template.template_name}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          }
        />
      </MenuItem>
    );
  })
);

export default UseTemplates;
