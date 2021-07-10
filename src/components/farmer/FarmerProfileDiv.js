import React from "react";
import { useState } from "react";
import AddProduct from "./AddProduct";
import FarmerProducts from "./FarmerProducts";
import Paper from "@material-ui/core/Paper";
import { AppBar, Button, IconButton, makeStyles, Toolbar, Tooltip } from "@material-ui/core";
import FarmerReceivedOrders from "./FarmerReceivedOrders";
import { AddCircle, DirectionsWalk, Dns, DoneAll, ListAlt, LocalShipping } from "@material-ui/icons";
import TakenOrders from "./TakenOrders";
import PickUpOrders from "./PickUpOrders";
import FarmerCompleted from "./FarmerCompleted";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: 10,
  },
  large: {
    margin: "auto",
    marginTop: 10,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

function FarmerProfileDiv(props) {
  const classes = useStyles();

  const [active, setActive] = useState("Received");

  function activeComp() {
    if (active === "Add") {
      return <AddProduct />;
    } else if (active === "Products") {
      return <FarmerProducts />;
    } else if (active === "Received") {
      return <FarmerReceivedOrders />;
    } else if (active === "Taken") {
      return <TakenOrders/>
    } else if (active === "PickUps") {
      return <PickUpOrders/>
    } else if( active === "Completed") {

      return <FarmerCompleted/>
    }
  }

  return (
    <div>
      <Paper
        style={{ position: "relative" }}
        id="drawer-container"
        className={classes.paper}
        elevation={3}
      >
        <AppBar position="static">
          <Toolbar>
         
          <Tooltip title="Orders" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="inherit"
                  style={{ margin: 1 }}
                  onClick={() => {
                    setActive("Received");
                  }}
                >
                  <Dns />
                </IconButton>
              </Tooltip>
      
            <Tooltip title="Taken" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="inherit"
                  style={{ margin: 1 }}
                  onClick={() => {
                    setActive("Taken");
                  }}
                >
                  <DirectionsWalk />
                </IconButton>
              </Tooltip>
          
            <Tooltip title="Pick Ups" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="inherit"
                  style={{ margin: 1 }}
                  onClick={() => {
                    setActive("PickUps");
                  }}
                >
                  <LocalShipping />
                </IconButton>
              </Tooltip>
              <Tooltip title="Completed" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="inherit"
                  style={{ margin: 1 }}
                  onClick={() => {
                    setActive("Completed");
                  }}
                >
                  <DoneAll />
                </IconButton>
              </Tooltip>

              <Tooltip title="Products" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="inherit"
                  style={{ margin: 1 }}
                  onClick={() => {
                    setActive("Products");
                  }}
                >
                  <ListAlt />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="inherit"
                  style={{ margin: 1 }}
                  onClick={() => {
                    setActive("Add");
                  }}
                >
                  <AddCircle />
                </IconButton>
              </Tooltip>
          </Toolbar>
        </AppBar>

        {activeComp()}
      </Paper>
    </div>
  );
}

export default FarmerProfileDiv;
