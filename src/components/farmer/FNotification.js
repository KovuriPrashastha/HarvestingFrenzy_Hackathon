import React, { useEffect, useState } from 'react';
import Notification from '../Notification';
import FarmerNav from './FarmerNav';
import firebase from 'firebase';
import { db } from '../../Firebase';

var [ndata, setData] = [];
function FNotification({ farmer, setFarmer }) {
  [ndata, setData] = useState([]);
  useEffect(() => {
    db.collection('farmerData')
      .doc(firebase.auth().currentUser.uid)
      .collection('Notifications')
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            item: doc.data(),
          }))
        );
      });
    //console.log('here', data);
  }, []);

  return (
    <div>
      <FarmerNav farmer={farmer} setFarmer={setFarmer} />
      <Notification data={ndata} />
    </div>
  );
}
export { ndata };
export default FNotification;
