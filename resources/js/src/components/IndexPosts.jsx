import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';

import { createStyles, makeStyles, Theme, createTheme } from "@material-ui/core/styles";
import { getShowPost } from "../reducks/posts/operations";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}));

const IndexPosts = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.posts.map((post) =>
        <div onClick={() => { dispatch(getShowPost(post.user_id, post.id)) }} style={{ backgroundImage: `url(${post.post_images[0].image_path})` }} className="profile-main-posts-image" key={post.id}>
          <p className="p-center">{post.place}<br />{(post.day === null) ? "" : moment(post.day).format("YYYY/MM/DD")}</p>
        </div>
      )}
    </div>
  )
}

export default IndexPosts;