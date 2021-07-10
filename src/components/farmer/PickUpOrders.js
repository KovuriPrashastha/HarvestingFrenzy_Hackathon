import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import firebase from "firebase"
import FarmerRCard from "./FarmerRCard"
function PickUpOrders() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
      db.collection("Orders")
        .where("fId", "==", firebase.auth().currentUser.uid)
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
  
          if (prod.status == "Ready for transit" || prod.status == "Accepted by Wish Master"  ) {
            return <FarmerRCard prod={prod} key={id} id={id} />;
  
          }
  
          }
        )}
      </div>
    )
}

export default PickUpOrders
