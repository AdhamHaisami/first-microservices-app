import React from 'react';
function CommentList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => {
        let content;
        if (comment.status === 'Approved') {
          content = comment.content;
        }
        if (comment.status === 'pending') {
          content = 'This content is awaiting moderation';
        }
        if (comment.status === 'Rejected') {
          content = 'Comment has been rejected because of using bad word';
        }
        return <li key={comment.key}>{content}</li>;
      })}
    </ul>
  );
}

export default CommentList;
