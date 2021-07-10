import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db } from "../../Firebase";
import { AppBar, Toolbar, IconButton, Badge, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { fire } from "../../Firebase";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  Chat,
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
function CustomerNav(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    db.collection("UserData")
    .doc(firebase.auth().currentUser.uid).collection("cart").get().then(snap => {
      setData(snap.size);
      console.log(snap.size);
   });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div style={{ paddingBottom: 20 }}>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
            <div>
            <Tooltip title="Blog" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="inherit"
                  component={Link}
                  to={"customerblog"}
                  style={{ margin: 1 }}
                >
                  <LocalFlorist />
                </IconButton>

              </Tooltip>
              <Tooltip title="Feed" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="inherit"
                  component={Link}
                  to={"customerfeed"}
                  style={{ margin: 1 }}
                >
                  <DynamicFeed />
                </IconButton>
              </Tooltip>
              <Tooltip title="Market" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="inherit"
                  component={Link}
                  to={"customermarket"}
                  style={{ margin: 1 }}
                >
                  <Store />
                </IconButton>
              </Tooltip>

              <Tooltip title="Cart" placement="bottom-start">
                <IconButton
                  aria-label="cart"
                  edge="end"
                  color="inherit"
                  component={Link}
                  to={"customercart"}
                  style={{ margin: 1 }}
                >
                  <StyledBadge badgeContent={data} color="secondary">
                    <ShoppingCart />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Profile" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="inherit"
                  component={Link}
                  to={"customerprofile"}
                  style={{ margin: 1 }}
                >
                  <Person />
                </IconButton>
              </Tooltip>
              <Tooltip title='Chats' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  to={'chats'}
                  style={{ margin: 1 }}
                >
                  <Chat />
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
                    props.setUser(null);
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
  );
}

export default CustomerNav;
