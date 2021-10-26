import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';

import { ModalMediaQuery } from '../../components/Modal';
import { getTemplates, useTemplate } from '../../reducks/templates/operations';
import styles from '../../../../sass/templates/form.module.scss';

const UseTemplates = React.memo(
  React.forwardRef((props, ref) => {
    console.log('useTem');
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const templatesSelector = useSelector((state) => state.templates);

    const userId = users.user_id;
    const templates = templatesSelector.templates;

    const [open, setOpen] = useState(false);

    console.log(templatesSelector);

    useEffect(() => {
      if (typeof userId !== 'undefined') {
        dispatch(getTemplates(userId));
      }
    }, [userId]);

    return (
      <ModalMediaQuery
        top={20}
        left={50}
        transX={50}
        mb={300}
        pc={300}
        setOpen={setOpen}
        open={open}
        nav={'テンプレートを使う'}
        pull={true}
        body={
          <Paper className={styles.template}>
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
    );
  })
);

export default UseTemplates;
