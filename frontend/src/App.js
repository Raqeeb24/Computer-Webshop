import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Switch, Route, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';


import Computer from './components/computers';
import AddReview from './components/add-review';
import Login from './components/login';
import ComputersList from './components/computers-list';
import AddComputer from './components/add-computer';
import ShoppingCart from './components/shopping-cart';
import Test from './components/test';

import ComputerDataServices from '../src/services/computer';
import SignUp from './components/signup';
import SecondLogin from './pages/Login';
import SecondSignup from './pages/Signup';
import SecondHome from './pages/Home';

function App() {
  const [user, setUser] = useState();
  const [itemCount, setItemCount] = useState();
  const [cookies, removeCookie] = useCookies([]);

  const {itemUpdater, setItemUpdater} = useState();

  useEffect(() => {
    const countIitems = async () => {
      await ComputerDataServices.getCart()
        .then(cart => {
          const totalItems = cart.reduce((sum, item) =>sum * item.quantity, 0);
          console.log("total", totalItems);
          setItemCount(totalItems);
          console.log("after,", itemCount);
        });
    }
    countIitems();
  }, [itemCount]);
  useEffect(() => {
    const verifyCookie = async () => {
      if (cookies.token) {
        const { data } = await ComputerDataServices.secondHome();
        const { status, user } = data;
        if (status) {
          setUser(user);
        }
      } else {
        setUser(null);
      };
    }
    verifyCookie();
  }, [user, cookies, removeCookie]);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
    removeCookie("token");
    ComputerDataServices.logout();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  async function updateCart(item = null) {
    setItemCount(item);
  }
  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Computer Webshop</Navbar.Brand>
          <Navbar.Toggle className='justify-content-end' aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to={'/computers'} className='nav-link'>Computers</Link>
              {user ? (
                <Link onClick={logout} className="nav-link">
                  Logout {user}
                </Link>
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
              <SignUp {...props} login={login} />
            )}
          />
          <Route
            path="/loginn"
            render={(props) => (
              <SecondLogin {...props} handleSubmit={login} />
            )}
          />
          <Route
            path="/signupp"
            render={(props) => (
              <SecondSignup {...props} login={login} />
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
  );
}

export default App;
