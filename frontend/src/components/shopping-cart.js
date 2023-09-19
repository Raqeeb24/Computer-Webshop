import React, { useState, useEffect } from "react";
import ComputerDataServices from "../services/computer";
import "./shopping-cart.css";

const ShoppingCart = props => {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState();
  const [total, setTotal] = useState();

  const quantityOptions = [];
  for (let i = 1; i <= 10; i++) {
    quantityOptions.push(<option key={i} value={i}>{i}</option>)
  }

  useEffect(() => {
    retrieveItems();
  }, []);

  useEffect(() => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(totalPrice.toFixed(2));
  }, [items]);


  const onChangeQuantity = (e) => {
    console.log("qunatiy before:", quantity);
    const q = e.target.value;
    setQuantity(q);
    console.log("quantity after:", quantity);
  }

  const retrieveItems = () => {
    ComputerDataServices.getCart()
      .then(cart => {
        console.log(`cart: ${cart}`);
        setItems(cart);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <>
      <br />
      {items.length > 0 ? (
        <div>
          <div className="row fw-semibold">
            <div className="col-sm-8">Product</div>
            <div className="col-sm-2 d-sm-block d-none">Quantity</div>
            <div className="col-sm-2 d-sm-block d-none">Price</div>
          </div>
          {items.map((item) => (
            <div className="row" key={item.item_id}>
              <hr id="hr_custom" />
              <div className="col-8">
                <div>{item.name}</div>
                <div>{item.item_id}</div>
                <div>{item.price}</div>
              </div>
              <div className="col-2 align-self-center">
                <select value={item.quantity} onChange={onChangeQuantity}>
                  {quantityOptions}
                </select>
              </div>
              <div className="col-2 align-self-end fw-semibold">{item.price * item.quantity}</div>
            </div>
          ))}
          <hr />
          <div className="row fs-5">
            <div className="col-3 fw-bolder">Total</div>
            <div className="col-9 text-end fw-bolder" style={{ float: "right !important" }}>CHF {total}</div>
          </div>
        </div>
      ) : (
        <div className="fs-5 fw-semibold">Your shopping cart is empty</div>
      )}
    </>
  );
}

export default ShoppingCart;

//Bei Quantität stehengeblieben. Es muss hinterdacht werden, wie man die Quantität festlegt. Mit UseState setzt man die Quantität im allgemein fest, ohne diese für eine reale anpassung eines einzelnen produktes Anzupassen?.