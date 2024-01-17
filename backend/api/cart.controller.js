import CartDAO from "../dao/cartDAO.js";

export default class CartController {
  static async apiGetCart(req, res, next) {
    try {
      const user_id = req.session.user_id;
      console.log("userid: ", user_id);
      if (user_id) {
        const { cart } = await CartDAO.getCart(user_id);
        res.json(cart);
      } else {
        console.log(req.session.cart)
        res.json(req.session.cart || []);
      }
    } catch (error) {
      console.error('Error getting cart:', error);
      res.status(500).json({ error: 'Unable to retrieve cart' });
    }
  }

  static async apiPostCart(req, res, next) {
    try {
      const user_id = req.session.user_id
      const cartItem = {
        item_id: req.body.item_id,
        user_id: user_id || null,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
      };
      console.table(cartItem);

      if (user_id) {
        const { item } = await CartDAO.addToCart(cartItem, user_id);
        res.json(item);
      } else {
        if (!req.session.cart) {
          req.session.cart = [];
        }

        const existingCartItemIndex = req.session.cart.findIndex(
          (item) => item.item_id === cartItem.item_id
        );

        // Checks if the item was already stored once in the cart
        if (existingCartItemIndex !== -1) {
          const existingCartItem = req.session.cart[existingCartItemIndex];
          if (existingCartItem.quantity < 10) {
            existingCartItem.quantity += cartItem.quantity;
          } else {
            console.log("the maximum amount of 10 is reached");
            return;
          }
        } else {
          req.session.cart.push(cartItem);
        }

        res.json(req.session.cart);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Unable to add item to cart' });
    }
  }


  static async apiUpdateCart(req, res) {
    try {
      const user_id = req.session.user_id
      const cartItem = {
        item_id: req.body.item_id,
        quantity: req.body.quantity
      };

      if (user_id) {
        if (cartItem.quantity == 0){
          await CartDAO.removeItem(cartItem.item_id, user_id);
          res.json( {message: "user-item successfully deleted"});
        }
        await CartDAO.updateCart(cartItem, user_id);
        res.json({ message: "user-cart put success" });
      } else {
        const existingCartItemIndex = req.session.cart.findIndex(
          (item) => item.item_id === cartItem.item_id
        );

        if (cartItem.quantity > 0) {
          req.session.cart[existingCartItemIndex].quantity = cartItem.quantity;
        } else {
          req.session.cart.splice(existingCartItemIndex, 1);
        }

        res.json({ message: "put success" });
      }


    } catch (e) {
      console.log(`Unable to post post cart: ${e}}`);
    }
  }

  static async apiDeleteCart(req, res) {
    try {
      const user_id = req.session.user_id;
      if(user_id) {
        await CartDAO.clearCart(user_id);
        res.json({ message: "deleted user-cart successfully"});
      }
      delete req.session.cart;
      res.json({ message: "delete cart success" });
  } catch (e) {
      console.log(`Unable to empty cart: ${e}}`);
  }
  }
}