import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import Header from '../Header/Header';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostContent from './PostContent';

function Home(){
    const [Allposts, setAllPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true); 
    
    
    const getPosts = async (page) => {
        const response = await axios.get(`/api/posts?page=${page}`);
        
        if (response.data.data.length < 1) {
            setHasMore(false);
            return;
        }
        console.log(response.data.data)
        setAllPosts([...Allposts, ...response.data.data]);
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
                        {Allposts.map((post) => 
                            <li className="home-main-timeline-list" key={post.id}>
                                <PostHeader 
                                    place={post.place} 
                                    day={post.day} 
                                    profile_image={post.profile_image} />
                                <PostImage post_images={post.image_path} />
                                <PostContent content={post.content} tags={post.tags} />
                            </li>
                        )}
                    </ul>
                </InfiniteScroll>
            </div>
    );
}

export default Home;