import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db } from "../../Firebase";
import FarmerRCard from "./FarmerRCard";

function FarmerReceivedOrders() {
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

        if (prod.status == "Order Placed" ) {
          return <FarmerRCard prod={prod} key={id} id={id} />;

        }

        }
      )}
    </div>
  );
}

export default FarmerReceivedOrders;
