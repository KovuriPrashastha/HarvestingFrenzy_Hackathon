import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { db } from '../../Firebase';
import { AppBar, Toolbar, IconButton, Tooltip, Badge } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { fire } from '../../Firebase';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  AccountBalance,
  Chat,
  DynamicFeed,
  ExitToApp,
  Grain,
  LocalFlorist,
  Lock,
  Notifications,
  Person,
  ShoppingCart,
  Store,
  WbSunny,
} from '@material-ui/icons';
//import { ndata } from './FNotification';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#30b55b',
    },
    secondary: {
      main: '#f44336',
    },
  },
});
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);
function FarmerNav(props) {
  const [data, setData] = useState([]);
  const [readCount, setReadCount] = useState([]);
  const [ndata, setnData] = useState([]);
  useEffect(() => {
    db.collection('UserData')
      .doc(firebase.auth().currentUser.uid)
      .collection('cart')
      .get()
      .then((snap) => {
        setData(snap.size);
        console.log(snap.size);
      })
      .then(() => {
        db.collection('farmerData')
          .doc(firebase.auth().currentUser.uid)
          .onSnapshot((doc) => {
            setnData(doc.data().ncount);
          });
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ paddingBottom: 20 }}>
        <AppBar position='static' className="nav">
          <Toolbar style={{ display: 'flex' }}>
            {/* <div>
              <Typography>Harvesting Frenzy</Typography>
            </div> */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <Tooltip title='AI' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  to={'ai'}
                  // style={{ margin: 0.5 }}
                >
                  <Grain />
                </IconButton>
              </Tooltip>
              <Tooltip title='Blog' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  to={'farmerblog'}

                  // style={{ margin: 0.5 }}
                >
                  <LocalFlorist />
                </IconButton>
              </Tooltip>
              <Tooltip title='Feed' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  to={'farmerfeed'}

                  // style={{ margin: 0.5 }}
                >
                  <DynamicFeed />
                </IconButton>
              </Tooltip>
              <Tooltip title='Market' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  to={'farmermarket'}

                  // style={{ margin: 0.5 }}
                >
                  <Store />
                </IconButton>
              </Tooltip>
              <Tooltip title='Expenses' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  to={'farmerexpenses'}

                  // style={{ margin: 0.5 }}
                >
                  <AccountBalance />
                </IconButton>
              </Tooltip>
              <Tooltip title='Weather' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  to={'farmerweather'}

                  // style={{ margin: 0.5 }}
                >
                  <WbSunny />
                </IconButton>
              </Tooltip>
              <Tooltip title='Cart' placement='bottom-start'>
                <IconButton
                  color='inherit'
                  aria-label='cart'
                  edge='end'
                  component={Link}
                  to={'farmercart'}

                  // style={{ margin: 0.5 }}
                >
                  <StyledBadge badgeContent={data} color='secondary'>
                    <ShoppingCart />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
              <Tooltip title='Notifications' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  to={'notifications'}
                  // style={{ margin: 0.5 }}
                >
                  <StyledBadge badgeContent={ndata} color='secondary'>
                    <Notifications />
                  </StyledBadge>
                </IconButton>
              </Tooltip><Tooltip title='Chat' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  to={'chats'}

                  // style={{ margin: 0.5 }}
                >
                  <Chat />
                </IconButton>
              </Tooltip>
              <Tooltip title='Profile' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  to={'farmerprofile'}

                  // style={{ margin: 0.5 }}
                >
                  <Person />
                </IconButton>
              </Tooltip>
              <Tooltip title='Logout' placement='bottom-start'>
                <IconButton
                  edge='end'
                  color='inherit'
                  component={Link}
                  className='nav'
                  to={'/'}
                  // style={{ margin: 0.5 }}
                  onClick={() => {
                    fire.auth().signOut();
                    props.setFarmer(false);
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

export default FarmerNav;
