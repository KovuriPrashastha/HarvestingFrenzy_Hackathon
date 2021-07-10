import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardActions,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Table,
  Paper,
  TextField,
  Link,
} from '@material-ui/core';
import {
  ExpandMore,
  ExpandLess,
  CheckCircle,
  LocalShipping,
  DirectionsWalk,
} from '@material-ui/icons';
import { db } from '../../Firebase';
import firebase from 'firebase';
import otpGenerator from 'otp-generator';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: "column",
    maxWidth: 600,
    margin: 'auto',
    marginBottom: 10,
    width: '95%',
    border: "solid"
  },
});

function FarmerRCard({ prod, id }) {
  const classes = useStyles();
  const [openAddress, setOpenAddress] = useState(false);
  const [location, setLocation] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [custOtp, setCustOtp] = useState('');
  const [wOtp, setWOtp] = useState('');
  // let url = '';
  let url = `https://www.google.com/maps/search/?api=1&query=${prod.cLocation.coordinates.lat},${prod.cLocation.coordinates.lng}`;
  useEffect(() => {
    db.collection('farmerData')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        setAddress(doc.data().address);
        setCity(doc.data().city);
        setPhone(doc.data().phone);
      });
  }, []);
  function AcceptPickUp() {
    db.collection('Orders')
      .doc(`${id}`)
      .update({
        fpickUp: location,
        faddress: address,
        fcity: city.toLocaleLowerCase(),
        status: 'Ready for transit',
        fotp: otpGenerator.generate(4, {
          upperCase: false,
          specialChars: false,
          alphabets: false,
        }),
        awaitNumber: 1,
        fphone: phone,
      });
  }
  const onSuccess = (flocation) => {
    setLocation({
      coordinates: {
        lat: flocation.coords.latitude,
        lng: flocation.coords.longitude,
      },
    });

    console.log(location);
  };
  const onError = (error) => {
    setLocation({
      error,
    });
  };

  function Completed() {
    if (custOtp == prod.cOtp) {
      db.collection('Orders').doc(`${id}`).update({
        status: 'Completed',
      });
    }
  }
  function VerifyPayment() {
    if (custOtp == prod.cOtp) {
      if(prod.paymentMethod == "Cash On Delivery") {
        console.log("COD")
      } else {
      db.collection('farmerData')
        .doc(firebase.auth().currentUser.uid)
        .update({
          wallet: firebase.firestore.FieldValue.increment(
            prod.totalAmount + prod.deliveryCharge
          ),
        });}
    } else if (wOtp == prod.wotp) {
      db.collection('farmerData')
        .doc(firebase.auth().currentUser.uid)
        .update({
          wallet: firebase.firestore.FieldValue.increment(prod.totalAmount),
        });
        db.collection('Orders').doc(`${id}`).update({
          status: 'In Transit',
        });
    }
  }

  function Verified() {
    if (wOtp == prod.wOtp) {
      db.collection('Orders').doc(`${id}`).update({
        status: 'Wish Master has picked up the order',
      });
    }
  }

  function PickUp(props) {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'not supported',
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  function TakeOrder() {
    db.collection('Orders').doc(`${id}`).update({
      status: 'Order taken up by Farmer',
      fphone: phone,
    });
  }
  function Decide() {
    if (prod.status === 'Order Placed') {
      return (
        <CardActions
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          {location ? (
            <Button
              startIcon={<LocalShipping />}
              onClick={() => AcceptPickUp()}
            >
              Accept{' '}
            </Button>
          ) : (
            <Button startIcon={<LocalShipping />} onClick={() => PickUp()}>
              Pick Up
            </Button>
          )}
          <Button startIcon={<DirectionsWalk />} onClick={() => TakeOrder()}>
            Take
          </Button>
        </CardActions>
      );
    } else if (prod.status === 'Order taken up by Farmer') {
      return (
        <CardActions
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <TextField
            id='outlined-basic'
            label='Customer Otp'
            required
            type='text'
            value={custOtp}
            onChange={(e) => setCustOtp(e.target.value)}
          />

          <Button
            startIcon={<CheckCircle />}
            onClick={() => {
              Completed();
              VerifyPayment();
            }}
          >
            Delivered
          </Button>
        </CardActions>
      );
    } else if (
      prod.status == 'Ready for transit' ||
      prod.status == 'Accepted by Wish Master'
    ) {
      return (
        <CardActions
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <TextField
            id='outlined-basic'
            label='Deliver Otp'
            required
            type='text'
            value={wOtp}
            onChange={(e) => setWOtp(e.target.value)}
          />

          <Button
            startIcon={<CheckCircle />}
            onClick={() => {
              Verified();
              VerifyPayment();
            }}
          >
            Verified
          </Button>
        </CardActions>
      );
    }
  }

  return (
    <Card className={classes.root}>
        <CardContent>
          <TableContainer component={Paper} style={{ marginBottom: 10 }}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>

                  <TableCell align='left'>{prod.cName}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Customer phone </TableCell>
                  <TableCell align='left'>{prod.cAddress.phoneNo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Customer Address </TableCell>
                  <TableCell align='left'>
                    <Typography variant='caption'>
                      <Link href={url}>{prod.cAddress.address}</Link>
                    </Typography>
                    <br />

                    <Typography variant='caption'>
                      {prod.cAddress.city}
                    </Typography>
                    <br />

                    <Typography variant='caption'>
                      {prod.cAddress.pin}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} style={{ marginBottom: 10 }}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align='left'>Quantity</TableCell>
                  <TableCell align='left'>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prod.products.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component='th' scope='row'>
                      {row.product}
                    </TableCell>
                    <TableCell align='left'>
                      {row.quantity} {row.unit}
                    </TableCell>
                    <TableCell align='left'>{row.price} /-</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper} style={{ marginBottom: 10 }}>
            <Table className={classes.table} aria-label='simple table'>
            <TableBody>
              <TableRow>
                  <TableCell>Your OTP</TableCell>
                  <TableCell align='left'>{prod.fotp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>

                  <TableCell align='left'>{prod.status}</TableCell>
                </TableRow>
              
                <TableRow>
                  <TableCell>Total Amount</TableCell>
                  <TableCell align='left'> {prod.totalAmount} /-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payment Method</TableCell>
                  <TableCell align='left'> {prod.paymentMethod}</TableCell>
                </TableRow>
                {prod.collect ? (
                  <TableRow>
                    <TableCell>Collect</TableCell>
                    <TableCell align='left'> {prod.totalAmount} /-</TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        {Decide()}
    </Card>
  );
}

export default FarmerRCard;
