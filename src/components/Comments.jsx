import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import './comments.css';
import { Button } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';

function Comments({ setCommentsOpen, postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection('picturePosts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((Snapshot) => {
          setComments(Snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className='comment-outer-div'>
      <div className='comment-inner-div'>
        <Button
          className='comments_open_close'
          onClick={() => {
            setCommentsOpen(false);
          }}
          endIcon={<KeyboardArrowUp />}
        >
          Close Comments
        </Button>
        {comments.map((comment) => (
          <p>
            <strong> {comment.username} </strong> {comment.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Comments;
