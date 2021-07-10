import { Button, Card, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react'
import { db } from '../Firebase';
import firebase from "firebase"

function InvCard({id,product}) {
    const [item, setItem] = useState("")
  const Kilogram = [{ qty: 1 }, { qty: 2 }, { qty: 3 }, { qty: 4 }, { qty: 5 }];
  const [quantity, setQuantity] = useState(null);

  function addItem({ product }) {

db.collection("UserData")
      .doc(firebase.auth().currentUser.uid).update({
          xproducts: firebase.firestore.FieldValue.arrayUnion(
            {
              product: id,
              quantity: quantity,
              price: item.cost*quantity,
              unit: item.unit,
              fId: item.fUid,
              fName: item.fName,
            }
          ),
      }).then(()=>{
        db.collection("UserData")
        .doc(firebase.auth().currentUser.uid).update({
            XcartTotal: firebase.firestore.FieldValue.increment(item.cost*quantity)
        })

      })
}

    
    return (
        <div>
             <Card style={{ height: 270, position: "relative" }}>
        <CardMedia style={{ height: "100px" }} image={product.imgUrl} />

        <CardContent>
          <Typography variant="h6" component="p">
          <strong>{id}</strong>
          </Typography>
                <FormControl style={{width:"90%"}}>
          <InputLabel id="demo-simple-select-label">Select Farmer</InputLabel>
          <Select
            style={{}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={item}
            onChange={(event) => {setItem(event.target.value)
            console.log(event.target.value)
            }}
          >
            {product.fInfo.map((obj) => {
              return <MenuItem value={obj}>from {obj.fName} for {obj.cost}/- per Unit </MenuItem>;
            })}
          </Select>
        </FormControl>
        <br/>
                  <FormControl style={{width:"90%"}}>
          <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <Select
            
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
            

          <div
            style={{
              position: "absolute",
              bottom: 0,
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              onClick={() => {
                addItem({ product });
                // handleClick();
              }}
            >
              Add To Cart
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* <h5>
          {item}
      </h5> */}
        </div>
    )
}

export default InvCard
