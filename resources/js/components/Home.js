import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import SubCategory from './SubCategory';

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
        <div className="home-all">
            <div className="timeline">
                <InfiniteScroll
                loadMore={getPosts}
                hasMore={hasMore}
                loader={loader}>
                    <ul>
                        {posts.map((post) => 
                            <li key={post.id}>
                                <div className="timeline-header">
                                    <ul>
                                        <li>
                                            <div className="timeline-header-userImage"></div>
                                        </li>
                                        <li className="timeline-header-index">
                                            <ul>
                                                <li className="timeline-header-index-title">Place : </li>
                                                <li className="timeline-header-index-content">{post.place}</li>
                                            </ul>
                                            <ul>
                                                <li className="timeline-header-index-title">Day : </li>
                                                <li className="timeline-header-index-content">{post.day}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="timeline-img" style={{backgroundImage: `url(${post.image_path})`}}></div>
                                <div className="timeline-content">
                                    {post.content}
                                    <ul>
                                        {post.tags.map((tag) => 
                                            <li key={tag.id}>#{tag.tag}</li>
                                        )}
                                    </ul>
                                </div>
                            </li>
                        )}
                    </ul>
                </InfiniteScroll>
            </div>
            <SubCategory />
        </div>
        
    );
}

export default Home;