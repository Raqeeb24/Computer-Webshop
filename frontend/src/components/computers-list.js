import React, { useState, useEffect } from "react";
import ComputerDataService from "../services/computer";
import { Link } from "react-router-dom";
import "./computers-list.css";

const ComputersList = props => {
  const [computers, setComputers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCpu, setSearchCpu] = useState("");
  const [cpus, setCpu] = useState(["Search by CPU"]);

  useEffect(() => {
    retrieveComputers();
    retrieveCpu();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchCpu = e => {
    const searchCpu = e.target.value;
    setSearchCpu(searchCpu);

  };

  const retrieveComputers = () => {
    ComputerDataService.getAll()
      .then(response => {
        console.log(response.data);
        setComputers(response.data.computers);

      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCpu = () => {
    ComputerDataService.getCpu()
      .then(response => {
        console.log(response.data);
        setCpu(["Search by CPU"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveComputers();
  };

  const find = (query, by) => {
    ComputerDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setComputers(response.data.computers);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };


  const findByCpu = () => {
    if (searchCpu === "Search by CPU") {
      refreshList();
    } else {
      console.log("cpu...")
      console.log(searchCpu)
      find(searchCpu, "cpu")
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg">
          <input
            type="text"
            className="form-control input"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary search-button"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg">
          <select className="form-control input" onChange={onChangeSearchCpu}>
            {cpus.map(cpu => {
              return (
                <option value={cpu}> {cpu.substr(0, 20)} </option>
              )
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary search-button"
              type="button"
              onClick={findByCpu}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        {computers.map((computer) => {
          const components = `${computer.cpu} ${computer.mainboard}, ${computer.ram}`;
          return (
            <div className="col-lg-4 pb-1">
              <Link to={"/computers/" + computer._id} className="card custom-card">
                <div className="card-body">
                  <h5 className="card-title">{computer.name}</h5>
                  <p className="card-text">
                    <strong>CPU: </strong>{computer.cpu}<br />
                    <strong>RAM: </strong>{computer.ram}<br />
                    <strong>GPU: </strong>{computer.gpu}<br />
                    <strong>Price: </strong>{computer.price}
                  </p>
                  <div className="row justify-content-center">
                    <Link to={"#"} className="btn btn-primary col-lg-5 mx-1 mb-1 add-to-cart-button">
                      Add to cart
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComputersList;