import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getPosts } from '../reducks/posts/operations';
import moment from "moment";

const IndexPosts = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = props.match.params.id;
  const posts = selector.posts.posts;


  useEffect(() => {
    dispatch(getPosts(user_id));
  }, []);


  return (
    <div className="profile-main-posts">
      {posts.map((post) =>
        <div onClick={() => { dispatch(push(`/${user_id}/post/${post.id}`)) }} style={{ backgroundImage: `url(${post.post_images[0].image_path})` }} className="profile-main-posts-image" key={post.id}>
          <p className="p-center">{post.place}<br />{moment(post.day).format("YYYY/MM/DD")}</p>
        </div>
      )}
    </div>
  )
}

export default IndexPosts;