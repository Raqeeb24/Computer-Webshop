//import CartDAO from "../dao/cartDAO.js";

export default class CartController {
    static async apiPostCart(req, res, next) {
        try {
            const cart  = { 
                item_id: req.body.data.item_id, 
                name: req.body.data.name,
                price: req.body.data.price,
                quantity: req.body.data.quantity
            };

            console.table(req.body);
            
            if (!req.session.cart) {
                req.session.cart = [];
            }
            req.session.cart.push(cart);
            res.json(req.session.cart);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            res.status(500).json({ error: 'Unable to add item to cart' });
        }
    }
    static async getCart(req, res, next) {
        try {
            res.json(req.session.cart || []);
        } catch (error) {
            console.error('Error getting cart:', error);
            res.status(500).json({ error: 'Unable to retrieve cart' });
        }
    }
    static async postCart(req, res) {
        try {
            const cart = {
                item_id: req.body.item_id,
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity
            };
            req.session.cart = cart;
            res.json({ message: "post success" });
        } catch (e) {
            console.log(`Unable to post post cart: ${e}}`);
        }
    }
}