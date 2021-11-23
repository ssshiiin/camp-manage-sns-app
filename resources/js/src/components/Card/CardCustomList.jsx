import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';

import { ShowBring } from '../../components';
import { FlexListSubheader } from '../../components/Header';
import Divider from '@material-ui/core/Divider';

import styles from '../../../../sass/components/card.module.scss';
import { useDispatch } from 'react-redux';

const CardCustomList = (props) => {
  const { userId, title, categories, update, updateAll, countAll, countTrue } = props;
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);
    dispatch(updateAll(userId, !checked));
  };

  return (
    <Card>
      <div className={styles.custom__header}>
        <Checkbox
          checked={checked}
          onClick={handleClick}
          disabled={categories.length === 0}
          className={styles.custom__checkBox}
        />
        <FlexListSubheader title={title} countTrue={countTrue} countAll={countAll} />
      </div>
      <Divider />
      <List className={styles.custom} dense component="div" role="list">
        {categories.map((category, i) => (
          <div key={i}>
            <ShowBring category={category} update={update} />
            <Divider />
          </div>
        ))}
        <ListItem />
      </List>
    </Card>
  );
};

export default CardCustomList;
