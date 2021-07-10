import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import FarmerRCard from './FarmerRCard';
import firebase from "firebase"

function TakenOrders() {

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

        if (prod.status == "Order taken up by Farmer" ) {
          return <FarmerRCard prod={prod} key={id} id={id} />;

        }

        }
      )}
    </div>
    )
}

export default TakenOrders
