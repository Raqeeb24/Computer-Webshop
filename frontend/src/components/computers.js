import React, { useState, useEffect } from "react";
import ComputerDataService from "../services/computer";
import { Link } from "react-router-dom";

const Computer = props => {
  const initialComputerState = {
    id: null,
    name: "",
    cpu: "",
    cpu_cooler: "",
    mainboard: "",
    ram: "",
    gpu: "",
    ssd: "",
    case: "",
    power_supply: "",
    price: "",
    reviews: []
  };
  const [computer, setComputer] = useState(initialComputerState);

  const getComputer = id => {
    console.log(id)
    ComputerDataService.get(id)
      .then(response => {
        setComputer(response.data);
        console.log(response.data);
        console.log(id);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getComputer(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    ComputerDataService.deleteReview(reviewId)
      .then(response => {
        setComputer((prevState) => {
          prevState.reviews.splice(index, 1)
          return ({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {computer ? (
        <div>
          <h3>{computer.name}</h3><br />
          <p>
            <div className="row">
              <div className="col">
                <strong>CPU: </strong>{computer.cpu}<br />
              </div>
              <div className="col">
                <strong>CPU-Cooler: </strong>{computer.cpu_cooler}<br />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>Motherboard: </strong>{computer.mainboard}<br />
              </div>
              <div className="col">
                <strong>RAM: </strong>{computer.ram}<br />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>GPU: </strong>{computer.gpu}<br />
              </div>
              <div className="col">
                <strong>SSD: </strong>{computer.ssd}<br />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>Case: </strong>{computer.case}<br />
              </div>
              <div className="col">
                <strong>Power-Supply: </strong>{computer.power_supply}<br /><br />
              </div>
            </div>
            <div className="row">
              <h5 className="col-lg-6 "><strong>Price: </strong>{computer.price}</h5>
              <Link to={"#"} className="btn btn-primary col-lg-4">
                Add to cart
              </Link>
            </div>
          </p>

          <hr />
          <Link to={"/computers/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link><br /><br />
          <h4> Reviews </h4><br />
          <div className="row">
            {computer.reviews.length > 0 ? (
              computer.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}<br />
                          <strong>User: </strong>{review.name}<br />
                          <strong>Date: </strong>{review.date}
                        </p>
                        {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <a href={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/computers/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No computer selected.</p>
        </div>
      )}
    </div>
  );
};

export default Computer;