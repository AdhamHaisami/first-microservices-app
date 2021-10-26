import React from 'react';
function CommentList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => {
        return <li key={comment.key}>{comment.content}</li>;
      })}
    </ul>
  );
}

export default CommentList;
