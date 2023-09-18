import React, { useState, useEffect } from "react";
import ComputerDataService from "../services/computer";
import { Link } from "react-router-dom";
import "./computers-list.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import httpCommon from "../http-common";

const ComputersList = props => {
  const [loading, setLoading] = useState(true);
  const [computers, setComputers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCpu, setSearchCpu] = useState("");
  const [cpus, setCpu] = useState(["Search by CPU"]);

  useEffect(() => {
    setLoading(true);
    retrieveCpu();
    retrieveComputers();
    setLoading(false);
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

  const handleAddToCart = async (computer) => {
    try {
      const data = {
        item_id: computer._id,
        name: computer.name,
        price: computer.price,
        quantity: 1
      };

      const response = await httpCommon.post('/computers/cart', { data }, { withCredentials: true});
      const updatedCart = response.data;

      console.log(`Successfully added ${computer.name} to cart`);
      console.log('Updated Cart:', updatedCart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
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
        {loading ? (
          Array.from({ length: 9 }).map((index) => (
            <div className="col-lg-4 pb-1" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <Skeleton width={200} />
                  </h5>
                  <p className="card-text">
                    <Skeleton count={3} />
                    <Skeleton width={100} />
                  </p>
                  <div className="row justify-content-center">
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          computers.map((computer) => (
            <div className="col-lg-4 pb-1">
              <Link to={"/computers/" + computer._id} className="card custom-card">
                <div className="card-body">
                  <h5 className="card-title">{computer.name || <Skeleton />}</h5>
                  <p className="card-text">
                    <strong>CPU: </strong>{computer.cpu}<br />
                    <strong>RAM: </strong>{computer.ram}<br />
                    <strong>GPU: </strong>{computer.gpu}<br />
                    <strong>Price: </strong>{computer.price}
                  </p>
                  <div className="row justify-content-center">
                    <button onClick={(event) => {
                      event.preventDefault();
                      handleAddToCart(computer);
                    }}
                      className="btn btn-primary col-lg-5 mx-1 mb-1 add-to-cart-button">
                      Add to cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComputersList;