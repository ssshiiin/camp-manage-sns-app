import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import Header from './Header';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostContent from './PostContent';

function Home(){
    
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true); 
    
    
    const getPosts = async (page) => {
        const response = await axios.get(`/api/posts?page=${page}`);
        
        if (response.data.data.length < 1) {
            setHasMore(false);
            return;
        }
        
        setPosts([...posts, ...response.data.data]);
    }
    
    const loader =<div className="loader" key={0}>Loading ...</div>;
     
        
    return (
            <div className="home">
                <Header />
                <InfiniteScroll
                className="home-main"
                loadMore={getPosts}
                hasMore={hasMore}
                loader={loader}>
                    <ul className="home-main-timeline">
                        {posts.map((post) => 
                            <li className="home-main-timeline-list" key={post.id}>
                                <PostHeader place={post.place} day={post.day} />
                                <PostImage img_path={post.image_path} />
                                <PostContent content={post.content} tags={post.tags} />
                            </li>
                        )}
                    </ul>
                </InfiniteScroll>
            </div>
    );
}

export default Home;