import { Avatar, Button, Card, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import firebase from "firebase"
import Dp from "../../images/custDp.jpg";


function CDetails() {
    const [data, setData] = useState("")

    useEffect(() => {
        db.collection("UserData").doc(firebase.auth().currentUser.uid).get().then(snap => {
            setData(snap.data())

           console.log(snap.data())
        })
       
    }, [])
    return (
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
Logged in as Customer
            </Typography>
                </Grid>
                
                 </Grid>
                 </center>
            
        </div>            
    )
}

export default CDetails
