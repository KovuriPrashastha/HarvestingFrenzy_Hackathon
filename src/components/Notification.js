import { Button, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { db } from '../Firebase';
import firebase from 'firebase';
import { CheckCircle } from '@material-ui/icons';

function Notification(props) {
  function MarkAsRead(index) {
    //console.log(props.data[0].id, index);
    db.collection('farmerData')
      .doc(firebase.auth().currentUser.uid)
      .collection('Notifications')
      .doc(props.data[index].id)
      .update({
        read: true,
      });
    db.collection('farmerData')
      .doc(firebase.auth().currentUser.uid)
      .update({
        ncount: firebase.firestore.FieldValue.increment(-1),
      });
  }

  return (
    <div>
      {props.data.map((doc, index) => {
        return (
          <div>
            <Paper style={{maxWidth:600,width:"90%",marginLeft:"auto", marginRight:"auto",padding: 20, marginBottom : 10,borderStyle: "solid"}}>
              <Typography>{doc.item.type}</Typography>
              <Typography variant='h6'> {doc.item.message}</Typography>
              <Typography variant='overline'>
                {doc.item.timestamp.toDate().toString()}
              </Typography>
              <br />
              {!doc.item.read ? (
                <Button
                  startIcon={<CheckCircle />}
                  onClick={() => MarkAsRead(index)}
                >
                  Mark As Read
                </Button>
              ) : null}
            </Paper>
          </div>
        );
      })}
    </div>
  );
}

export default Notification;
