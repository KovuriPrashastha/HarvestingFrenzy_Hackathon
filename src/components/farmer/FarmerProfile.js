import React from 'react';
import FarmerNav from './FarmerNav';
import FarmerProfileDiv from './FarmerProfileDiv';
import {
  Avatar,
  createMuiTheme,
  makeStyles,
  Paper,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import firebase from 'firebase';
import FDetails from './FDetails';
const useStyles = makeStyles((theme) => ({
  large: {
    margin: 'auto',
    marginTop: 10,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#30b55b',
    },
    secondary: {
      main: '#30b55b',
    },
  },
});
function FarmerProfile({setFarmer}) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <FarmerNav setFarmer={setFarmer} />
      <Paper style={{margin:5,paddingTop:5

      }}>
      <FDetails/>
      <FarmerProfileDiv />
      </Paper>
    </ThemeProvider>
  );
}

export default FarmerProfile;
