import React from 'react';
import { db } from '../../Firebase';
import { useState, useEffect } from 'react';
import firebase from 'firebase';
import Crop from './Crop.js';
import { Grid } from '@material-ui/core';

function FarmerProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    db.collection('FarmerProducts')
      .where('uid', '==', firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            product: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <div style={{ padding: 10 }}>
      <Grid container spacing={2}>
        {products.map(({ id, product }) => {
          return (
            <Grid key={id} item xs={6} sm={2}>
              <Crop product={product} id={id} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default FarmerProducts;
