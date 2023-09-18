import React, { useState, useEffect } from "react";
import ComputerDataServices from "../services/computer";
import "./shopping-cart.css";

const ShoppingCart = props => {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState();

  const quantityOptions = [];
  for (let i = 1; i <= 10; i++) {
    quantityOptions.push(<option key={i} value={i}>{i}</option>)
  }

  useEffect(() => {
    retrieveItems();
  }, []);


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
      <h2>Your shopping cart</h2><br />
      {items.length > 0 ? (
        items.map((item) => (
          <div className="row" key={item.item_id}>
            <hr />
            <div className="col">
              <div>{item.name}</div>
              <div>{item.item_id}</div>
              <div>{item.price}</div>
            </div>
            <div className="col">
              <select value={item.quantity} onChange={onChangeQuantity}>
                {quantityOptions}
              </select>
            </div>
            <div className="col">{item.price * item.quantity}</div>
          </div>
        ))
      ) : (
        <div>Your shopping cart is empty</div>
      )}
    </>
  );
}

export default ShoppingCart;

//Bei Quantität stehengeblieben. Es muss hinterdacht werden, wie man die Quantität festlegt. Mit UseState setzt man die Quantität im allgemein fest, ohne diese für eine reale anpassung eines einzelnen produktes Anzupassen?.