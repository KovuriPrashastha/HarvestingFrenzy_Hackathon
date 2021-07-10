import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import FWCompleted from '../FWCompleted';
import firebase from "firebase"

function FarmerCompleted() {
const [orders, setOrders] = useState([])
useEffect(() => {
    db.collection("Orders")
      .where("fId", "==", firebase.auth().currentUser.uid)
      .where("status", "==", "Completed")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs);
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            prod: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <div style={{ padding: 10 }}>
         {orders.map(({ id, prod }) => {
      return <FWCompleted prod={prod} id={id} key={id} />
      
         })}
    </div>
  );
        }

export default FarmerCompleted
