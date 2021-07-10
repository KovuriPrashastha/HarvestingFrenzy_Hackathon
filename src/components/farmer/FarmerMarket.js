import React from "react";
import { db } from "../../Firebase";
import FarmerNav from "./FarmerNav";
import { useState, useEffect } from "react";
import MarketCard from "../MarketCard";
import { Button, Grid, IconButton, Snackbar, TextField, Tooltip } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { House, Store } from "@material-ui/icons";
import Market from "../Market";

function FarmerMarket({ farmer, setFarmer }) {
  const [products, setProducts] = useState([]);
  const [pin, setPin] = useState("");

  useEffect(() => {
    db.collection("FarmerProducts").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          product: doc.data(),
        }))
      );
    });
  }, []);

  function loc() {
    db.collection("FarmerProducts")
      .where("pin", "==", pin)
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            product: doc.data(),
          }))
        );
      });
  }

  const [open, setOpen] = React.useState(false);
  const [inv, setInv] = React.useState(false);
  function Inv() {
    if(inv){
      setInv(false)
    } else {
      setInv(true)
    }
  }

  function Decide() {
    if(inv){
      return <Market/>
    } else {
      return <div> 
      <div style={{ display: "flex", justifyContent: "center" }}>
      <TextField
        style={{ marginBottom: 5 }}
        id="standard-basic"
        label="Your Postal Pin"
        required
        type="string"
        value={pin}
        onChange={(event) => setPin(event.target.value)}
        inputProps={{ maxLength: 6 }}
      />
      <Button
        onClick={() => {
          loc();
        }}
      >
        Search
      </Button>
    </div>
    <div style={{ padding: 10 }}>
      <Grid container spacing={2}>
        {products.map(({ id, product }) => {
          return (
            <Grid key={id} item xs={6} lg={2} sm={4} md={3}>
              <MarketCard
                key={id}
                product={product}
                handleClick={handleClick}
              />
            </Grid>
          );
        })}
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Product Added To Cart
        </Alert>
      </Snackbar>
    </div></div>
    }
    
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <FarmerNav farmer={farmer} setFarmer={setFarmer} />
      <Tooltip title='Market' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  onClick={Inv}
                >
                  <House/>
                </IconButton>
              </Tooltip>
      {Decide()}
      
    </div>
  );
}

export default FarmerMarket;
