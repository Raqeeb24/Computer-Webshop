import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Switch, Route, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Computer from './components/computers';
import AddReview from './components/add-review';
import Login from './components/login';
import ComputersList from './components/computers-list';
import AddComputer from './components/add-computer';
import ShoppingCart from './components/shopping-cart';
import Test from './components/test';
import { Badge } from '@mui/material';

import ComputerDataServices from '../src/services/computer';
import SignUp from './components/signup';
import SecondLogin from './pages/Login';
import SecondSignup from './pages/Signup';
import SecondHome from './pages/Home';

function App() {
  const [user, setUser] = useState(null);
  const [itemCount, setItemCount] = useState();

  useEffect(() => {
    ComputerDataServices.getCart()
      .then(cart => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        console.log(`cart length: ${totalItems}`);
        setItemCount(totalItems);
      })
  }, [])

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
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
                <a href={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                  Logout {user.name}
                </a>
              ) : (
                <Link to={"/loginn"} className="nav-link">
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
          <Route exact path={["/", "/computers"]} component={ComputersList} />
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
              <SecondLogin {...props} />
            )}
          />
          <Route
            path="/signupp"
            render={(props) => (
              <SecondSignup {...props} />
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
              <ShoppingCart {...props} />
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
