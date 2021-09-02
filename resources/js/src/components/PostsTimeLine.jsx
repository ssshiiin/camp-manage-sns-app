import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import moment from "moment";

import { TimeLineGearNested } from ".";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "static",
    zIndex: "1",
    maxWidth: "100%",
    margin: "auto"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function postsTimeLine(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAddGear();
  }, [])

  const getAddGear = async () => {
    const response = await axios.get(`/api/add/gears/1`);
    setCategories(response.data.data);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={props.post.profile_image} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.post.app_name}
        subheader={`${moment(props.post.day).format("YYYY/MM/DD")} - ${props.post.place}`}
        onClick={() => dispatch(push(`/${props.post.user_id}`))}
      />
      <CardMedia
        className={classes.media}
        image={props.post.image_path[0].image_path}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show Gear"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List
            component="nav"
            aria-labelledby="Gear Lists"
            subheader={
              <ListSubheader component="div" id="Gear Lists">
                Gear Lists
              </ListSubheader>
            }
            className={classes.list}
          >
            {categories.map((category) =>
              <TimeLineGearNested category={category} key={category.category} />
            )}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}
