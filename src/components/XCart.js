import React, { useEffect, useLayoutEffect, useState } from 'react';
import { db } from '../Firebase';
import firebase from 'firebase';
import {
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { v1 as uuidv1 } from 'uuid';
import otpGenerator from 'otp-generator';
import './../Snackbar.css';

function XCart() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState('');
  const [address, setAddress] = useState(null);
  //   const [doc, setDoc] = useState("")
  var uiid = uuidv1();
  const [location, setLocation] = useState(false);

  let doc = uiid;

  function Remove({ fId }) {
    console.log(fId);
    db.collection('UserData')
      .doc(firebase.auth().currentUser.uid)
      .update({
        xproducts: firebase.firestore.FieldValue.arrayRemove({ fId: fId }),
      });
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
      .get()
      .then((doc) => {
        setData(doc.data().xproducts);
      });
  }, []);
  useEffect(() => {
    db.collection('UserData')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        setAddress(doc.data().uDetails);
        console.log(doc.data().uDetails);
      });
  }, []);

  useLayoutEffect(() => {
    db.collection('UserData')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        setTotal(doc.data().XcartTotal);
        console.log(doc.data().XcartTotal);
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
      amount: total * 100,
      order_id: { doc },
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
          Order();
        }
      },
      prefill: {
        name: '',
        email: '',
        phone_number: '',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function myFunction() {
    console.log('snackbar funct');
    var x = document.getElementById('snackbar_green');
    x.className = 'show';
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }
  function Order() {
    myFunction();
    for (let index = 0; index < data.length; index++) {
      const element = data[index].product;
      console.log(element);
      if (index == 0) {
        db.collection('XOrders')
          .doc(doc)
          .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            cName: firebase.auth().currentUser.displayName,
            cId: firebase.auth().currentUser.uid,
            cEmail: firebase.auth().currentUser.email,
            products: firebase.firestore.FieldValue.arrayUnion(data[index]),
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
            deliveryCharge: 100,
            collect: false,
          });
      } else {
        db.collection('XOrders')
          .doc(doc)
          .update({
            products: firebase.firestore.FieldValue.arrayUnion(data[index]),
          });
      }
    }
  }

  function Cod() {
    myFunction();
    for (let index = 0; index < data.length; index++) {
      const element = data[index].product;
      console.log(element);
      if (index == 0) {
        db.collection('XOrders')
          .doc(doc)
          .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            cName: firebase.auth().currentUser.displayName,
            cId: firebase.auth().currentUser.uid,
            cEmail: firebase.auth().currentUser.email,
            products: firebase.firestore.FieldValue.arrayUnion(data[index]),
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
            paymentMethod: 'COD',
            deliveryCharge: 100,
            collect: true,
          });
      } else {
        db.collection('XOrders')
          .doc(doc)
          .update({
            products: firebase.firestore.FieldValue.arrayUnion(data[index]),
          });
      }
    }
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: 'auto',
        marginBottom: 10,
        marginTop: 10,
        width: '90%',
        padding: 10,
      }}
    >
      <TableContainer component={Paper} style={{ marginBottom: 10 }}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align='left'>Quantity</TableCell>
              <TableCell align='left'>Price</TableCell>
              <TableCell align='left'>NA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((doc) => {
              return (
                <TableRow>
                  <TableCell component='th' scope='row'>
                    {doc.product}
                  </TableCell>
                  <TableCell align='left'>
                    {doc.quantity} {doc.unit}
                  </TableCell>
                  <TableCell align='left'>{doc.price} /-</TableCell>
                  <TableCell align='left'>
                    <Button
                      onClick={() => {
                        db.collection('UserData')
                          .doc(firebase.auth().currentUser.uid)
                          .update({
                            xproducts: firebase.firestore.FieldValue.arrayRemove(
                              {
                                fId: doc.fId,
                                fName: doc.fName,
                                price: doc.price,
                                product: doc.product,
                                quantity: doc.quantity,
                                unit: doc.unit,
                              }
                            ),
                          });
                        db.collection('UserData')
                          .doc(firebase.auth().currentUser.uid)
                          .get()
                          .then((doc) => {
                            setData(doc.data().xproducts);
                          });
                        db.collection('UserData')
                          .doc(firebase.auth().currentUser.uid)
                          .update({
                            XcartTotal: firebase.firestore.FieldValue.increment(
                              -doc.price
                            ),
                          });
                        db.collection('UserData')
                          .doc(firebase.auth().currentUser.uid)
                          .get()
                          .then((doc) => {
                            setTotal(doc.data().XcartTotal);
                            console.log(doc.data().XcartTotal);
                          });
                      }}
                    >
                      {' '}
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} style={{ marginBottom: 10 }}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Total Amount</TableCell>
              <TableCell align='left'>{total} /-</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
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

      <Button
        style={{ float: 'right' }}
        onClick={displayRazorpay}
        className='App-link'
        target='_blank'
      >
        Order / Pay Online
      </Button>
      <Button
        style={{ float: 'right' }}
        onClick={() => {
          Cod();
          myFunction();
        }}
      >
        Order / COD
      </Button>
      <div id='snackbar_green'>Reported the Farmer</div>
    </div>
  );
}

export default XCart;
