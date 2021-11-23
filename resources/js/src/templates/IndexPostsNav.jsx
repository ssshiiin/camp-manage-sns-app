import React from 'react';
import { useSelector } from 'react-redux';
import { IndexPosts } from '../components';

const IndexPostsNav = () => {
  const selector = useSelector((state) => state.posts);
  const posts = selector.posts;

  return <IndexPosts posts={posts} />;
};

export default IndexPostsNav;
