import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardActions,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Modal,
  Fade,
  Backdrop,
  TextareaAutosize,
  IconButton,
} from '@material-ui/core';
import { ExpandMore, ExpandLess, Star, Publish } from '@material-ui/icons';
import ReactStars from 'react-rating-stars-component';
import { db } from '../../Firebase';
import firebase from 'firebase';
import { Rating } from '@material-ui/lab';
import './../../Snackbar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 'auto',
    padding: 10,
    marginBottom: 5,
    maxWidth: 600,
    border: 'solid',
    width: '90%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function CustomerPCard({ prod, id }) {
  const [content, setContent] = useState('');
  const [openR, setOpenR] = useState(false);

  const [stars, setStars] = useState(0);
  let docId = '';
  const [openCA, setOpenCA] = useState(false);
  function handleOpenCA(params) {
    if (openCA) {
      setOpenCA(false);
    } else {
      setOpenCA(true);
    }
  }

  const [open, setOpen] = React.useState(false);
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setStars(newRating);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenR = () => {
    setOpenR(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseR = () => {
    setOpenR(false);
  };
  function myFunction() {
    var x = document.getElementById('snackbar_red');
    x.className = 'show';
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }
  const handleReport = () => {
    myFunction();
    db.collection('Report').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      cName: firebase.auth().currentUser.displayName,
      cId: firebase.auth().currentUser.uid,
      orderId: id,
      fId: prod.fId,
      fName: prod.fName,
      content: content,
    });
  };
  const handleReportOpen = () => {
    

  };
  function Decide() {
    if (prod.status === 'Completed') {
      return (
        <div>
          <Button onClick={handleOpen}>Rate</Button>
          <Button onClick={handleOpenR}>Report</Button>
          <div id='snackbar_red'>Reported the Farmer</div>
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Paper style={{ padding: 10, width: '95%', maxWidth: 600 }}>
                <div>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor='#ffd700'
                  />
                  <TextareaAutosize
                    aria-label='minimum height'
                    rowsMin={5}
                    placeholder='Your insight'
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ width: '95%', marginBottom: 10 }}
                  />

                  <Button
                    startIcon={<Publish />}
                    onClick={handleUpload}
                    variant='outlined'
                  >
                    Submit
                  </Button>
                </div>
              </Paper>
            </Fade>
          </Modal>

          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={openR}
            onClose={handleCloseR}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openR}>
              <Paper style={{ padding: 10, width: '95%', maxWidth: 600 }}>
                <div>
               
                  <TextareaAutosize
                    aria-label='minimum height'
                    rowsMin={5}
                    placeholder='Mention your issue'
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ width: '95%', marginBottom: 10 }}
                  />

                  <Button
                    startIcon={<Publish />}
                    onClick={handleReport}
                    variant='outlined'
                  >
                    Report
                  </Button>
                </div>
              </Paper>
            </Fade>
          </Modal>
        </div>
      );
    } else {
      return null;
    }
  }
  function Notification() {
    db.collection('farmerData')
      .doc(prod.fId)
      .collection('Notifications')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        orderId: docId,
        message: `You have received a review from ${
          firebase.auth().currentUser.displayName
        }`,
        read: false,
        type: 'Review',
      });
    docId = '';
  }
  function handleUpload() {
    db.collection('farmerData')
      .doc(prod.fId)
      .collection('rating')
      .add({
        cName: firebase.auth().currentUser.displayName,
        cId: firebase.auth().currentUser.uid,
        content: content,
        stars: stars,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
        docId = docRef.id;
      })
      .then(() => {
        Notification();
      });

    handleClose();
  }
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography variant='overline'>{id}</Typography>

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
          <TableHead>
            <TableRow>
              <TableCell>Your OTP</TableCell>

              <TableCell align='left'>{prod.cOtp}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>

              <TableCell align='left'>{prod.status}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Total Amount</TableCell>
              <TableCell align='left'> {prod.totalAmount} + 30 /-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Payment Method</TableCell>
              <TableCell align='left'> {prod.paymentMethod}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {Decide()}
      {openCA ? (
        <div>
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
                      {prod.cAddress.address}
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

          <IconButton
            edge='end'
            color='inherit'
            onClick={handleOpenCA}

            // style={{ margin: 0.5 }}
          >
            <ExpandLess />
          </IconButton>
        </div>
      ) : (
        <div>
          <IconButton
            edge='end'
            color='inherit'
            onClick={handleOpenCA}

            // style={{ margin: 0.5 }}
          >
            <ExpandMore />
          </IconButton>
        </div>
      )}
    </Card>
  );
}

export default CustomerPCard;
