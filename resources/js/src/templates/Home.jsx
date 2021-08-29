import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import InfiniteScroll from 'react-infinite-scroller';

import { PostHeader, PostImage, PostContent } from "../components";



const Home = () => {
  const dispatch = useDispatch();
  const [Allposts, setAllPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);


  const getPosts = async (page) => {
    console.log("getPosts");
    const response = await axios.get(`/api/posts?page=${page}`)
      .catch(err => { console.log('err:', err); });

    if (response.data.data.length < 1) {
      setHasMore(false);
      return;
    }
    setAllPosts([...Allposts, ...response.data.data]);
  }

  const loader = <div className="loader" key={0}>Loading ...</div>;

  return (
    <div className="home">
      <InfiniteScroll
        className="home-main"
        loadMore={getPosts}
        hasMore={hasMore}
        loader={loader}>
        <div className="home-main-timeline">
          {Allposts.map((post) =>
            <div className="Post-set" onClick={() => dispatch(push(`/${post.user_id}/post/${post.id}`))} key={post.id}>
              <PostHeader
                place={post.place}
                day={post.day}
                profile_image={post.profile_image} />
              <PostImage post_images={post.image_path} />
              <PostContent content={post.content} tags={post.tags} />
            </div>
          )}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Home;