import React from "react";
import { db } from "../../Firebase";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { storage } from "../../Firebase";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { House, Store } from "@material-ui/icons";

function AddProduct() {
  const [cost, setCost] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [product, setProduct] = useState(null);
  const [unit, setUnit] = useState(null);
  const [menu, setMenu] = useState([]);
  const [units, setUnits] = useState([]);
  const [location, setLocation] = useState("");
  const [pin, setPin] = useState("");
  const [inv, setInv] = useState(false);
  function Inv() {
    if(inv){
      setInv(false)
    } else {
      setInv(true)
    }
  }


  const Dozen = [{ qty: 1 }, { qty: 2 }, { qty: 3 }, { qty: 4 }, { qty: 5 }];
  const Kilogram = [{ qty: 1 }, { qty: 2 }, { qty: 3 }, { qty: 4 }, { qty: 5 }];
  const Gram = [{ qty: 250 }, { qty: 500 }, { qty: 750 }];

  useEffect(() => {
    db.collection("Products").onSnapshot((snapshot) => {
      setMenu(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    console.log(menu);
    db.collection("Units").onSnapshot((snapshot) => {
      setUnits(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          unit: doc.data(),
        }))
      );
    });
  }, []);

  function qty() {
    if (unit === "Kilogram") {
      return (
        <FormControl>
          <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <Select
            style={{ marginBottom: 5 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          >
            {Kilogram.map((obj) => {
              return <MenuItem value={obj.qty}>{obj.qty}</MenuItem>;
            })}
          </Select>
        </FormControl>
      );
    }
    if (unit === "Gram") {
      return (
        <FormControl>
          <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <Select
            style={{ marginBottom: 5 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          >
            {Gram.map((obj) => {
              return <MenuItem value={obj.qty}>{obj.qty}</MenuItem>;
            })}
          </Select>
        </FormControl>
      );
    }
    if (unit === "Dozen") {
      return (
        <FormControl>
          <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <Select
            style={{ marginBottom: 5 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          >
            {Dozen.map((obj) => {
              return <MenuItem value={obj.qty}>{obj.qty}</MenuItem>;
            })}
          </Select>
        </FormControl>
      );
    }
  }

  function handleUpload() {
    storage
      .ref("veg/")
      .child(product.toLowerCase() + ".jpg")
      .getDownloadURL()
      .then((url) => {
        db.collection("FarmerProducts").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          uid: firebase.auth().currentUser.uid,
          name: firebase.auth().currentUser.displayName,
          product: product,
          cost: Number(cost),
          quantity: Number(quantity),
          unit: unit,
          location: location.toLowerCase(),
          pin: pin,
          imgUrl: url,
        });
      });
    setPin(null);
    setLocation(null);
    setProduct(null);
    setCost(null);
    setUnit(null);
    setQuantity(null);
  }
  
  function handleInvUpload() {
    storage
      .ref("veg/")
      .child(product.toLowerCase() + ".jpg")
      .getDownloadURL()
      .then((url) => {
        const usersRef = db.collection('Inventory').doc(product);
        usersRef.get().then((docSnapshot) => {
          console.log('hellllllllllllll', docSnapshot.data());
          if (docSnapshot.exists) {
            db.collection("Inventory").doc(product).update({
              fInfo: firebase.firestore.FieldValue.arrayUnion({
                fUid: firebase.auth().currentUser.uid,
                fName: firebase.auth().currentUser.displayName,
                cost: Number(cost),
                quantity: Number(quantity),
                unit: unit,
                location: location.toLowerCase(),
                pin: pin,
              }),
            });

          } else{
            db.collection("Inventory").doc(product).set({
              fInfo: firebase.firestore.FieldValue.arrayUnion({
                fUid: firebase.auth().currentUser.uid,
                fName: firebase.auth().currentUser.displayName,
                cost: Number(cost),
                quantity: Number(quantity),
                unit: unit,
                location: location.toLowerCase(),
                pin: pin,
              }),
              imgUrl: url,
            });
          }})
 
      });
    setPin(null);
    setLocation(null);
    setProduct(null);
    setCost(null);
    setUnit(null);
    setQuantity(null);
  }
   function Decide() {
     if(inv) {
       return <div>
          <Tooltip title='Market' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  onClick={Inv}
                >
                  <House/>
                </IconButton>
              </Tooltip>
              <Autocomplete
                  style={{ marginBottom: 5 }}
                  required
                  id="combo-box-demo"
                  options={menu}
                  getOptionLabel={(option) => option.id}
                  onChange={(event, value) => {
                    if (value) setProduct(value.id);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Product" />
                  )}
                />
                     <TextField
                  style={{ marginBottom: 5 }}
                  id="standard-basic"
                  label="Cost"
                  required
                  type="number"
                  value={cost}
                  onChange={(event) => setCost(event.target.value)}
                />
                    <Autocomplete
                  style={{ marginBottom: 5 }}
                  required
                  id="combo-box-demo"
                  options={units}
                  getOptionLabel={(option) => option.id}
                  onChange={(event, value) => setUnit(value.id)}
                  renderInput={(params) => <TextField {...params} label="Unit" />}
                />
    <TextField
                  style={{ marginBottom: 5 }}
                  id="standard-basic"
                  label="Location"
                  required
                  type="string"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
                <TextField
                  style={{ marginBottom: 5 }}
                  id="standard-basic"
                  label="Postal Pin"
                  required
                  type="string"
                  value={pin}
                  inputProps={{ maxLength: 6 }}
                  onChange={(event) => setPin(event.target.value)}
                />
                <Button onClick={handleInvUpload}>
                  upload to Inventory
                </Button>
       </div>

     }
     else{
       return <div>
          <Tooltip title='Inventory' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  onClick={Inv}
                >
                  <Store/>
                </IconButton>
              </Tooltip>
       <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <form
                align="center"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justify: "space-around",
                  padding: 20,
                  maxWidth: 300,
                  margin: "auto",
                }}
              >
                <Autocomplete
                  style={{ marginBottom: 5 }}
                  required
                  id="combo-box-demo"
                  options={menu}
                  getOptionLabel={(option) => option.id}
                  onChange={(event, value) => {
                    if (value) setProduct(value.id);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Product" />
                  )}
                />
                <Autocomplete
                  style={{ marginBottom: 5 }}
                  required
                  id="combo-box-demo"
                  options={units}
                  getOptionLabel={(option) => option.id}
                  onChange={(event, value) => setUnit(value.id)}
                  renderInput={(params) => <TextField {...params} label="Unit" />}
                />
                {qty()}
                <TextField
                  style={{ marginBottom: 5 }}
                  id="standard-basic"
                  label="Cost"
                  required
                  type="number"
                  value={cost}
                  onChange={(event) => setCost(event.target.value)}
                />
                <TextField
                  style={{ marginBottom: 5 }}
                  id="standard-basic"
                  label="Location"
                  required
                  type="string"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
                <TextField
                  style={{ marginBottom: 5 }}
                  id="standard-basic"
                  label="Postal Pin"
                  required
                  type="string"
                  value={pin}
                  inputProps={{ maxLength: 6 }}
                  onChange={(event) => setPin(event.target.value)}
                />
                <br />
                <Button
                  style={{ marginBottom: 5 }}
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                >
                  Add
                </Button>
              </form>
            </Grid>
            <Grid style={{ padding: 40 }} item>
              <Paper style={{ padding: 10 }}>
                <Typography variant="h5">Your Product</Typography>
                <h6>Product : {product}</h6>
                <h6>Qty : {quantity}</h6>
                <h6>Unit : {unit}</h6>
                <h6>Price : {cost}</h6>
                <h6>Location : {location}</h6>
                <h6>Pin : {pin}</h6>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </div>
       
                  }
     
   }

  return (
        Decide()
    
  );
}

export default AddProduct;
