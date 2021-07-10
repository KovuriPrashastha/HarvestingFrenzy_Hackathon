import React, { useEffect, useState } from 'react'
import WishMasterNav from './WishMasterNav'
import {
  Assignment,
  DoneAll,
    DynamicFeed,
    ExitToApp,
    LocalFlorist,
    Person,
    ShoppingCart,
    Store,
  } from "@material-ui/icons";
  import { AppBar, Toolbar, IconButton, Badge, Tooltip, Paper, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import firebase from "firebase"
import { db } from '../../Firebase';
import WishMasterCard from './WishMasterCard';
import ClaimedCard from './ClaimedCard';
import WMDetails from './WMDetails';
import FWCompleted from "../FWCompleted";
  
  export const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#673ab7",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);

function WishMasterProfile({wishMaster,setWishMaster}) {
    const [orders, setOrders] = useState([])
    const [open, setOpen] = useState("Claimed")


    useEffect(() => {
        db.collection("Orders")
        .where("wid","==", `${firebase.auth().currentUser.uid}`)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot.docs);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              prod: doc.data(),
            }))
          );
        });
    }, [])
    function Decide() {
      if(open === "Claimed" ) {
       return orders.map(({ id, prod }) => {
   
  
        if(prod.status === "Accepted by Wish Master" || prod.status === 'In Transit') {
          return <ClaimedCard prod={prod} key={id} id={id} />;
        }
        
        
        }
        )
      }
      else if( open === "Completed") {

        return orders.map(({id,prod}) => {
          if(prod.status === "Completed") {
            return <FWCompleted prod={prod} key={id} id={id} />;
          }

        })
      }
    }

    return (
        <div>
            <WishMasterNav setWishMaster={setWishMaster}/>
            <Paper style={{marginLeft: 10, marginRight :10}}>
              <div style={{margin: 5}}>
                <WMDetails/>
              </div>
            <ThemeProvider theme={theme}>
          <div style={{ paddingBottom: 20 }}>
            <AppBar position="static">
              <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
                <div>
                  <Tooltip title="Your Orders" placement="bottom-start">
                    <IconButton
                      edge="end"
                      color="inherit"
                      style={{ margin: 1 }}
                      onClick={()=> {
                        setOpen("Claimed")
                      }}
                    >
                      <Assignment />
                    </IconButton>
                  </Tooltip>
    
                  <Tooltip title="Profile" placement="bottom-start">
                    <IconButton
                      edge="end"
                      color="inherit"
                      style={{ margin: 1 }}
                      onClick={()=> {
                        setOpen("Completed")
                      }}
                    >
                      <DoneAll />
                    </IconButton>
                  </Tooltip>
                </div>
              </Toolbar>
            </AppBar>
          </div>
        </ThemeProvider>

        {Decide()}
</Paper>

        </div>
    )
}

export default WishMasterProfile
