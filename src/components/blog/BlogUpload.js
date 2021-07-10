import { Button, CircularProgress, Paper, TextareaAutosize, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { storage } from '../../Firebase';
import { fire, db } from '../../Firebase';
import firebase from 'firebase';
import { v1 as uuidv1 } from 'uuid';
import { Publish, PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
}));

function BlogUpload() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [progress, setProgress] = useState('');
  const [image, setImage] = useState('');
  const [signInUser, setSignInUser] = useState('');
  const [upload, setUpload] = useState(false);
  var uiid = uuidv1();
  const authListener = () => {
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setSignInUser(authUser);
      } else {
        setSignInUser(null);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref('blogImages/' + uiid).put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('blogImages')
          .child(uiid)
          .getDownloadURL()
          .then((url) => {
            db.collection('blogPosts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: firebase.auth().currentUser.displayName,
              uid: firebase.auth().currentUser.uid,
              email: firebase.auth().currentUser.email,
              title: title,
              content: content,
              imgUrl: url,
              likedUsers: ['LIKEDUSER'],
              likes: 0,
            });
            setUpload(false);
            setProgress(0);
            setContent('');
            setTitle('');
            setImage('');
          });
      }
    );
  };

  function Decide() {
    if(progress == 0 ) {
    return  <div> <br/><Button
          startIcon={<Publish />}
          onClick={handleUpload}
          variant='outlined'
        >
          Upload
        </Button></div>
    } else {
      return <div><br/>
      <CircularProgress value={progress} />
      </div>
    }
    
  }

  return (
    <center>
      <Paper
        style={{
          heigth: 200,
          width: '90%',
          maxWidth: 800,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <TextField
          // className='form___field'
          id='standard-basic'
          label='Title'
          type='text'
          value={title}
          fullWidth='true'
          style={{ marginBottom: 10 }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaAutosize
          aria-label='minimum height'
          rowsMin={7}
          placeholder='Start Writing'
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '95%', marginBottom: 10 }}
        />

        <input
          accept='image/*'
          className={classes.input}
          id='contained-button-file'
          multiple
          type='file'
          onChange={handleChange}
        />
        <label htmlFor='contained-button-file'>
          <Button
            variant='contained'
            component='span'
            startIcon={<PhotoCamera />}
          >
            Choose Image
          </Button>
        </label>
        <center>
        </center>
        {Decide()}
        

      </Paper>
    </center>
  );
}

export default BlogUpload;
