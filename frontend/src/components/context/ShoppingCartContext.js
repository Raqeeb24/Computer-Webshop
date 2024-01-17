import React, { createContext, useState } from 'react';
import ComputerDataService from '../../services/computer';

const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  const getCartItems = () => {
    ComputerDataService.getCart()
      .then(cart => {
        console.log(`2cart2: ${cart}`);
        setCartItems(cart);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShoppingCartContext.Provider value={{ cartItems, getCartItems, cartItemCount }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default{ ShoppingCartProvider, ShoppingCartContext };
