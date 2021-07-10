import { Avatar, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CustomerNav from "./CustomerNav";
import firebase from "firebase";

import CustomerProfileDiv from "./CustomerProfileDiv";
import CDetails from "./CDetails";

const useStyles = makeStyles((theme) => ({
  large: {
    margin: "auto",
    marginTop: 10,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

function CustomerProfile({ user, setUser }) {
  const classes = useStyles();

  return (
    <div>
      <CustomerNav setUser={setUser} />
      <CDetails/>
    
      <CustomerProfileDiv />
    </div>
  );
}

export default CustomerProfile;
