import React, { useState, useEffect } from 'react';
import { storage } from '../Firebase';
import { fire, db } from '../Firebase';
import firebase from 'firebase';
import { Button, TextField } from '@material-ui/core';
import { v1 as uuidv1 } from 'uuid';
import { Publish, Close, PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));
function ImageUpload(props) {
  const classes = useStyles();
  const [caption, setCaption] = useState('');
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
    const uploadTask = storage.ref('images/' + uiid).put(image);

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
          .ref('images')
          .child(uiid)
          .getDownloadURL()
          .then((url) => {
            db.collection('picturePosts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: signInUser.displayName,
              email: signInUser.email,
              caption: caption,
              imgUrl: url,
              likedUsers: ['LIKEDUSER'],
              likes: 0,
            });
            setUpload(false);
            setProgress(0);
            setCaption('');
            setImage('');
          });
      }
    );
  };

  return (
    <div style={{ padding: 10 }}>
      <center>
        {!upload ? (
          <Button
            onClick={() => {
              setUpload(true);
            }}
            startIcon={<Publish />}
            variant='outlined'
          >
            Upload
          </Button>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: 300,
              width: 300,
            }}
          >
            {/* <TextField
              id="standard-basic"
              type="file"
              onChange={handleChange}
            /> */}

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

            <TextField
              id='standard-basic'
              label='Caption'
              type='text'
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />
            <center>
              <progress style={{ width: 300 }} value={progress} max='100' />
            </center>
            <Button
              startIcon={<Publish />}
              onClick={handleUpload}
              variant='outlined'
            >
              Upload Post
            </Button>

            <Button
              onClick={() => {
                setUpload(false);
              }}
              endIcon={<Close />}
              variant='outlined'
            >
              Close
            </Button>
          </div>
        )}
      </center>
    </div>
  );
}

export default ImageUpload;
