import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

import 'date-fns';
import Grid from '@material-ui/core/Grid';
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#1876d1",
    color: "white"
  },
  buttonRoot: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  },
  upImg: {
    margin: 7,
    backgroundColor: "#1876d1",
    color: "white"
  },
  textForm: {
    display: "flex",
    flexDirection: "column"
  }
}));

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

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const placeCastLatLng = (place) => {
    Geocode.setApiKey("AIzaSyBqDUefWdsCE0Hd7TONMNlcnXDvLQboztI");
    Geocode.fromAddress(place).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setlatLng({
          lat: lat,
          lng: lng
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  useEffect(() => {
    placeCastLatLng(nap_address)
  }, [nap_address])


  return (
    <>
      <ScrollToTopOnMount />
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.textForm}>
          <TextField
            id="outlined-textarea"
            label="目的地"
            defaultValue={place}
            placeholder="ふもとっぱら"
            variant="outlined"
            onChange={(event) => dispatch(handleSchedulePlaceChange(event))}
          />
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="予定日"
                format="yyyy/MM/dd"
                // value={purchased_day}
                variant="outlined"
                disableFuture="true"
                // onChange={(date) => dispatch(handlePurchasedDayChange(date))}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider> */}
          <Button
            variant="contained"
            className={classes.upImg}
            startIcon={<CloudUploadIcon />}
            onClick={() => dispatch(searchSchedulePlace())}
          >
            保存する
          </Button>
        </div>
      </form>
      <div>
        {
          dayout_camp &&
          <div>
            dayout : {dayout_camp}
          </div>
        }
        {
          dayout_home_page &&
          <div>
            home page : {dayout_home_page}
          </div>
        }
        {
          dayout_tel &&
          <div>
            tel : {dayout_tel}
          </div>
        }
        {
          nap_camp &&
          <div>
            nap : {nap_camp}
          </div>
        }
        {
          nap_check_in &&
          <div>
            check in : {nap_check_in}
          </div>
        }
        {
          nap_check_out &&
          <div>
            check out : {nap_check_out}
          </div>
        }
        {
          nap_address &&
          <div>
            address : {nap_address}
            <LoadScript googleMapsApiKey="AIzaSyBqDUefWdsCE0Hd7TONMNlcnXDvLQboztI">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={latLng}
                zoom={14}
              >
                <Marker position={latLng} />
              </GoogleMap>
            </LoadScript>
          </div>
        }
      </div>
    </>
  )
}

export default Schedule;