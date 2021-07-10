import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import firebase from "firebase";
import { db } from "../Firebase";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Rating } from "@material-ui/lab";
import ReactStars from "react-rating-stars-component";
import { Add, Chat, StarRate } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function MarketCard({ id, product, handleClick }) {
const [rating, setRating] = useState([])
const [msg, setMsg] = useState("")


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [caltab, setCaltab] = useState(false)
  const [chatTab, setChatTab] = useState(false)
  const [chatInfo, setChatInfo] = useState([])


  const [cInfo, setCInfo] = useState({})
  const [msgSent, setMsgSent] = useState(false)


   const handleCalOpen = () => {

    console.log(product.product)
    setCaltab(true);
    db.collection("Products").doc(product.product).get().then((doc)=>{

        console.log('Document data:', doc.data());
        setCInfo(doc.data());
      })}

      const handleChatOpen = () => {

        console.log(product.product)
        setChatTab(true);
        let chatsId = `${product.uid}${firebase.auth().currentUser.uid}`
        db.collection("Chats").doc(`${product.uid}${firebase.auth().currentUser.uid}`).get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            console.log('doc exists');
                db.collection("Chats").doc(`${product.uid}${firebase.auth().currentUser.uid}`).collection("conversation")
                .orderBy("timestamp")
                .limit(7)
                .onSnapshot((snapshot) => {
                  setChatInfo(
                    snapshot.docs.map((doc) => ({
                      id: doc.id,
                      data: doc.data(),
                    }))
                  );
                });
          } 
          else {
            console.log('doc not exists');

            db.collection("Chats").doc(`${product.uid}${firebase.auth().currentUser.uid}`).set({
              cId: firebase.auth().currentUser.uid,
              fId: product.uid,
              cName: firebase.auth().currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                fName: product.name,
            })
              db.collection("Chats").doc(`${product.uid}${firebase.auth().currentUser.uid}`).collection("conversation").add({
                sId: firebase.auth().currentUser.uid,
               msg: "Start of conversation",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  
              }).then(()=>{
              db.collection("Chats").doc(`${product.uid}${firebase.auth().currentUser.uid}`).collection("conversation").onSnapshot((snapshot)=>{
               
                setChatInfo( snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                 
                }))
              )})
            })
              }
    

  })}

    
  const handleOpen = () => {
    setOpen(true);
    db.collection("farmerData").doc(product.uid).collection("rating")
    //   .orderBy("timestamp", "desc")
    //   .limit(6)
      .onSnapshot((snapshot) => {
        setRating(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  };
  const handleChatClose = () => {
    setChatTab(false);
    setRating([])
  };
  const handleClose = () => {
    setOpen(false);
    setRating([])
  };
  const handleCalClose = () => {
    setCaltab(false);
    setCInfo({})
  };

  function UploadMsg() {
    db.collection("chats").set({

    })
    
  }
  function handleMsgSend() {
    db.collection("Chats").doc(`${product.uid}${firebase.auth().currentUser.uid}`).collection("conversation").add({
      sId: firebase.auth().currentUser.uid,
     msg: msg,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),

    }).then(()=>{
      setMsgSent(true)
    })
    
  }


  function addItem({ product }) {
    const usersRef = db.collection("UserData").doc(firebase.auth().currentUser.uid).collection("cart").doc(product.uid)
        usersRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            console.log("doc exists");
            console.log(docSnapshot)
            db.collection("UserData")
      .doc(firebase.auth().currentUser.uid).collection("cart").doc(product.uid).update({
          products:
          firebase.firestore.FieldValue.arrayUnion({
            product: product.product,
            quantity: product.quantity,
            price: product.cost,
            unit: product.unit,
          }),
          totalAmount: firebase.firestore.FieldValue.increment(product.cost),

      });


          }
        else {
db.collection("UserData")
      .doc(firebase.auth().currentUser.uid).collection("cart").doc(product.uid).set({
          customerName: firebase.auth().currentUser.displayName,
          products:
          firebase.firestore.FieldValue.arrayUnion({
            product: product.product,
            quantity: product.quantity,
            price: product.cost,
            unit: product.unit,
          }),
          farmerId: product.uid,
          farmerName: product.name,
          totalAmount: firebase.firestore.FieldValue.increment(product.cost),
      });

        }
        
        })
 

    
  }
  return (
    <div>
      <Fade   in="true"
          style={{ transformOrigin: '0 0 0',
          timeout: 500
        
        }}>
      <Card style={{ height: 300, position: "relative" }}>
        <CardMedia style={{ height: "100px" }} image={product.imgUrl} />

        <CardContent>
          <Typography variant="h6" component="p">
          <strong style={{cursor:"pointer"}} onClick={handleCalOpen}>{product.product}</strong>
          </Typography>
          <Typography variant="body2" component="p">
            Qty : {product.quantity} {product.unit}
          </Typography>
          <Typography variant="body2" component="p">
            Price : {product.cost} /-
          </Typography>
          <Typography variant="body2" component="p" >
            From <strong onClick={handleOpen}>{product.name}</strong> at {product.location.toUpperCase()},
            {product.pin}
          </Typography>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              alignItems: "center",
            }}
          >
        
            <IconButton
                  edge="end"
                  color="inherit"
                  style={{ margin: 1 }}
                  onClick={handleChatOpen}
                >
                  <Chat />
                </IconButton>    <IconButton
                  edge="end"
                  color="inherit"
                  style={{ margin: 1 }}
                  onClick={() => {
                    addItem({ product });
                    handleClick();
                  }}
                >
                  <Add/>
                </IconButton>
          </div>
        </CardContent>
      </Card>
      </Fade>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <div>
             {rating.map(({ id, data }) => (
       <Paper style={{padding:10}}>
           <Typography>
                {data.cName}
           </Typography>
           <ReactStars
    count={5}
    value={data.stars}
 edit={false}
    size={24}
    activeColor="#ffd700"
  />
           <Typography>
                {data.content}
           </Typography>
     
       </Paper>
      ))}
        </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={caltab}
        onClose={handleCalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={caltab}>
        <div>
       <Paper style={{padding:10,width: 300}}>
         <center>
         <strong style={{cursor: "pointer"}}>
           {product.product}
         </strong>
         </center>
       <List>
                <ListItem>
                  <ListItemIcon>
                    <StarRate />
                  </ListItemIcon>
                  <ListItemText
                    primary = {`${cInfo.cal} Calories`}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <StarRate />
                  </ListItemIcon>
                  <ListItemText
                    primary = {`Vitamins ${cInfo.vit}`}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <StarRate />
                  </ListItemIcon>
                  <ListItemText
                    primary = {cInfo.info}/>
                </ListItem>
            </List>
     
       </Paper>
        </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={chatTab}
        onClose={handleChatClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={chatTab}>
        <div>
       <Paper style={{padding:10,width: 300}}>
         { chatInfo.map(({id,data})=>{
           return <div>
             {data.msg}
           </div>
         })}
        <div>
          {msgSent ? (
            <center>
            <Typography>
              Message Sent
            </Typography>
            <Typography variant="overline">
              You can wait or check for replies in chats tab later
            </Typography>
            </center>
          ) : (
<div>
<TextField
id="outlined-basic"
label="Type here"
required
type="text"
value={msg}
onChange={(e) => setMsg(e.target.value)}
/>
<Button onClick={handleMsgSend}>
Send
</Button>
</div>
          )}
       
     </div>
       </Paper>
        </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default MarketCard;
