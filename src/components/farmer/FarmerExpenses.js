import React, { useEffect, useState } from "react";
import FarmerNav from "./FarmerNav";
import { Button, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { db } from "../../Firebase";
import { StarRate } from "@material-ui/icons";
let count = 0;

function FarmerExpenses({ farmer, setFarmer }) {
  const [f1, setF1] = useState(Number(0));
  const [f2, setF2] = useState(Number(0));
  const [f3, setF3] = useState(Number(0));
  const [f4, setF4] = useState(Number(0));
  const [f5, setF5] = useState(Number(0));
  const [f6, setF6] = useState(Number(0));
  const [f7, setF7] = useState(Number(0));
  const [f8, setF8] = useState(Number(0));
  const [f9, setF9] = useState(Number(0));
  const [f10, setF10] = useState(Number(0));
  const [f11, setF11] = useState(Number(0));
  const [f12, setF12] = useState(Number(0));
  const [f13, setF13] = useState(Number(0));
  const [f14, setF14] = useState(Number(0));
  const [f15, setF15] = useState(Number(0));
  const [f16, setF16] = useState(Number(0));
  const [count, setCount] = useState(Number(0));
  const [bank, setBank] = useState([])

  useEffect(() => {
    db.collection("Bank").onSnapshot((snapshot) => {
      setBank(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

  }, []);

  function Add() {
    setCount(
      Number(
        f1 +
          f2 +
          f3 +
          f4 +
          f5 +
          f6 +
          f7 +
          f8 +
          f9 +
          f10 +
          f11 +
          f12 +
          f13 +
          f14 +
          f15 +
          f16
      )
    );
  }

  return (
    <div>
      <FarmerNav setFarmer={setFarmer} farmer={farmer} />
      <center style={{ textAlign: "center" }}>
        <Typography>ENTER PER ACRE DATA</Typography>

        <Grid container justify="center" style={{ padding: 10 }} spacing={1}>
          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f3}
              type="number"
              label="Cost Of Seed"
              variant="outlined"
              onChange={(event) => {
                setF3(Number(event.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f4}
              type="number"
              label="Seed Treatment"
              variant="outlined"
              onChange={(event) => {
                setF4(Number(event.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f5}
              type="number"
              label="Ploguh"
              variant="outlined"
              onChange={(event) => {
                setF5(Number(event.target.value));
              }}
            />
          </Grid>

          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f7}
              type="number"
              label="Labour Cost"
              variant="outlined"
              onChange={(event) => {
                setF7(Number(event.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f8}
              type="number"
              label="Miscellaneous"
              variant="outlined"
              onChange={(event) => {
                setF8(Number(event.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f9}
              type="number"
              label="Rental Cost"
              variant="outlined"
              onChange={(event) => {
                setF9(Number(event.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f10}
              type="number"
              label="Fertilizers and Pesticides"
              variant="outlined"
              onChange={(event) => {
                setF10(Number(event.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f11}
              type="number"
              label="Cost Of Harvesting"
              variant="outlined"
              onChange={(event) => {
                setF11(Number(event.target.value));
              }}
            />
          </Grid>

          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f13}
              type="number"
              label="Stake Cost"
              variant="outlined"
              onChange={(event) => {
                setF13(Number(event.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f14}
              type="number"
              label="Support Cost"
              variant="outlined"
              onChange={(event) => {
                setF14(Number(event.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f15}
              type="number"
              label="Irrigation"
              variant="outlined"
              onChange={(event) => {
                setF15(Number(event.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6} lg={3} sm={4} md={3}>
            <TextField
              value={f16}
              type="number"
              label="Plant Protection"
              variant="outlined"
              onChange={(event) => {
                setF16(Number(event.target.value));
              }}
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Button
            color="inherit"
            onClick={() => {
              Add();
            }}
          >
            CALCULATE EXPENSES
          </Button>
        </Grid>
      </center>

      <Paper
        style={{
          margin: "auto",
          width: 300,
          marginTop: 20,
          textAlign: "center",
          height: 100,
        }}
      >
        <Typography>Your Total Expenses {count} </Typography>
      </Paper>
      <br/>
      <center>
      <Typography component="h3">
        Bank Loan Information
      </Typography>
      </center>
     <div style={{padding:20}}>
      <Grid container spacing={2}>
          {bank.map(({ id, data}) => {
            return (
              <Grid key={id} item xs={6} lg={2} sm={4} md={3}>
              <Card style={{width : 200,padding:20}}>
                  <TableContainer component={Paper} style={{marginBottom:10}}>
      <Table style={{}} aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell>Bank</TableCell>

            <TableCell align="left"> <a href={data.site}>{data.bName}</a></TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
          <TableCell>Interest</TableCell>

            <TableCell align="left">{data.int} %</TableCell>
          </TableRow>
        </TableHead>
        </Table>
        </TableContainer>
              
              <List>
                    {data.loanTypes.map((i)=>{
                      return <ListItem>
                      <ListItemIcon>
                        <StarRate />
                      </ListItemIcon>
                      <ListItemText
                        primary = {i}/>
                    </ListItem>
                    })}
               </List>
              </Card>
              </Grid>
            );
          })}
        </Grid>
        </div>
    </div>
  );
}

export default FarmerExpenses;
