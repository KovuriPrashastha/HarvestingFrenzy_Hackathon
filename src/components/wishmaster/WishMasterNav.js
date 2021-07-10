import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db } from "../../Firebase";
import { AppBar, Toolbar, IconButton, Badge, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { fire } from "../../Firebase";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  DynamicFeed,
  ExitToApp,
  LocalFlorist,
  Person,
  ShoppingCart,
  Store,
} from "@material-ui/icons";

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

function WishMasterNav(props) {
    return (
        <ThemeProvider theme={theme}>
          <div style={{ paddingBottom: 20 }}>
            <AppBar position="static">
              <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
                <div>
                  <Tooltip title="Orders" placement="bottom-start">
                    <IconButton
                      edge="end"
                      color="inherit"
                      component={Link}
                      to={"allorders"}
                      style={{ margin: 1 }}
                    >
                      <DynamicFeed />
                    </IconButton>
                  </Tooltip>
    
                  <Tooltip title="Profile" placement="bottom-start">
                    <IconButton
                      edge="end"
                      color="inherit"
                      component={Link}
                      to={"wishmasterprofile"}
                      style={{ margin: 1 }}
                    >
                      <Person />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Logout" placement="bottom-start">
                    <IconButton
                      edge="end"
                      color="inherit"
                      component={Link}
                      to={"/"}
                      style={{ margin: 1 }}
                      onClick={() => {
                        fire.auth().signOut();
                        props.setWishMaster(null);
                      }}
                    >
                      <ExitToApp />
                    </IconButton>
                  </Tooltip>
                </div>
              </Toolbar>
            </AppBar>
          </div>
        </ThemeProvider>
    )
}

export default WishMasterNav
