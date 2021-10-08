import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import form from '../../../../sass/components/form.module.scss';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { store, destroy } from '../../reducks/nices/operations';
import { checkNice } from '../../Function';

const NiceButton = (props) => {
  console.log('button');
  const { postId, nices } = props;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const userId = selector.users.user_id;
  const [nice, setNice] = useState();
  const [count, setCount] = useState();

  useEffect(() => {
    const [nice, count] = checkNice(nices, userId);
    setNice(nice);
    setCount(count);
  }, [userId]);

  if (nice) {
    return (
      <IconButton
        aria-label="remove to favorites"
        color="secondary"
        onClick={() => {
          console.log(nice);
          dispatch(destroy(userId, postId));
          setNice(!nice);
          setCount(count - 1);
        }}
      >
        <FavoriteIcon />
        <span className={form.count}>{count}</span>
      </IconButton>
    );
  } else {
    return (
      <IconButton
        aria-label="add to favorites"
        onClick={() => {
          dispatch(store(userId, postId));
          setNice(!nice);
          setCount(count + 1);
        }}
      >
        <FavoriteIcon />
        <span className={form.count}>{count}</span>
      </IconButton>
    );
  }
};

export default NiceButton;
