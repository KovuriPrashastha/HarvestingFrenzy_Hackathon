import React, { useState, useEffect } from 'react';
import Login from './Login';
import { db, fire } from './Firebase';
import { Redirect, BrowserRouter, Switch, Route } from 'react-router-dom';
import FarmerProfile from './components/farmer/FarmerProfile';
import firebase from 'firebase';
import FarmerMarket from './components/farmer/FarmerMarket';
import FarmerCart from './components/farmer/FarmerCart';
import CustomerMarket from './components/customer/CustomerMarket';
import CustomerCart from './components/customer/CustomerCart';
import Weather from './components/farmer/Weather';
import CustomerFeed from './components/customer/CustomerFeed';
import FarmerFeed from './components/farmer/FarmerFeed';
import FarmerExpenses from './components/farmer/FarmerExpenses';
import CustomerProfile from './components/customer/CustomerProfile';
import CustomerBlog from './components/customer/CustomerBlog';
import FarmerBlog from './components/farmer/FarmerBlog';
import AllOrder from './components/wishmaster/AllOrder';
import WishMasterProfile from './components/wishmaster/WishMasterProfile';
import Ai from './components/farmer/Ai';
import FNotification from './components/farmer/FNotification';
import CChats from './components/customer/CChats';
import FChats from './components/farmer/FChats';
import Admin from "./components/admin/Admin"


