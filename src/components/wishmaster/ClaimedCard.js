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
import { db } from "../../Firebase";
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

function ClaimedCard({prod,id}) {
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
    let url = `https://www.google.com/maps/search/?api=1&query=${prod.fpickUp.coordinates.lat},${prod.fpickUp.coordinates.lng}`;
    let custurl = `https://www.google.com/maps/search/?api=1&query=${prod.cLocation.coordinates.lat},${prod.cLocation.coordinates.lng}`;

    const classes = useStyles();
    function LoadAddress({ prod,id }) {
        if (openAddress === true) {
          return (
            <div>
               
        <TableContainer component={Paper} style={{marginBottom:10}}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell>Customer Info</TableCell>
    
                <TableCell align="left"> <Typography variant="body2">{prod.cAddress.name}</Typography>
                
    
    <Typography variant="body2">
      {prod.cAddress.address}
    </Typography>
    <Typography variant="body2">{prod.cAddress.city}</Typography>
    </TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Farmer Info</TableCell>
    
                <TableCell align="left"> {prod.faddress}
    </TableCell>
              </TableRow>
              
            </TableHead>
          </Table>
        </TableContainer>
        
        
             

            </div>
          );
        } else {
          return null;
        }
      }
      return (
        <Paper className={classes.root}>
          
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
              <TableRow>
              <TableCell>Farmer Location</TableCell>
    
                <TableCell align="left">   <Link href={url}> <LocationSearching/>
               
  </Link></TableCell>
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
                <TableRow>
               
                  <TableCell >Customer Location</TableCell>
                  <TableCell align="left"><Link href={custurl}>
                  <LocationSearching/>
               </Link>  </TableCell>
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
            <TableHead>
            {prod.collect ? (
   <TableRow>
   <TableCell>Collect</TableCell>

     <TableCell align="left">{prod.totalAmount} /-</TableCell>
   </TableRow>

            ):(
              null
            )}

           
            </TableHead>
            <TableBody>
            <TableRow>
               
               <TableCell >Your OTP</TableCell>
               <TableCell align="left"> {prod.wotp} </TableCell>
             </TableRow>
                <TableRow>
               
                  <TableCell >Payment Method</TableCell>
                  <TableCell align="left"> {prod.paymentMethod} </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <center>
        <TextField style={{width: 200}}
          id="outlined-basic"
          label="Customer OTP"
          required
          type="text"
          value={cOtp}
          onChange={(e) => setCOtp(e.target.value)}
        /> 
      
       <Button style={{height:"100%"}}
      endIcon={<CheckCircle/>}
        onClick={()=> {Verified()
          VerifyPayment()
        Method()}}


>Verify</Button>
</center>
    
              <div>{LoadAddress({ prod })}</div>
              <center>
              {openAddress ? (
                <Button 
                  onClick={() => setOpenAddress(false)}
                  startIcon={<ExpandLess />}
                >
                  Less
                </Button>
              ) : (
                <Button
                  onClick={() => setOpenAddress(true)}
                  startIcon={<ExpandMore />}
                >
                  More
                </Button>
              )}
              </center>
        </Paper>
      );
}

export default ClaimedCard
