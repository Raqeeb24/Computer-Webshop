import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Switch, Route, Link } from 'react-router-dom';

import Computer from './components/computers';
import AddReview from './components/add-review';
import Login from './components/login';
import ComputersList from './components/computers-list';
import AddComputer from './components/add-computer';

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/computers" className="navbar-brand">
          Computer Shop
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/computers"} className="nav-link">
              Computers
            </Link>
          </li>
          <li className="nav-item" >
            {user ? (
              <a href={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}

          </li>
          <li className='nav-item'>
            <Link to={"/addComputer"} className="nav-link">
              AddComputer
            </Link>
          </li>
        </div>
      </nav>

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
            path="/addComputer"
            render={(props) =>(
              <AddComputer {...props} login={login} />
            )}
          />
        </Switch>
      </div>

    </div>


  );
}

export default App;
