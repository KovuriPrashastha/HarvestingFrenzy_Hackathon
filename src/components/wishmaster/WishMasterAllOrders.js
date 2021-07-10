import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import WishMasterCard from './WishMasterCard';

function WishMasterAllOrders({wishMasterCity}) {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        db.collection("Orders")
        .where("awaitNumber" , "==" , 1)
        .where("fcity","==", `${wishMasterCity}`)
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
    console.log(wishMasterCity)
    }, [])
    return (
        <div>
                 {orders.map(({ id, prod }) => {
  
  
  return <WishMasterCard prod={prod} key={id} id={id} />;



}
)}
        </div>
    )
}

export default WishMasterAllOrders
