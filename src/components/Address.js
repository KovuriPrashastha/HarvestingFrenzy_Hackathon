import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, p } from "@material-ui/core";
import { db } from "../Firebase";

function Address() {
  const [address, setAddress] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    db.collection("UserData")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        setAddress(doc.data().uDetails);
      });
  }, []);

  function UpdateAddress() {
    db.collection("UserData")
      .doc(firebase.auth().currentUser.uid)
      .update({
        uDetails: {
          name: name,
          email: email,
          phoneNo: phoneNo,
          address: address1,
          city: city,
          pin: pin,
          state: region,
          cLocation: "",
        },
      });
  }

  function adDiv() {
    if (!address) {
      return (
        <Paper
          style={{
            textAlign: "center",
            margin: "auto",
            padding: 10,
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <TextField
            autoComplete="off"
            style={{ marginBottom: 5 }}
            id="standard-basic"
            label="Name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            autoComplete="off"
            style={{ marginBottom: 5 }}
            id="standard-basic"
            label="Email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            autoComplete="off"
            style={{ marginBottom: 5 }}
            id="standard-basic"
            label="Phone Number"
            required
            value={phoneNo}
            onChange={(event) => setPhoneNo(event.target.value)}
          />
       <TextareaAutosize aria-label="minimum height" rowsMin={6} placeholder="Address"
            type='text'
            value={address1}
            onChange={(event) => setAddress1(event.target.value)} 
            style={{marginBottom:5}}
            
            />
          
          <TextField
            autoComplete="off"
            style={{ marginBottom: 5 }}
            id="standard-basic"
            label="Enter Your City"
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <TextField
            autoComplete="off"
            style={{ marginBottom: 5 }}
            id="standard-basic"
            label="Zip Code"
            required
            value={pin}
            onChange={(event) => setPin(event.target.value)}
          />
          <TextField
            autoComplete="off"
            style={{ marginBottom: 5 }}
            id="standard-basic"
            label="State/Province/Region"
            required
            value={region}
            onChange={(event) => setRegion(event.target.value)}
          />
          <Button
            onClick={() => {
              UpdateAddress();
            }}
          >
            Set Address
          </Button>
        </Paper>
      );
    } else {
      return (
        <div
          style={{
            padding: 10,
            margin: "auto",
            maxWidth: 600,
          }}
        >
          
          <TableContainer component={Paper} >
          <Table aria-label="simple table">
          <TableHead>
              <TableRow>
                <TableCell>Your Address/Contact Details</TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell align="left">          <p>{address.name}<br/>{address.email}<br/>
          {address.phoneNo}<br/>
          {address.address}<br/>
          {address.city}<br/>
          {address.pin}<br/>
          {address.state}</p></TableCell>
              </TableRow>
            </TableHead>
        
          </Table>
        </TableContainer>

        </div>
      );
    }
  }

  return <div>{adDiv()}</div>;
}

export default Address;
