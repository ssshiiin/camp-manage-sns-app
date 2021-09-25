import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../reducks/posts/operations';
import { IndexPosts } from "../components";

const IndexPostsNav = (props) => {
  const selector = useSelector((state) => state);
  const user_id = props.match.params.id;
  const posts = selector.posts.posts_profile;

  console.log("posts", selector.posts)


  return (
    <IndexPosts posts={posts} />
  )
}

export default IndexPostsNav;