import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { signInUser } from '../reducks/users/operations';
import Button from '@material-ui/core/Button';
import { pushMyProfile } from '../reducks/posts/operations';

import MediaQuery from 'react-responsive';

const SideBar = memo(() => {
  console.log('sidebar');
  const selector = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const userId = selector.user_id;

  useEffect(() => {
    dispatch(signInUser());
  }, []);

  const handleGearClick = () => {
    if (userId === undefined) {
      dispatch(push('/login'));
    } else {
      dispatch(push(`/${userId}/bring`));
    }
  };

  const handleMyPageClick = () => {
    if (userId === undefined) {
      dispatch(push('/login'));
    } else {
      dispatch(pushMyProfile(userId));
    }
  };

  return (
    <nav className="side-bar">
      <MediaQuery query="(min-width: 767px)">
        <div
          className="logo"
          style={{
            display: 'flex',
            position: 'relative',
            height: 66,
            width: 241,
            paddingLeft: 17,
            marginTop: 14,
          }}
        >
          <img src={'/images/shortLogo.png'} width="58px" height="68px" />
          <p className="side-header">Camin</p>
        </div>
        <ul className="side-nav">
          <li onClick={() => dispatch(push('/'))}>
            <Button style={{ width: '100%', justifyContent: 'flex-start' }}>
              <img src={'/images/Home.png'} width="36px" height="36px" />
              <p>Home</p>
            </Button>
          </li>
          <li onClick={() => dispatch(push(`/site`))}>
            <Button style={{ width: '100%', justifyContent: 'flex-start' }}>
              <img src={'/images/Site.png'} width="36px" height="36px" />
              <p>Site</p>
            </Button>
          </li>
          <li onClick={handleGearClick}>
            <Button style={{ width: '100%', justifyContent: 'flex-start' }}>
              <img src={'/images/Lantan.png'} width="36px" height="36px" />
              <p>Gear</p>
            </Button>
          </li>
          <li onClick={handleMyPageClick}>
            <Button style={{ width: '100%', justifyContent: 'flex-start' }}>
              <img src={'/images/Human.png'} width="36px" height="36px" />
              <p>Profile</p>
            </Button>
          </li>
        </ul>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <ul className="side-nav">
          <li onClick={() => dispatch(push('/'))}>
            <img src={'/images/mhome.png'} width="25px" height="25px" />
          </li>
          <li onClick={() => dispatch(push(`/site`))}>
            <img src={'/images/msite.png'} width="25px" height="25px" />
          </li>
          <li onClick={handleGearClick}>
            <img src={'/images/mlantan.png'} width="25px" height="25px" />
          </li>
          <li onClick={handleMyPageClick}>
            <img src={'/images/mhuman.png'} width="25px" height="25px" />
          </li>
        </ul>
      </MediaQuery>
    </nav>
  );
});

export default SideBar;
