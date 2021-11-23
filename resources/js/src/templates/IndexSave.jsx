import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardGear } from '../components/Card';
import { getSaveGears } from '../reducks/save_gears/operations';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    minHeight: 48,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    paddingLeft: 20,
  },
  gears: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
  },
}));

const IndexSave = (props) => {
  const dispatch = useDispatch();
  const saveGearsSelector = useSelector((state) => state.save_gears);
  const classes = useStyles();
  const userId = props.userId;

  const saveGears = saveGearsSelector.save_gears;

  useEffect(() => {
    dispatch(getSaveGears(userId));
  }, [userId]);

  console.log(saveGearsSelector);

  return (
    <React.Fragment>
      {saveGears.map((gears, i) => (
        <div key={i} className={classes.root}>
          <Grid item xs={12} className={classes.header}>
            <Typography variant="subtitle1" color="textSecondary">
              {gears.year_month}
            </Typography>
          </Grid>
          <div className={classes.gears}>
            {gears.gears.map((gear, s) => (
              <CardGear gear={gear} key={s} />
            ))}
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default IndexSave;
