import { Avatar, Button, Grid, Typography } from '@material-ui/core'
import { AccountBalanceWallet, Apartment } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase'
import Dp from '../../images/farmerDp.jpg';
import firebase from "firebase"


function FDetails() {
    const [data, setData] = useState("")

    useEffect(() => {
        db.collection("farmerData").doc(firebase.auth().currentUser.uid).get().then(snap => {
            setData(snap.data())

           console.log(snap.data())
        })
       
    }, [])
    return (
        <div>
         <div style={{marginTop:10}}>
            <center>
                  <Grid container spacing={2}>
         
                <Grid item xs={12} sm={4} md={4} lg={4}>
                <Avatar variant="rounded" style={{width: 150,height: 150}} src={Dp} /> 
                </Grid>

                <Grid item xs={12} sm={4} md={4} lg={4}>
                
            <Typography >
                {firebase.auth().currentUser.displayName}
            </Typography>
            <Typography>
                {data.city}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
                Logged in as {data.role}
            </Typography>
                </Grid>
                
                <Grid item xs={12} sm={4} md={4} lg={4} style={{display:"flex" ,justifyContent: "space-around" }}>
                    
                    <div>               
                         <AccountBalanceWallet/>
                   <Typography>
                   {data.wallet} /- INR
                       </Typography> 
                       <Button>
                           Claim
                       </Button>
                       </div>

                </Grid>
                 </Grid>
                 </center>
            
        </div>
            
        </div>
    )
}

export default FDetails