function AuthRoute() {
  const [user, setUser] = useState(null);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [signInEmailError, setSignInEmailError] = useState('');
  const [signInPasswordError, setSignInPasswordError] = useState('');
  const [signUpButton, setSignUpButton] = useState(true);
  const [farmer, setFarmer] = useState(null);
  const [farmerSignUp, setFarmerSignUp] = useState(false);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [box, setBox] = useState(false);
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [address, setAddress] = useState('');
  const [pickUp, setPickUp] = useState(false);
  const [wishMaster, setWishMaster] = useState(false);
  const [wishMasterCity, setWishMasterCity] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState("")
  const [admin, setAdmin] = useState("")

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(signInEmail, signInPassword)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setSignInEmailError(err.message);
            break;
          default:
          case 'auth/wrong-password':
            setSignInPasswordError(err.message);
            break;
        }
      })
      .then(() => {
        authListener();
      });
  };

  const handleSignup = () => {
    clearInputs();
    clearErrors();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
        return authUser.user.updateProfile({
          displayName: userName,
        });
      })
      .then((authUser) => {
        db.collection('UserData').doc(firebase.auth().currentUser.uid).set({
          uid: firebase.auth().currentUser.uid,
          name: userName,
        });
      })
      .then((authUser) => {
        if (farmerSignUp) {
          db.collection('farmerData').doc(firebase.auth().currentUser.uid).set({
            userId: firebase.auth().currentUser.uid,
            role: 'Farmer',
            city: city,
            pin: pin,
            address: address,
            phone: phone,
            wallet: 0,
            aadhar:aadhar,
          
          });
        }
        if (pickUp) {
          db.collection('wishMasterData')
            .doc(firebase.auth().currentUser.uid)
            .set({
              userId: firebase.auth().currentUser.uid,
              role: 'WishMaster',
              city: city,
              pin: pin,
              phone: phone,
              wallet: 0,
              cashSubmit: 0,
            });
        } else {
          console.log('Signing Up As User');
        }
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          default:
          case 'auth/weak-password':
            setPasswordError(err.message);
        }
      })
      .then(() => {
        setTimeout(function() {
        authListener();
          
        }, 4000);
      });
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        const usersRef = db.collection('farmerData').doc(authUser.uid);
        usersRef.get().then((docSnapshot) => {
          console.log('hellllllllllllll', docSnapshot.data());
          if (docSnapshot.exists) {
            console.log('doc exists');
            console.log('farmer');
            console.log(docSnapshot);
            setFarmer(authUser);
            setFarmerSignUp(false);
            setUser(false);
          } else {
            const wishMasterRef = db
              .collection('wishMasterData')
              .doc(authUser.uid);

            wishMasterRef.get().then((docSnapshot) => {
              if (docSnapshot.exists) {
                console.log('doc exists');
                console.log('WishMaster');
                console.log(docSnapshot);
                setWishMaster(authUser);
                setFarmerSignUp(false);
                setUser(false);
              } else {
                const adminRef = db
                .collection("adminData")
                .doc(authUser.uid);
                adminRef.get().then((docSnapshot) => {
                  if (docSnapshot.exists) {
                    console.log('doc exists');
                    console.log('admin');
                    setAdmin(authUser)
                   
                  }  else {
                    setUser(authUser);
                  }
                })

                
              }
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  function renderFarmer_renderCustomer() {
    if (farmer) {
      return (
        <BrowserRouter>
          <Switch>
            <React.StrictMode>
              <Route
                exact
                path='/farmerprofile'
                render={() => {
                  return (
                    <FarmerProfile setFarmer={setFarmer} farmer={farmer} />
                  );
                }}
              />
              <Route
                exact
                path='/farmermarket'
                render={() => {
                  return (
                    <FarmerMarket
                      count={count}
                      setCount={setCount}
                      cart={cart}
                      setCart={setCart}
                      setFarmer={setFarmer}
                      farmer={farmer}
                    />
                  );
                }}
              />{' '}
              <Route
                exact
                path='/farmercart'
                render={() => {
                  return (
                    <FarmerCart
                      count={count}
                      setCount={setCount}
                      cart={cart}
                      setCart={setCart}
                      setFarmer={setFarmer}
                      farmer={farmer}
                    />
                  );
                }}
              />
              <Route
                exact
                path='/ai'
                render={() => {
                  return <Ai setFarmer={setFarmer} farmer={farmer} />;
                }}
              />
              <Route
                exact
                path='/notifications'
                render={() => {
                  return (
                    <FNotification setFarmer={setFarmer} farmer={farmer} />
                  );
                }}
              />
              <Route
                exact
                path='/farmerweather'
                render={() => {
                  return <Weather setFarmer={setFarmer} farmer={farmer} />;
                }}
              />
              <Route
                exact
                path='/farmerblog'
                render={() => {
                  return <FarmerBlog setFarmer={setFarmer} farmer={farmer} />;
                }}
              />
              <Route
                exact
                path='/farmerfeed'
                render={() => {
                  return <FarmerFeed setFarmer={setFarmer} farmer={farmer} />;
                }}
              />
              <Route
                exact
                path='/farmerexpenses'
                render={() => {
                  return (
                    <FarmerExpenses setFarmer={setFarmer} farmer={farmer} />
                  );
                }}
              />
  <Route
                exact
                path='/chats'
                render={() => {
                  return (
                    <FChats setFarmer={setFarmer} farmer={farmer} />
                  );
                }}
              />
              <Redirect to='/farmerprofile' />
            </React.StrictMode>
          </Switch>
        </BrowserRouter>
      );
    }
    if (user && !farmerSignUp) {
      return (
        <BrowserRouter>
          <Switch>
            <React.StrictMode>
              <Route
                exact
                path='/customermarket'
                render={() => {
                  return (
                    <CustomerMarket
                      count={count}
                      setCount={setCount}
                      cart={cart}
                      setCart={setCart}
                      setUser={setUser}
                      user={user}
                    />
                  );
                }}
              />
              <Route
                exact
                path='/customerblog'
                render={() => {
                  return (
                    <CustomerBlog
                      count={count}
                      setCount={setCount}
                      cart={cart}
                      setCart={setCart}
                      setUser={setUser}
                      user={user}
                    />
                  );
                }}
              />
              <Route
                exact
                path='/customercart'
                render={() => {
                  return (
                    <CustomerCart
                      count={count}
                      setCount={setCount}
                      cart={cart}
                      setCart={setCart}
                      setUser={setUser}
                      user={user}
                    />
                  );
                }}
              />
              <Route
                exact
                path='/customerprofile'
                render={() => {
                  return <CustomerProfile setUser={setUser} user={user} />;
                }}
              />
              <Route
                exact
                path='/customerfeed'
                render={() => {
                  return <CustomerFeed setUser={setUser} user={user} />;
                }}
              />
                <Route
                exact
                path='/chats'
                render={() => {
                  return <CChats setUser={setUser} user={user} />;
                }}
              />
              <Redirect to='/customermarket' />
            </React.StrictMode>
          </Switch>
        </BrowserRouter>
      );
    }

    if (wishMaster) {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              <React.StrictMode>
                <Route
                  exact
                  path='/allorders'
                  render={() => {
                    return (
                      <AllOrder
                        setWishMaster={setWishMaster}
                        wishMaster={wishMaster}
                        wishMasterCity={wishMasterCity}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path='/wishmasterprofile'
                  render={() => {
                    return (
                      <WishMasterProfile
                        setWishMaster={setWishMaster}
                        wishMaster={wishMaster}
                        wishMasterCity={wishMasterCity}
                      />
                    );
                  }}
                />
                <Redirect to='/wishmasterprofile' />
              </React.StrictMode>
            </Switch>
          </BrowserRouter>
        </div>
      );
    } if(admin) {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              <React.StrictMode>
                <Route
                  exact
                  path='/admin'
                  render={() => {
                    return (
                      <Admin
                         setAdmin={setAdmin}
                      />
                    );
                  }}
                />
             
                <Redirect to='/admin' />
              </React.StrictMode>
            </Switch>
          </BrowserRouter>
        </div>
      );

    }
    
    else {
      return (
        <BrowserRouter>
          <Switch>
            <React.StrictMode>
              <Route
                exact
                path='/'
                render={() => {
                  return (
                    <Login
                      phone={phone}
                      setPhone={setPhone}
                      pickUp={pickUp}
                      setPickUp={setPickUp}
                      address={address}
                      setAddress={setAddress}
                      setCity={setCity}
                      city={city}
                      setPin={setPin}
                      pin={pin}
                      setBox={setBox}
                      box={box}
                      farmerSignUp={farmerSignUp}
                      setFarmerSignUp={setFarmerSignUp}
                      signInEmailError={signInEmailError}
                      setSignInEmailError={setSignInEmailError}
                      signInPasswordError={signInPasswordError}
                      setSignInPasswordError={setSignInPasswordError}
                      signInEmail={signInEmail}
                      setSignInEmail={setSignInEmail}
                      signInPassword={signInPassword}
                      setSignInPassword={setSignInPassword}
                      userName={userName}
                      setUserName={setUserName}
                      email={email}
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      handleLogin={handleLogin}
                      handleSignup={handleSignup}
                      hasAccount={hasAccount}
                      setHasAccount={setHasAccount}
                      emailError={emailError}
                      passwordError={passwordError}
                      signUpButton={signUpButton}
                      setSignUpButton={setSignUpButton}
                      setAadhar={setAadhar}
                      aadhar={aadhar}
                    />
                  );
                }}
              />
              <Redirect to='/' />
            </React.StrictMode>
          </Switch>
        </BrowserRouter>
      );
    }
  }

  return <div>{renderFarmer_renderCustomer()}</div>;
}
export default AuthRoute;
