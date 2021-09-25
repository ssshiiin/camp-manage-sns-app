import React, { useEffect } from "react";
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { NavGear } from "../templates";

import MediaQuery from "react-responsive";



const useStyles = makeStyles((theme) => ({
  tabPanel: {
    display: "flex",
    flexWrap: "wrap",
  },
  root: {
    display: 'flex',
    width: "44%",
    margin: 24,
  },
  mobileRoot: {
    display: 'flex',
    width: "100%",
    margin: 8,
  },
  details: {
    minWidth: "40%",
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: "16px 0px 16px 16px"
  },
  cover: {
    width: 190,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  }
}));

const CardGear = (props) => {
  console.log("Card");
  const classes = useStyles();
  const gear = props.gear;
  const user_id = props.user_id;
  console.log(gear)

  return (
    <>
      <MediaQuery query="(min-width: 767px)">
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={gear.gear_images[0].image_path}
            title="Gear image"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="subtitle1" >
                {gear.gear_name}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {gear.brand}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                価格 : {Number(gear.price).toLocaleString()} <br />
                所持数 : {gear.amount} <br />
                購入日 : {(gear.purchased_day === null) ? "" : moment(gear.purchased_day).format("YYYY/MM/DD")} <br />
              </Typography>
            </CardContent>
          </div>
          <NavGear user_id={user_id} gear_id={gear.id} />
        </Card>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <Card className={classes.mobileRoot}>
          <CardMedia
            className={classes.cover}
            image={gear.gear_images[0].image_path}
            title="Gear image"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="subtitle1" >
                {gear.gear_name}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {gear.brand}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                価格 : {Number(gear.price).toLocaleString()} <br />
                所持数 : {gear.amount} <br />
                購入日 : {(gear.purchased_day === null) ? "" : moment(gear.purchased_day).format("YYYY/MM/DD")} <br />
              </Typography>
            </CardContent>
          </div>
          <NavGear user_id={user_id} gear_id={gear.id} />
        </Card>

      </MediaQuery>
    </>
  )
}

export default CardGear;