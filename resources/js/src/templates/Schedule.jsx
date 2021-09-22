import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

import 'date-fns';
import Link from '@material-ui/core/Link';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { handleSchedulePlaceChange, searchSchedulePlace } from '../reducks/schedules/operations';
import ScrollToTopOnMount from './ScrollToTopOnMount';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CampInfo, IndexPosts } from '../components';
import { getPlacePosts } from '../reducks/posts/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "inherit",
    padding: theme.spacing(3),
    margin: theme.spacing(0),
  },
  container: {
    margin: theme.spacing(3),
  },
  paper: {
    minHeight: 360,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flexStart",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  textForm: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around"
  },
  searchText: {
    width: '100%'
  },
  search: {
    width: "100%",
    backgroundColor: "#1876d1",
    color: "white",
  },
  button: {
    backgroundColor: "#1876d1",
    color: "white",
  },
  input: {
    display: "none"
  },
}));

const containerStyle = {
  width: "100%",
  minHeight: 392,
  height: "100%",
};

const center = {
  lat: 35.69575,
  lng: 139.77521,
};


const Schedule = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [latLng, setlatLng] = useState({});
  const [marker, setMarker] = useState({});

  const place = selector.schedules.schedule_place;
  const nap_camp = selector.schedules.nap_camp;
  const nap_address = selector.schedules.nap_address;
  const nap_check_in = selector.schedules.nap_check_in;
  const nap_check_out = selector.schedules.nap_check_out;
  const dayout_camp = selector.schedules.dayout_camp;
  const dayout_tel = selector.schedules.dayout_tel;
  const dayout_home_page = selector.schedules.dayout_home_page;
  const place_posts = selector.posts.place_posts;

  const placeCastLatLng = (place) => {
    Geocode.setApiKey(process.env.MIX_GOOGLE_MAP_API);
    Geocode.fromAddress(place).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setlatLng({
          lat: lat,
          lng: lng
        });
      })
      .catch((err) => { console.log(err) });
  }

  useEffect(() => {
    placeCastLatLng(nap_address);
    dispatch(getPlacePosts(nap_camp));
  }, [nap_camp, nap_address])

  console.log(selector.schedules)


  return (
    <>
      <ScrollToTopOnMount />
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid container item xs={7}>
            <Paper className={classes.paper}>
              <form noValidate autoComplete="off" className={classes.textForm} onSubmit={(e) => { dispatch(searchSchedulePlace(e)) }}>
                <div style={{ width: "65%" }}>
                  <TextField
                    size="small"
                    id="outlined-textarea"
                    label="キャンプ場"
                    defaultValue={place}
                    placeholder="ふもとっぱら"
                    variant="outlined"
                    onChange={(event) => dispatch(handleSchedulePlaceChange(event))}
                    className={classes.searchText}
                  />
                </div>
                <div style={{ width: "23%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <Button fullWidth size="medium" className={classes.search} type="submit">
                    検索
                  </Button>
                </div>
              </form>
              <CampInfo column={"Nap"} info={nap_camp} />
              <CampInfo column={"住所"} info={nap_address} />
              <CampInfo column={"チェックイン"} info={nap_check_in} />
              <CampInfo column={"チェックアウト"} info={nap_check_out} />
              <CampInfo column={"Dayout"} info={dayout_camp} />
              <CampInfo column={"電話番号"} info={dayout_tel} />
              <Grid container item xs={12} justifyContent="center" alignItems="center" style={{ flexBasis: "13%" }}>
                <Grid item xs={4}>
                  <Typography component="h2" variant="body1" align="center">
                    ホームページ
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography component="h2" variant="body1" align="center">
                    :
                  </Typography>
                </Grid>
                <Grid item xs={7} style={{ textAlign: "center" }}>
                  <Link href={dayout_home_page} variant="body1">
                    {dayout_home_page}
                  </Link>
                </Grid>
              </Grid >
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper style={{ minHeight: 392, width: "100%" }}>
              <LoadScript googleMapsApiKey={process.env.MIX_GOOGLE_MAP_API}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={latLng}
                  zoom={9}
                >
                  <Marker position={latLng} />
                </GoogleMap>
              </LoadScript>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <IndexPosts posts={place_posts} />
    </>
  )
}

export default Schedule;