import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import moment from 'moment';

import { TimeLineGearNested } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getShowPost } from '../reducks/posts/operations';
import { NavPost } from '../templates/Profile';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 3,
    position: 'static',
    zIndex: '1',
    maxWidth: '100%',
    margin: 'auto',
  },
  media: {
    width: '100%',
    objectFit: 'cover',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ShowPost = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const Posts = useSelector((state) => state.posts);
  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const post = Posts.post;
  const postId = props.match.params.post_id;

  useEffect(() => {
    dispatch(getShowPost(postId));
  }, [postId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      {post && (
        <Card className={classes.root} key={post.id}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={post.profile_image}
                onClick={() => dispatch(push(`/${post.user_id}`))}
              />
            }
            action={<NavPost post={post} />}
            title={post.app_name}
            subheader={`${post.day === null ? '' : moment(post.day).format('YYYY/MM/DD')} - ${post.place}`}
          />
          <img src={post.image_path[0].image_path} className={classes.media} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.content}
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
                [classes.expandOpen]: expanded,
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
                {categories.map((category) => (
                  <TimeLineGearNested category={category} key={category.category} />
                ))}
              </List>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </React.Fragment>
  );
};

export default ShowPost;
