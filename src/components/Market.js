import React from 'react'
import { db } from "../Firebase";
import { useState, useEffect } from "react";
import InvCard from './InvCard';
import { Grid } from '@material-ui/core';

function Market() {
  const [products, setProducts] = useState([]);

    useEffect(() => {
        db.collection("Inventory").onSnapshot((snapshot) => {
          setProducts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              product: doc.data(),
            }))
          );
        });
      }, []);

    return (
        <div>
            <Grid container spacing={2}>
        {products.map(({ id, product }) => {
          return (
            <Grid key={id} item xs={6} lg={2} sm={4} md={3}>
              <InvCard id={id} product={product}  />
            </Grid>
          );
        })}
      </Grid>
        </div>
    )
}

export default Market
