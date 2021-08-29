import React from 'react';

function PostContent(props) {
  return (
    <div className="post-content">
      {props.content}
      <ul>
        {props.tags.map((tag) =>
          <li key={tag.id}>#{tag.tag}</li>
        )}
      </ul>
    </div>
  )
}

export default PostContent;