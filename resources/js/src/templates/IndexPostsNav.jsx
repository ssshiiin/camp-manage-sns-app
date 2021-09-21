import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../reducks/posts/operations';
import { IndexPosts } from "../components";

const IndexPostsNav = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = props.match.params.id;
  const posts = selector.posts.posts;

  useEffect(() => {
    dispatch(getPosts(user_id));
  }, [user_id]);


  return (
    <IndexPosts posts={posts} />
  )
}

export default IndexPostsNav;