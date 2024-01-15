import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import ComputerDataService from '../services/computer';

const Home = () => {
  const navigate = useHistory();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate.push("/loginn");
      }
      const { data } = await ComputerDataService.secondHome();

      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate.push("/loginn"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate.push("/loginn");
  };
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;