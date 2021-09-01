import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';


function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography className={classes.tabPanel} component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
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
  },
}));



const IndexGears = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const category = props.category;
  const index = props.index;
  const value = props.value;

  return (
    <React.Fragment>
      <TabPanel value={value} index={index}>
        {category.gears.map((gear, i) =>
          <Card className={classes.root} key={i}>
            <CardMedia
              className={classes.cover}
              image={gear.image_path[0].image_path}
              title="Gear image"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h6" variant="h6">
                  {gear.gear_name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {gear.brand}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  価格 : {Number(gear.price).toLocaleString()} <br />
                  所持数 : {gear.amount} <br />
                  購入日 : {moment(gear.purchased_day).format("YYYY/MM/DD")} <br />
                </Typography>
              </CardContent>
            </div>
          </Card>
        )}
      </TabPanel>
    </React.Fragment>
  )

}

export default IndexGears;