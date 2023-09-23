import CartDAO from "../dao/cartDAO.js";

export default class CartController {
    static async apiGetCart(req, res, next) {
        try {
            res.json(req.session.cart || []);
        } catch (error) {
            console.error('Error getting cart:', error);
            res.status(500).json({ error: 'Unable to retrieve cart' });
        }
    }

    static async apiPostCart(req, res, next) {
        try {
            const cartItem = {
                item_id: req.body.item_id,
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity
            };
            console.table(req.body);

            if (!req.session.cart) {
                req.session.cart = [];
            }

            const existingCartItemIndex = req.session.cart.findIndex(
                (item) => item.item_id === cartItem.item_id
            );

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
        } catch (error) {
            console.error('Error adding item to cart:', error);
            res.status(500).json({ error: 'Unable to add item to cart' });
        }
    }

    static apiUpdateCart(req, res) {
        try {
            const cartItem = {
                item_id: req.body.item_id,
                quantity: req.body.quantity
            };

            const existingCartItemIndex = req.session.cart.findIndex(
                (item) => item.item_id === cartItem.item_id
            );

            if (cartItem.quantity > 0) {
                console.log("cartitem q:", cartItem.quantity);
                req.session.cart[existingCartItemIndex].quantity = cartItem.quantity;
            } else {
                req.session.cart.splice(existingCartItemIndex, 1);
            }

            res.json({ message: "put success" });
        } catch (e) {
            console.log(`Unable to post post cart: ${e}}`);
        }
    }

    static apiDeleteCart(req, res) {
        try {
            delete req.session.cart;
            res.json({ message: "put success" });
        } catch (e) {
            console.log(`Unable to empty cart: ${e}}`);
        }
    }
}