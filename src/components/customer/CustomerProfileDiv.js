import React from "react";
import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  AppBar,
  Button,
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import Booked from "./Booked";
import Completed from "./Completed";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: "auto",
    marginTop: 10,
    maxWidth: "98%",
  },
  large: {
    margin: "auto",
    marginTop: 10,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: "#3673ab7",
    },
  },
});

function CustomerProfileDiv(props) {
  const classes = useStyles();

  const [active, setActive] = useState("Booked");

  function activeComp() {
    if (active === "Booked") {
      return <Booked />;
    } else if (active === "Completed") {
      return <Completed />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper
        style={{ position: "relative" }}
        id="drawer-container"
        className={classes.paper}
        elevation={3}
      >
        <AppBar position="static">
          <Toolbar>
            <Button
              style={{ fontWeight: "bold" }}
              color="inherit"
              onClick={() => {
                setActive("Booked");
              }}
            >
              Booked
            </Button>

            <Button
              style={{ fontWeight: "bold" }}
              color="inherit"
              onClick={() => {
                setActive("Completed");
              }}
            >
              Completed
            </Button>
          </Toolbar>
        </AppBar>
        {activeComp()}
      </Paper>
    </ThemeProvider>
  );
}

export default CustomerProfileDiv;
