import { CodeSharp } from '@material-ui/icons';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { db } from '../../Firebase';
import FarmerRCard from '../farmer/FarmerRCard';
import WishMasterNav from './WishMasterNav'
import firebase from "firebase"
import { stringify } from 'uuid';
import WishMasterCard from './WishMasterCard';
import WishMasterAllOrders from './WishMasterAllOrders';

function AllOrder({setWishMaster,wishMaster}) {
const [wishMasterCity, setWishMasterCity] = useState("")
    useEffect(() => {
        db.collection("wishMasterData").doc(firebase.auth().currentUser.uid).onSnapshot((doc)=>{
           setWishMasterCity(doc.data().city)
            console.log(wishMasterCity)
        })
    }, [])
    return (
        <div>
            <WishMasterNav setWishMaster={setWishMaster} wishMaster={wishMaster}/>
         {wishMasterCity ? (
       <WishMasterAllOrders wishMasterCity={wishMasterCity}/>

         ) : (
           null
         )
                 }
       
        </div>
    )
}

export default AllOrder
