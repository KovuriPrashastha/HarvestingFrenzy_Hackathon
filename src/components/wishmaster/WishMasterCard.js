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
import otpGenerator from "otp-generator"

const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "space-around",
      maxWidth: 600,
      margin: "auto",
      marginBottom: 10,
      width: "95%",
    },
  });

function WishMasterCard({prod,id}) {
  const classes = useStyles();
const [phone, setPhone] = useState("")
  useEffect(() => {
    db.collection("wishMasterData")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        setPhone(doc.data().phone)
      });
  }, []);
    const [openAddress, setOpenAddress] = useState("")
     
    function Claim() {
      db.collection("Orders").doc(`${id}`).update({
        status : "Accepted by Wish Master",
        wotp : otpGenerator.generate(4, { upperCase: false, specialChars: false, alphabets:false }),
        // wphone: phone,
        wid: firebase.auth().currentUser.uid,
        awaitNumber: 2,
      })
      
    }
    let url = `https://www.google.com/maps/search/?api=1&query=${prod.fpickUp.coordinates.lat},${prod.fpickUp.coordinates.lng}`;
    let custurl = `https://www.google.com/maps/search/?api=1&query=${prod.cLocation.coordinates.lat},${prod.cLocation.coordinates.lng}`;
    function LoadAddress({ prod,id }) {
        if (openAddress === true) {
          return (
            <div>
              <Divider />
              <Typography variant="h6">Customer Address</Typography>
              <Typography variant="body2">{prod.customerAddress.name}</Typography>
              <Typography variant="body2">
                {prod.customerAddress.phoneNo}
              </Typography>
              <Typography variant="body2">{prod.customerAddress.email}</Typography>
    
              <Typography variant="body2">
                {prod.customerAddress.address1}
              </Typography>
              <Typography variant="body2">
                {prod.customerAddress.address2}
              </Typography>
              <Typography variant="body2">{prod.customerAddress.city}</Typography>
              <Typography variant="body2">{prod.customerAddress.pin}</Typography>
              <Typography variant="body2">{prod.customerAddress.state}</Typography>
            </div>
          );
        } else {
          return null;
        }
      }
      return (
        <center>
            <Paper style={{padding:5, display: "flex", flexDirection:"column", maxWidth: 600, width: "90%"}}>
          
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
           
              {/* <TextField 
              /> */}
              <Button onClick={
                Claim
              }>
                Claim
              </Button>
          </Paper>
          </center>
      );
}

export default WishMasterCard;
