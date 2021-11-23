import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { Loading } from '../components/Loading';
import { CardPost } from '../components/Card';
import { countPV } from '../Function';

const loader = <Loading key={0} />;

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getAllPosts = async (page) => {
    const url = `/posts?page=${page}`;
    await axios
      .get(url)
      .then((res) => {
        if (res.data.timeline.length < 1) {
          setHasMore(false);
          return;
        }
        setAllPosts([...allPosts, ...res.data.timeline]);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };

  useEffect(() => {
    countPV();
  }, []);

  return (
    <React.Fragment>
      <div className="home">
        <InfiniteScroll className="home-main" loadMore={getAllPosts} hasMore={hasMore} loader={loader}>
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
