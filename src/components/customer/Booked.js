import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomerPCard from "./CustomerPCard";
import firebase from "firebase";
import { db } from "../../Firebase";
function Booked() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    db.collection("Orders")
      .where("cId", "==", firebase.auth().currentUser.uid)
      .where("awaitNumber", "==", 0)
      .where("status" , "!=" , "Completed" )
      .onSnapshot((snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            order: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <div>
      <Paper  style={{padding: 10}}>
        {orders.map(({ id, order }) => {
          return <CustomerPCard key={id} id={id} prod={order} />;
        })}
      </Paper>
    </div>
  );
}

export default Booked;
