import React, { useState, useEffect } from "react";
import ComputerDataService from "../services/computer";

//for testing purposes
//import http from "../http-common";
//

const Login = props => {

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user)
    props.history.push('/');
  }

  const getCart = () => {
    ComputerDataService.testretrievesession();
  }
  const addToCart = () => {
    ComputerDataService.testconfiguresession();
  }

  //testing content
  const [message, setMessage] = useState('');

  // Function to send a POST request to set session data
  const setSessionData = async () => {
    try {
      const data = {
        name: "yesssss post"
      }
      await ComputerDataService.testconfiguresession(data);
      setMessage("success post");
    } catch (error) {
      console.error('Error setting session data:', error);
    }
  };

  // Function to send a GET request to retrieve session data
  const getSessionData = async () => {
    try {
      const response = await ComputerDataService.testretrievesession();
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error getting session data:', error);
    }
  };

  useEffect(() => {
    // Load session data when the component mounts
    getSessionData();
  }, []);


  return (
    < div className = "submit-form" >
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Login
        </button>
        <br />
        <br />
        <button onClick={addToCart}>addtocart</button>
        <button onClick={getCart}>view cart</button>
        <br />
        <br />


        <div>
          <h1>Session Test</h1>
          <button onClick={setSessionData}>Set Session Data</button>
          <p>Session Message: {message}</p>
        </div>


      </div>
    </div >
  );
};

export default Login;