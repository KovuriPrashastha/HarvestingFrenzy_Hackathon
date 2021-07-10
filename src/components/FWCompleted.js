import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActions,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Table,
  Paper,
  TextField,
  Link,
} from "@material-ui/core";
import { ExpandMore, ExpandLess, CheckCircle, LocalShipping, DirectionsWalk, LocationSearching } from "@material-ui/icons";
import { db } from "../Firebase";
import firebase from "firebase"

const useStyles = makeStyles({
    root: {
      padding:5,
      display: "flex",
      flexDirection : "column",
      justifyContent: "space-around",
      maxWidth: 600,
      margin: "auto",
      marginBottom: 10,
      width: "95%",
    },
  });

function FWCompleted({prod,id}) {
  function VerifyPayment() {
    if(cOtp == prod.cOtp) {
      db.collection("wishMasterData").doc(firebase.auth().currentUser.uid).update({
        wallet: firebase.firestore.FieldValue.increment(prod.deliveryCharge),

      })
    } 
  }
  function Method() {
    if(prod.paymentMethod == "Cash On Delivery") {
      db.collection("wishMasterData").doc(firebase.auth().currentUser.uid).update({
        cashSubmit: firebase.firestore.FieldValue.increment(prod.totalAmount),

      })
    } 
  }

  function Verified() {
    if(cOtp==prod.cOtp) {
      db.collection("Orders").doc(`${id}`).update({
        status : "Completed"
      })
     
    }
    
  }
    const [openAddress, setOpenAddress] = useState("")
    const [cOtp, setCOtp] = useState(null)
    // let url = `https://www.google.com/maps/search/?api=1&query=${prod.fpickUp.coordinates.lat},${prod.fpickUp.coordinates.lng}`;
    // let custurl = `https://www.google.com/maps/search/?api=1&query=${prod.cLocation.coordinates.lat},${prod.cLocation.coordinates.lng}`;

    const classes = useStyles();
      return (
        <Paper className={classes.root}>
           <Typography variant="overline">
                   Order Id { id}
               </Typography>
            <TableContainer component={Paper} style={{marginBottom:10}}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell>Farmer Name</TableCell>
    
                <TableCell align="left">{prod.fName}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Farmer Phone</TableCell>
    
                <TableCell align="left">{prod.fphone}</TableCell>
              </TableRow>
             
              
            </TableHead>
          </Table>
        </TableContainer>
            <TableContainer component={Paper} style={{marginBottom:10}}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell>Customer Name</TableCell>
    
                <TableCell align="left">{prod.cName}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Customer Phone</TableCell>
    
                <TableCell align="left">{prod.cAddress.phoneNo}</TableCell>
              </TableRow>
               
                </TableHead>
            
          </Table>
        </TableContainer>
        <TableContainer component={Paper} style={{marginBottom:10}}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prod.products.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.product}
                  </TableCell>
                  <TableCell align="left">{row.quantity} {row.unit}</TableCell>
                  <TableCell align="left">{row.price} /-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    
             
        <TableContainer component={Paper} style={{marginBottom:10}}>
          <Table className={classes.table} aria-label="simple table">
           
            <TableBody>
            <TableRow>
               
               <TableCell >Total Amount</TableCell>
               <TableCell align="left"> {prod.totalAmount} </TableCell>
             </TableRow>
            <TableRow>
               
               <TableCell >Payment Method</TableCell>
               <TableCell align="left"> {prod.paymentMethod} </TableCell>
             </TableRow>
                <TableRow>
               
                  <TableCell >Status</TableCell>
                  <TableCell align="left"> {prod.status} </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
       
      
      
      
        </Paper>
      );
}

export default FWCompleted
