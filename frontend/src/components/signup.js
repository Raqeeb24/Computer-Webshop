import React, { useState } from "react";
import ComputerDataService from "../services/computer";

const SignUp = props => {

  /*const initialUserState = {
    name: "",
    id: "",
  };
*/
  //const [user, setUser] = useState(initialUserState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  */

  const signup = () => {
    ComputerDataService.signin(email, password);
    //props.login(user)
    //props.history.push('/');
  }

  return (
    < div className="submit-form" >
      <div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
        </div>
        <button onClick={signup} className="btn btn-success">
          Create account
        </button>
      </div>
    </div >
  );
};

export default SignUp;