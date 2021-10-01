import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import InfiniteScroll from 'react-infinite-scroller';

import { PostsTimeLine, Loading } from '../components';
import ScrollToTopOnMount from './ScrollToTopOnMount';

const Home = (props) => {
  const dispatch = useDispatch();
  const [Allposts, setAllPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getAllPosts = async (page) => {
    console.log('getAllPosts');
    const response = await axios.get(`/api/posts?page=${page}`).catch((err) => {
      console.log('err:', err);
    });

    if (response.data.data.length < 1) {
      setHasMore(false);
      return;
    }
    setAllPosts([...Allposts, ...response.data.data]);
  };

  const loader = <Loading key={0} />;

  return (
    <React.Fragment>
      <ScrollToTopOnMount />
      <div className="home">
        <InfiniteScroll className="home-main" loadMore={getAllPosts} hasMore={hasMore} loader={loader}>
          <div className="home-main-timeline">
            {Allposts.map((post) => (
              <PostsTimeLine user_id={post.user_id} post={post} key={post.id} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
};

export default Home;
