import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../reducks/posts/operations';
import { IndexPosts } from '../components';

const IndexPostsNav = (props) => {
  console.log('IndexPostsNav');
  const selector = useSelector((state) => state.posts);
  const posts = selector.posts;

  return <IndexPosts posts={posts} />;
};

export default IndexPostsNav;
