import React, { useEffect, useState } from "react";
import CustomerNav from "./CustomerNav";
import CartCard from "../CartCard";
import { db } from "../../Firebase";
import firebase from "firebase";
import Address from "../Address";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import XCart from "../XCart";
import ScrollableFeed from 'react-scrollable-feed'


function CustomerCart({ user, setUser }) {
  const [data, setData] = useState([]);
  const [inv, setInv] = React.useState(false);
  const [openA, setopenA] = useState(false)
  function Inv() {
    if(inv){
      setInv(false)
    } else {
      setInv(true)
    }
  }
  function OpenA() {
    if(openA){
      setopenA(false)
    } else {
      setopenA(true)
    }
  }
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

  function Decide() {
    if(inv){
      return <XCart />

    } else {
      return <div style={{height:"80vh"}}> 
     <ScrollableFeed >
          
      {data.map(({item,id}) => {
        return (
          <div>
            <CartCard item={item}  />
          </div>
        );
      })}
</ScrollableFeed>

     </div>
    }
    
  }

  return (
    <div>
      <CustomerNav setUser={setUser} />

      {!openA ? (
        <div>
          <center>
          <Button onClick={OpenA}>
        Close
      </Button>
      </center>
      <Address />
      </div>
      ):(
      <center>
      <Button onClick={OpenA}>
        Show Address
      </Button></center>)}
      {/* <Tooltip title='Market' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  onClick={Inv}
                >
                  <ShoppingBasket/>
                </IconButton>
              </Tooltip> */}

{Decide()}


</div> 
);
}

export default CustomerCart;
