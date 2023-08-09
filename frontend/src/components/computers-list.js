import React, { useState, useEffect } from "react";
import ComputerDataService from "../services/computer";
import { Link } from "react-router-dom";

const ComputersList = props => {
  const [computers, setComputers] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchCpu, setSearchCpu ] = useState("");
  const [cpus, setCpu] = useState(["All Cpu"]);

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
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg">

          <select className="col" onChange={onChangeSearchCpu}>
             {cpus.map(cpu => {
               return (
                 <option value={cpu}> {cpu.substr(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
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
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{computer.name}</h5>
                  <p className="card-text">
                    <strong>CPU: </strong>{computer.cpu}<br/>
                    <strong>RAM: </strong>{computer.ram}<br/>
                    <strong>GPU: </strong>{computer.gpu}<br/>
                    <strong>Price: </strong>{computer.price}
                  </p>
                  <div className="row">
                  <Link to={"/computers/"+computer._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Product
                  </Link>
                  <Link to={"#"} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    Add to cart
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default ComputersList;