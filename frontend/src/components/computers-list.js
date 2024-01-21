import React, { useState, useEffect } from "react";
import ComputerDataService from "../services/computer";
import { Link } from "react-router-dom";
import "./computers-list.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ComputersList = props => {
  const [loading, setLoading] = useState(false);
  const [computers, setComputers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCpu, setSearchCpu] = useState("");
  const [cpus, setCpu] = useState(["Search by CPU"]);

  useEffect(() => {
    retrieveCpu();
    retrieveComputers();
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
    const items = JSON.parse(sessionStorage.getItem("computers"));
    if (items) {
      setComputers(items);
    } else {
      setLoading(true);
      ComputerDataService.getAll()
        .then(response => {
          setComputers(response.data.computers);
          sessionStorage.setItem("computers", JSON.stringify(response.data.computers));
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  const retrieveCpu = () => {
    const items = JSON.parse(sessionStorage.getItem("cpus"));
    if(items) {
      setCpu(["Search by CPU"].concat(items));
    } else {
      ComputerDataService.getCpu()
      .then(response => {
        sessionStorage.setItem("cpus", JSON.stringify(response.data));
        setCpu(["Search by CPU"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  const refreshList = () => {
    retrieveComputers();
  };

  const find = (query, by) => {
    ComputerDataService.find(query, by)
      .then(response => {
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

      const response = await ComputerDataService.addToCart(data);
      const updatedCart = response.data;

      console.log(`Successfully added ${computer.name} to cart`);
      console.log('Updated Cart:', updatedCart);
      updateCart();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const updateCart = () => {
    props.updateCart();
  }

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
            <div className="col-xl-4 col-md-6 pb-2" key={index}>
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
            <div className="col-xl-4 col-md-6 pb-2">
              <Link to={"/computers/" + computer._id} className="card custom-card">
                <div className="card-body">
                  <h5 className="card-title" id="product_card">{computer.name || <Skeleton />}</h5>
                  <p className="card-text" id="product_card">
                    <strong>CPU: </strong>{computer.cpu}<br />
                    <strong>RAM: </strong>{computer.ram}<br />
                    <strong>GPU: </strong>{computer.gpu}<br />
                    <strong>Price: </strong>{computer.price}
                  </p>
                  <div className="text-end">
                    <button onClick={(event) => {
                      event.preventDefault();
                      handleAddToCart(computer);
                    }}
                      className="card-link btn btn-primary btn-sm col-md-4 mx-1 mb-1 add-to-cart-button">
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