import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';

import { SimpleModal } from '../../components/Modal';
import { closeModalTemplateUse, openModalTemplateUse } from '../../reducks/modals/operations';
import { getTemplates, useTemplate } from '../../reducks/templates/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    minWidth: 300,
    border: '1px solid #d3d4d5',
  },
}));

const UseTemplates = React.memo(
  React.forwardRef((props, ref) => {
    console.log('useTem');
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const templatesSelector = useSelector((state) => state.templates);
    const modals = useSelector((state) => state.modals);

    const userId = users.user_id;
    const templates = templatesSelector.templates;
    const open = modals.modalTemplateUse;

    console.log(templatesSelector);

    useEffect(() => {
      if (typeof userId !== 'undefined') {
        dispatch(getTemplates(userId));
      }
    }, [userId]);

    return (
      <MenuItem>
        <SimpleModal
          top={20}
          left={50}
          transX={50}
          width={300}
          modalOpen={openModalTemplateUse}
          modalClose={closeModalTemplateUse}
          open={open}
          nav={'テンプレートを使う'}
          body={
            <Paper className={classes.paper}>
              <MenuList>
                {templates.map((template) => (
                  <MenuItem
                    key={template.template_name}
                    onClick={() => dispatch(useTemplate(template.template_name, userId))}
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
