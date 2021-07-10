import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import image from "../../images/farmerDp.jpg";
import { Button, CardActionArea, CardMedia, IconButton, Modal, Paper, TextField } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { db } from "../../Firebase";

const Crop = ({ id, product }) => {
  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = React.useState("");
  const [cost, setCost] = React.useState("");

 


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card>
        <CardMedia style={{ height: "100px" }} image={product.imgUrl} />
      {/* <CardMedia style={{ height: "100px" }} image={image} /> */}

      <CardContent>
        <Typography variant="h6" component="p">
          {product.product}
        </Typography>
        <Typography variant="body2" component="p">
          Qty : {product.quantity} {product.unit}
        </Typography>
        <Typography variant="body2" component="p">
          Price : {product.cost} /-
        </Typography>
      </CardContent>
      <CardActionArea>
        <Typography style={{ padding: 10 }} variant="body2" component="p">
          From {product.name}
        </Typography>
      </CardActionArea>
 <IconButton
 onClick={handleOpen}>
   <Edit/>
 </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{marginTop:"25%", width: "95%", maxWidth:600}}
      ><center>
        <Paper style={{display:"flex", flexDirection:"column",padding:20}}>
        <TextField
          id="outlined-basic"
          label="qty"
          required
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
             <TextField
          id="outlined-basic"
          label="price"
          required
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <Button onClick={()=>{
      db.collection("FarmerProducts").doc(`${id}`).update({
        quantity: number,
        cost:cost,
      })
      handleClose()
        }}>
          Submit
        </Button>
        </Paper>
        </center>
      </Modal>

    </Card>
  );
};

export default Crop;
