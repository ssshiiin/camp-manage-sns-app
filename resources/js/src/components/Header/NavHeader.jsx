import React, { memo } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { NavBring, NavProfile } from '../../templates';

const NavHeader = memo((props) => {
  console.log('NavHeader');
  const selector = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  if (props.type === 'Profile') {
    const name = selector.appName;

    return (
      <>
        <h2>
          <ArrowBackIcon
            onClick={() => {
              dispatch(push('/'));
            }}
          />
        </h2>
        <h2>{name}</h2>
        <NavProfile userId={props.userId} />
      </>
    );
  } else if (props.type === 'Bring') {
    const login = selector.user_id;
    return (
      <>
        <h2>{props.title}</h2>
        {props.userId == login && <NavBring />}
      </>
    );
  }
});

export default NavHeader;
