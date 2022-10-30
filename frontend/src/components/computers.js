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
          return({
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
          <h5>{computer.name}</h5>
          <p>
            <strong>CPU: </strong>{computer.cpu}<br/>
            <strong>GPU: </strong>{computer.gpu} {computer.case}, {computer.price}
          </p>
          <Link to={"/computers/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {computer.reviews.length > 0 ? (
             computer.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
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