import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardGear } from '../components';
import { getSaveGears } from '../reducks/save_gears/operations';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    minHeight: 48,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    paddingLeft: 20
  },
  gears: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#F5F5F5"
  }
}));

const IndexSave = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const classes = useStyles();
  const user_id = props.user_id;

  const save_gears = selector.save_gears.save_gears;

  useEffect(() => {
    dispatch(getSaveGears(user_id));
  }, [])

  console.log("save", save_gears);

  return (
    <React.Fragment>
      {save_gears.map((gears, i) =>
        <div key={i} className={classes.root}>
          <Grid item xs={12} className={classes.header} >
            <Typography variant='subtitle1' color="textSecondary" >
              {gears.year_month}
            </Typography>
          </Grid>
          <div className={classes.gears}>
            {gears.gears.map((gear, s) =>
              <CardGear gear={gear} key={s} />
            )}
          </div>
        </div>
      )
      }
    </React.Fragment >
  )
}

export default IndexSave;