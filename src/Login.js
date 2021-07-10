import React from "react";
import "./Login.css";
import {useState} from "react"
import {
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Switch,
  SnackbarContent,
  Typography,
} from "@material-ui/core";
import hf from "./images/hf.png"

function Login({
  city,
  setCity,
  pin,
  setPin,
  signInPasswordError,
  signInEmailError,
  signInEmail,
  setSignInPassword,
  SignInPassword,
  setSignInEmail,
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleSignup,
  emailError,
  passwordError,
  userNull,
  setFarmerSignUp,
  farmerSignUp,
  setBox,
  box,
  address,
  setAddress,
  pickUp,
  setPickUp,
  phone,
  setPhone,
  aadhar,
  setAadhar,
}) {
  function handleToggle() {
    if (farmerSignUp) {
      setFarmerSignUp(false);
      console.log("not farmer", farmerSignUp);
    } else {
      setFarmerSignUp(true);
      console.log("farmer", farmerSignUp);
    }
  }
  function handleWishMaster() {
    if (pickUp) {
      setPickUp(false);
      console.log("not farmer not user");
    } else {
      setPickUp(true);
      console.log("wishmaster");
    }
  }
  function Box(){
    if(box){
      setBox(false)
    }
    else {
      setBox(true)
    }
  }


          {if(box == false) {
  return (
    
    <div
      style={{
          paddingTop: 100,
        height: "80vh",
      }}
    ><center>
    <img src={hf} width="150">
  </img>
  </center>
      <center>
        <h5 className="form__heading">Sign In</h5>
        <TextField
          id="outlined-basic"
          label="Email"
          required
          type="text"
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
        />
        <p className="error_"> {signInEmailError} </p>
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          required
          value={SignInPassword}
          onChange={(e) => setSignInPassword(e.target.value)}
        />
        <p className="error_"> {signInPasswordError} </p>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Sign In
        </Button>
        <p style={{fontSize: 14}}>If you don't have an account already <strong onClick={Box}> Sign Up </strong></p>
       
      </center>
    </div>
  );

}
else {
  return (
    <div style={{
      paddingTop: 100,
      height: "80vh",
    textAlign: "center"
    
    }}><center>
    <img src={hf} width="150">
  </img>
  </center>
      <h5 className="form__heading">Sign Up</h5>
        <TextField
          id="outlined-basic"
          label="Your Name"
          required
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        {userNull ? (
          <p className="error_">
            <SnackbarContent message="Enter A User Name" />
          </p>
        ) : null}
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          required
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="error_"> {emailError} </p>
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error_"> {passwordError} </p>
{farmerSignUp || pickUp ? (
  <div>
    {farmerSignUp ? ( <Typography variant="h6">
     Add Pick Up Information
    </Typography>):(<Typography variant="h6">
     Basic Information
    </Typography>)}
   
    <br/>
   <TextField
          id="outlined-basic"
          label="City"
          required
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
    <br/>

           <TextField
          id="outlined-basic"
          label="Pin"
          required
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
    <br/>
    <TextField
          id="outlined-basic"
          label="Phone No."
          required
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br/>
        
        <TextField
          id="outlined-basic"
          label="Address"
          required
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
<br/>
   
<TextField
          id="outlined-basic"
          label="Address"
          required
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
        />
  </div>
) : (null)}

        <FormControlLabel
          control={<Switch style={{textAlign:"left"}} color="primary" onChange={handleToggle} disabled={pickUp} />}
          label="Farmer"
        /><br/>
         <FormControlLabel
          control={<Switch style={{textAlign:"left"}} color="primary" onChange={handleWishMaster} disabled={farmerSignUp} />}
          label="WishMaster"
        /><br/>
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Sign Up
        </Button>
        <p style={{fontSize: 14}}>Already have an Account ?<strong onClick={Box}> Sign In </strong></p>

    </div>
  )
}

}
  
}

export default Login;
