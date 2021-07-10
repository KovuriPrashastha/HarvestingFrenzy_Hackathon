import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { db } from '../Firebase';
import firebase from 'firebase';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import otpGenerator from 'otp-generator';
import './../Snackbar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    maxWidth: 600,
    width: '90%',
    margin: 'auto',
    marginBottom: 10,
    marginTop: 10,
    border: 'solid',
    borderColor: 'purple',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 0',
  },
  cover: {
    width: 150,
  },
  controls: {
    display: 'flex',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
}));

export default function CartCard({ item, id }) {
  const [location, setLocation] = useState(false);
  const classes = useStyles();
  const [address, setAddress] = useState(null);
  let docId = '';
  let ta = item.totalAmount + 30;

  // const [paymentSig, setPaymentSig] = useState(false);
  let paymentSig = false;
  function myFunction() {
    console.log('snackbar funct');
    var x = document.getElementById('snackbar_green');
    x.className = 'show';
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }
  function remove() {
    db.collection('UserData')
      .doc(firebase.auth().currentUser.uid)
      .collection('cart')
      .doc(item.farmerId)
      .delete();
  }

  const onSuccess = (clocation) => {
    setLocation({
      coordinates: {
        lat: clocation.coords.latitude,
        lng: clocation.coords.longitude,
      },
    });

    console.log(location);
  };
  const onError = (error) => {
    setLocation({
      error,
    });
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  function SetLoc(props) {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'not supported',
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  useEffect(() => {
    db.collection('UserData')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        setAddress(doc.data().uDetails);
        console.log(doc.data().uDetails);
      });
  }, []);

  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_yxkwimn897hEpX',
      currency: 'INR',
      amount: ta * 100,
      order_id: id,
      name: 'HARVESTING FRENZY',
      description: 'Thank you for your purchase',
      image: null,
      handler: function (response) {
        console.log(response.razorpay_payment_id);
        // alert(response.razorpay_order_id)
        // alert(response.razorpay_signature)
        const paymentSig = response.razorpay_payment_id;
        console.log(paymentSig);
        if (paymentSig) {
          order();
        }
      },
      prefill: {
        name: 'Ashish',
        email: 'you@gmail.com',
        phone_number: '9866152321',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function order() {
    db.collection('Orders')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        cName: firebase.auth().currentUser.displayName,
        cId: firebase.auth().currentUser.uid,
        cEmail: firebase.auth().currentUser.email,
        products: item.products,
        totalAmount: item.totalAmount,
        fName: item.farmerName,
        fId: item.farmerId,
        status: 'Order Placed',
        awaitStatus: 'Completed',
        awaitNumber: 0,
        cAddress: address,
        cLocation: location,
        cOtp: otpGenerator.generate(6, {
          upperCase: false,
          specialChars: false,
          alphabets: false,
        }),
        paymentMethod: 'Paid',
        deliveryCharge: 30,
        collect: false,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
        docId = docRef.id;
      })
      .then(() => {
        Notification();
    myFunction();

      });
    remove();
  }

  function Cod() {
    db.collection('Orders')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        cName: firebase.auth().currentUser.displayName,
        cId: firebase.auth().currentUser.uid,
        cEmail: firebase.auth().currentUser.email,
        products: item.products,
        totalAmount: item.totalAmount,
        fName: item.farmerName,
        fId: item.farmerId,
        status: 'Order Placed',
        awaitStatus: 'Completed',
        awaitNumber: 0,
        cAddress: address,
        cLocation: location,
        cOtp: otpGenerator.generate(6, {
          upperCase: false,
          specialChars: false,
          alphabets: false,
        }),
        paymentMethod: 'Cash On Delivery',
        collect: true,
        deliveryCharge: 30,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
        docId = docRef.id;
      })
      .then(() => {
        Notification();
    // myFunction();

      });
    remove();
  }
  function incrementNotifCount() {
    db.collection('farmerData')
      .doc(item.farmerId)
      .update({
        ncount: firebase.firestore.FieldValue.increment(1),
      });
  }
  function Notification() {
    incrementNotifCount();
    db.collection('farmerData')
      .doc(item.farmerId)
      .collection('Notifications')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        orderId: docId,
        message: `New order received from ${
          firebase.auth().currentUser.displayName
        }`,
        read: false,
        type: 'New Order',
      });

    docId = '';
  }

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
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
                {item.products.map((row) => (
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

          <Typography variant='body2' color='textSecondary'>
            from {item.farmerName}
          </Typography>
        </CardContent>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {location ? (
          <center>
            <p style={{ fontSize: 10 }}>{location.coordinates.lat}</p>
            <p style={{ fontSize: 10 }}>{location.coordinates.lng}</p>
          </center>
        ) : (
          <Button style={{ float: 'right' }} onClick={SetLoc}>
            Add Geolocation
          </Button>
        )}
        {/* <Button
          style={{ float: 'right' }}
          onClick={() => {
            remove();
          }}
        >
          Remove
        </Button> */}
      </div>
      {location ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{ float: 'right' }}
            onClick={displayRazorpay}
            className='App-link'
            target='_blank'
          >
            Pay Online
          </Button>
          <Button style={{ float: 'right' }} onClick={Cod}>
            COD
          </Button>
          <div id='snackbar_green'>Order Placed Succesfully!!</div>
        </div>
      ) : null}
    </Card>
  );
}
