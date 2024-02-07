import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';

import { Switch, Route, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { ToastContainer } from "react-toastify";
import lscache from 'lscache';

import Computer from './components/computers';
import AddReview from './components/add-review';
import Login from './components/login';
import Signup from './components/signup';
import ComputersList from './components/computers-list';
import AddComputer from './components/add-computer';
import ShoppingCart from './components/shopping-cart';

import ComputerDataServices from '../src/services/computer';

import SecondHome from './pages/Home';

function App() {
  const [user, setUser] = useState();
  const [itemCount, setItemCount] = useState();
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    console.log("useffect countitems called")
    const countIitems = () => {
      const lsCart = lscache.get("cart");
      if (lsCart) {
        const totalItems = lsCart.reduce((sum, item) => sum + item.quantity, 0);
        setItemCount(totalItems);
      } else {
        ComputerDataServices.getCart()
          .then(cart => {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            setItemCount(totalItems);
            lscache.set("cart", cart, 5);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
    countIitems();
  }, [user, itemCount]);

  useEffect(() => {
    const verifyUser = () => {
      try {
        const username = cookies.user;
        if (username) {
          if (username !== "undefined") {
            console.log("username: ", username);
            setUser(username);
          }
        }
      } catch (error) {
        console.error('Error verifying cookie:', error);
      }
    }
    verifyUser();
  }, [user, cookies.user]);

  async function login(user = null) {
    lscache.remove("cart");
    setUser(user);
  }

  async function logout() {
    lscache.set("cart", [], 5);
    setUser(null);
    removeCookie("token");
    removeCookie("user");

    ComputerDataServices.logout();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  async function updateCart(item = null) {
    setItemCount(item);
  }

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <div className="navbar-brand">
              Computer Webshop
            </div>
            <div className="d-flex flex-row-reverse gap-3">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <ul className="navbar-nav mb-lg-0" id="cart-link-toggle">
                <li className="nav-item">
                  <Link to={'/shoppingCart'} className="nav-link">
                    <Badge badgeContent={itemCount} color="primary">
                      <ShoppingCartIcon />
                    </Badge>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item">
                  <Link to={'/computers'} className='nav-link'>Computers</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/addComputer'} className='nav-link'>AddComputers</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto mb-lg-0">
                <li className="nav-item">
                  {user ? (
                    <span onClick={logout} className="nav-link" style={{ cursor: "pointer" }}>
                      Logout {user}
                    </span>
                  ) : (
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <ul className="navbar-nav ml-auto mb-lg-0" id="cart-link">

              <li className="nav-item">
                <Link to={'/shoppingCart'} className="nav-link">
                  <Badge badgeContent={itemCount} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
              </li>
            </ul>
          </div>
        </nav >

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/computers"]}
              component={(props) => (
                <ComputersList {...props} updateCart={updateCart} />
              )}
            />
            <Route
              path="/computers/:id/review"
              render={(props) => (
                <AddReview {...props} user={user} />
              )}
            />
            <Route
              path="/computers/:id"
              render={(props) => (
                <Computer {...props} user={user} />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} login={login} />
              )}
            />
            <Route
              path="/signup"
              render={(props) => (
                <Signup {...props} login={login} />
              )}
            />
            <Route
              path="/home"
              render={(props) => (
                <SecondHome {...props} />
              )}
            />
            <Route
              path="/addComputer"
              render={(props) => (
                <AddComputer {...props} login={login} />
              )}
            />
            <Route
              path="/shoppingCart"
              render={(props) => (
                <ShoppingCart {...props} updateCart={updateCart} />
              )}
            />
          </Switch>
        </div>

        <footer className="mt-auto">
          <div className='container'>
            <p>footer</p>
          </div>
        </footer>
      </div >
      <ToastContainer />
    </>
  );
}

export default App;
