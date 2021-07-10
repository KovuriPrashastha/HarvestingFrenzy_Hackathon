import FarmerNav from "./FarmerNav";
import React, { useEffect, useState } from "react";
import CartCard from "../CartCard";
import { db } from "../../Firebase";
import firebase from "firebase";
import Address from "../Address";

function FarmerCart({ farmer, setFarmer }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    db.collection("UserData")
      .doc(firebase.auth().currentUser.uid).collection("cart")
      .onSnapshot((snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            item: doc.data(),
          }))
        );
        console.log(snapshot)
      });
  }, []);

  return (
    <div>
      <FarmerNav setFarmer={setFarmer} />
      <Address />
      {data.map((item) => {
        console.log(item)
        return (
          <div>
            <CartCard item={item.item} />
          </div>
        );
      })}
    </div>
  );
}

export default FarmerCart;
