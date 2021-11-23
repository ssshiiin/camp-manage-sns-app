import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { handleSchedulePlaceChange, searchSchedulePlace } from '../reducks/schedules/operations';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { IndexPosts } from '../components';
import { CampInfo } from '../components/Column';
import { getPlacePosts } from '../reducks/posts/operations';
import { InputText } from '../components/Form';
import { ScrollToTopOnMount } from '../components/Utility';
import { useString } from '../Function';
import { useLocation } from 'react-router';
import useGaTrackPage from '../Function/useGaTrackPage';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'inherit',
    padding: theme.spacing(3),
    margin: theme.spacing(0),
  },
  container: {
    margin: theme.spacing(3),
  },
  paper: {
    minHeight: 360,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
  },
  textForm: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  search: {
    width: '100%',
    backgroundColor: '#1876d1',
    color: 'white',
  },
  button: {
    backgroundColor: '#1876d1',
    color: 'white',
  },
  input: {
    display: 'none',
  },
}));

const containerStyle = {
  width: '100%',
  minHeight: 392,
  height: '100%',
};

const Schedule = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [latLng, setlatLng] = useState();
  const [marker, setMarker] = useState({});

  const [place, handlePlace] = useString();
  const nap_camp = selector.schedules.nap_camp;
  const nap_address = selector.schedules.nap_address;
  const nap_check_in = selector.schedules.nap_check_in;
  const nap_check_out = selector.schedules.nap_check_out;
  const dayout_camp = selector.schedules.dayout_camp;
  const dayout_tel = selector.schedules.dayout_tel;
  const dayout_home_page = selector.schedules.dayout_home_page;
  const place_posts = selector.posts.place_posts;

  const location = useLocation();
  useGaTrackPage(location.pathname);

  const placeCastLatLng = (place) => {
    Geocode.setApiKey(process.env.MIX_GOOGLE_MAP_API);
    Geocode.fromAddress(place)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setlatLng({
          lat: lat,
          lng: lng,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const googleMap = () => {
    return (
      <LoadScript googleMapsApiKey={process.env.MIX_GOOGLE_MAP_API}>
        <GoogleMap mapContainerStyle={containerStyle} center={latLng} zoom={9}>
          <Marker position={latLng} />
        </GoogleMap>
      </LoadScript>
    );
  };

  useEffect(() => {
    placeCastLatLng(nap_address);
    dispatch(getPlacePosts(nap_camp));
  }, [nap_camp, nap_address]);

  return (
    <>
      <ScrollToTopOnMount />
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid container item md={7} xs={12}>
            <Paper className={classes.paper}>
              <form
                noValidate
                autoComplete="off"
                className={classes.textForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(searchSchedulePlace(place));
                }}
              >
                <div style={{ width: '60%' }}>
                  <InputText
                    value={place}
                    label={'キャンプ場'}
                    placeholder={'ふもとっぱら'}
                    onChange={handlePlace}
                    fullWidth={true}
                  />
                </div>
                <div
                  style={{
                    margin: '0 13px 0 0',
                    width: '23%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Button size="medium" className={classes.search} type="submit">
                    検索
                  </Button>
                </div>
              </form>
              <CampInfo column={'Nap'} info={nap_camp} />
              <CampInfo column={'住所'} info={nap_address} />
              <CampInfo column={'チェックイン'} info={nap_check_in} />
              <CampInfo column={'チェックアウト'} info={nap_check_out} />
              <CampInfo column={'Dayout'} info={dayout_camp} />
              <CampInfo column={'電話番号'} info={dayout_tel} />
              <CampInfo column={'ホームページ'} info={dayout_home_page} />
            </Paper>
          </Grid>
          <Grid item md={5} xs={12} styles={{ height: '100%' }}>
            <Paper style={{ minHeight: 392, width: '100%', height: '100%' }}>{googleMap()}</Paper>
          </Grid>
        </Grid>
      </Container>
      <IndexPosts posts={place_posts} />
    </>
  );
};

export default Schedule;
