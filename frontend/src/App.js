import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
import Test from './components/test';

import ComputerDataServices from '../src/services/computer';

import SecondHome from './pages/Home';

function App() {
  const [user, setUser] = useState();
  const [itemCount, setItemCount] = useState();
  const [cookies] = useCookies([]);

  useEffect(() => {
    console.error("useffect countitems called")
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
    //removeCookie("token");
    //removeCookie("user");

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
      <div>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Computer Webshop</Navbar.Brand>
            <Navbar.Toggle className='justify-content-end' aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Link to={'/computers'} className='nav-link'>Computers</Link>
                {user ? (
                  <span onClick={logout} className="nav-link" style={{ cursor: "pointer" }}>
                    Logout {user}
                  </span>
                ) : (
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                )}
                <Link to={'/addComputer'} className='nav-link'>AddComputers</Link>
              </Nav>
              <Nav className='ml-auto'>
                <Link to={'/shoppingCart'} className="nav-link">
                  <Badge badgeContent={itemCount}>
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

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
            <Route
              path="/test"
              render={() => (
                <Test />
              )}
            />
          </Switch>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
