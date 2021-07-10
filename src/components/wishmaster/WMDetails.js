import { Avatar, Button, Card, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import firebase from "firebase"
import Wdp from "../../images/wdp.png"
import { AccountBalance, AccountBalanceWallet, Apartment } from '@material-ui/icons';

function WMDetails() {
    const [data, setData] = useState("")

    useEffect(() => {
        db.collection("wishMasterData").doc(firebase.auth().currentUser.uid).get().then(snap => {
            setData(snap.data())

           console.log(snap.data())
        })
       
    }, [])
    return (
        <div style={{marginTop:10}}>
            <center>
                  <Grid container spacing={2}>
         
                <Grid item xs={12} sm={4} md={4} lg={4}>
                <Avatar variant="rounded" style={{width: 150,height: 150}} src={Wdp} /> 
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
                        <Apartment/>
                   <Typography> {data.cashSubmit} INR</Typography>
                   <Button variant="outlined" size="small">Submit</Button>


                    </div>
                    
                    <div>               
                         <AccountBalanceWallet/>
                   <Typography>
                   {data.wallet} INR
                       </Typography> 
                       <Button variant="outlined" size="small">
                           Claim
                       </Button>
                       </div>

                </Grid>
                 </Grid>
                 </center>
            
        </div>
    )
}

export default WMDetails
