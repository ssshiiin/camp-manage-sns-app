import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

import styles from '../../../../sass/components/form.module.scss';

const CheckBoxList = memo((props) => {
  const { gear, update } = props;
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(gear.is_check);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(update(!checked, gear.id));
  };

  return (
    <ListItem role="listitem" button className={styles.checkBoxList} onClick={handleCheck}>
      <Checkbox checked={checked} className={styles.checkBoxList__checkBox} />
      <ListItemText primary={gear.gear_name} className={styles.checkBoxList__text} />
    </ListItem>
  );
});

export default CheckBoxList;
