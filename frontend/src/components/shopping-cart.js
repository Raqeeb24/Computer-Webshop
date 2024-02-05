import React, { useState, useEffect } from "react";
import lscache from "lscache";
import ComputerDataService from "../services/computer";
import "./shopping-cart.css";

const ShoppingCart = props => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();

  const quantityOptions = [];
  for (let i = 0; i <= 10; i++) {
    quantityOptions.push(<option key={i} value={i}>{i}</option>)
  }

  useEffect(() => {
    retrieveItems();
  }, []);

  useEffect(() => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(totalPrice.toFixed(2));
  }, [items]);


  const onChangeQuantity = async (e, item_id) => {
    const quantity = e.target.value;
    try {
      const data = {
        item_id: item_id,
        quantity: quantity
      };
      await ComputerDataService.updateCart(data)
        .then(() => {
          updateCart();
          lscache.remove("cart");
        });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
    retrieveItems();
    updateCart();
  }

  const retrieveItems = () => {
    const lsCart = lscache.get("cart");
    if (lsCart) {
      setItems(lsCart);
    } else {
      ComputerDataService.getCart()
        .then(cart => {
          setItems(cart);
          lscache.set("cart", cart, 5);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  const updateCart = () => {
    props.updateCart();
  }

  const deleteCart = () => {
    ComputerDataService.deleteCart()
      .then(() => {
        lscache.remove("cart");
        retrieveItems();
        updateCart();
      })
  }

  const navigateToComputer = (item_id) => {
    props.history.push(`/computers/${item_id}`);
  }

  return (
    <>
      <br />
      {items.length > 0 ? (
        <div>
          <div className="row fw-semibold">
            <div className="col-sm-8 col-9">Product</div>
            <div className="col-sm-2 d-sm-block d-none">Quantity</div>
            <div className="col-sm-2 text-center col-2">Price</div>
          </div>
          {items.map((item) => (
            <div className="row" key={item.item_id}>
              <hr id="hr_custom" />
              <div className="col-sm-8 col-7">
                <div onClick={() => navigateToComputer(item.item_id)}>{item.name}</div>
                <div>{item.price}</div>
              </div>
              <div className="col-sm-2 col-2 align-self-center">
                <select value={item.quantity} onChange={(e) => onChangeQuantity(e, item.item_id)}>
                  {quantityOptions}
                </select>
              </div>
              <div className="col-sm-2 col-1 align-self-end fw-semibold">{parseFloat(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <hr />
          <div className="row fs-5">
            <div className="col-3 fw-bolder">Total</div>
            <div className="col-9 text-end fw-bolder" style={{ float: "right !important" }}>CHF {total}</div>
          </div>
          <div className="row fs-5">
            <div className="col text-end">
              <button className="btn btn-link" onClick={() => deleteCart()}>clear cart</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fs-5 fw-semibold">Your shopping cart is empty</div>
      )}
    </>
  );
}

export default ShoppingCart;