import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import firebase from 'firebase';
import './picturePost.css';
import Comments from './Comments';
import { toUpper } from 'lodash';
import { Favorite, Comment, KeyboardArrowDown } from '@material-ui/icons';
import { Typography, TextField, Button } from '@material-ui/core';

function Post(props) {
  const [count, setCount] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsOpen, setCommentsOpen] = useState(false);

  const displayUserName = toUpper(props.userName);

  const postComment = (event) => {
    event.preventDefault();
    db.collection('picturePosts').doc(props.postId).collection('comments').add({
      text: comment,
      username: firebase.auth().currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
    setCommentsOpen(true);
  };

  useEffect(() => {
    props.likedUsers.map((arrayElement) => {
      console.log(arrayElement);
      if (arrayElement === firebase.auth().currentUser.uid) {
        setCount(true);
        console.log(count);
      }
    });
  }, []);

  const postLike = (e) => {
    setCount(true);
    e.preventDefault();
    db.collection('picturePosts')
      .doc(props.postId)
      .update({
        likes: firebase.firestore.FieldValue.increment(1),
        likedUsers: firebase.firestore.FieldValue.arrayUnion(
          firebase.auth().currentUser.uid
        ),
      });
  };

  const postDislike = (e) => {
    e.preventDefault();
    setCount(false);
    db.collection('picturePosts')
      .doc(props.postId)
      .update({
        likes: firebase.firestore.FieldValue.increment(-1),
        likedUsers: firebase.firestore.FieldValue.arrayRemove(
          firebase.auth().currentUser.uid
        ),
      });
  };

  return (
    <div className='posts'>
      <div className='picturePost'>
        <div className='postHeader'>
          <h4 className='postUsername'>{displayUserName}</h4>
        </div>
        <img
          className='postImg'
          src={props.imgUrl}
          alt=''
          width='200'
          height='300'
        />
        <div className='userInteract'>
          {count ? (
            <Favorite
              style={{ color: 'red' }}
              type='submit'
              onClick={postDislike}
            />
          ) : (
            <Favorite
              style={{ color: 'grey' }}
              type='submit'
              onClick={postLike}
            />
          )}
          <Typography style={{ marginLeft: 10 }}>{props.likes}</Typography>
        </div>

        <Typography variant='body1'>{props.caption}</Typography>
        {!commentsOpen ? (
          <Button
            className='comments_open'
            onClick={() => {
              setCommentsOpen(true);
            }}
            endIcon={<KeyboardArrowDown />}
          >
            Show Comments
          </Button>
        ) : (
          <Comments
            setCommentsOpen={setCommentsOpen}
            commentsOpen={commentsOpen}
            postId={props.postId}
          />
        )}
        <form className='add_comment'>
          <TextField
            className='form___field'
            id='standard-basic'
            label='Add a comment'
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            startIcon={<Comment />}
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Post;
