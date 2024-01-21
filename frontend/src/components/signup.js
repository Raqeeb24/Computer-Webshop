import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import ComputerDataService from '../services/computer';

const Signup = props => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await ComputerDataService.signup(inputValue);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        login();
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  const login = () => {
    props.login();
    props.history.push('/home');
  }

  return (
    <div className="submit-form">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div><br />
        <button type="submit" className="btn btn-success">Submit</button>
        <div className="form-group">
          Already have an account? <Link to={"/login"}>Login</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;