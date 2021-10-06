import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { Loading } from '../components/Loading';
import { CardPost } from '../components/Card';
import ScrollToTopOnMount from './ScrollToTopOnMount';

const loader = <Loading key={0} />;

const Home = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getAllPosts = async (page) => {
    const url = `/posts?page=${page}`;
    await axios
      .get(url)
      .then((res) => {
        if (res.data.data.length < 1) {
          setHasMore(false);
          return;
        }
        setAllPosts([...allPosts, ...res.data.data]);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };

  return (
    <React.Fragment>
      <div className="home">
        <InfiniteScroll
          className="home-main"
          loadMore={getAllPosts}
          hasMore={hasMore}
          loader={loader}
        >
          <div className="home-main-timeline">
            {allPosts.map((post, i) => (
              <CardPost post={post} key={i} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
};

export default Home;
