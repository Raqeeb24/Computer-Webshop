//import CartDAO from "../dao/cartDAO.js";

export default class CartController {
    static async apiPostCart(req, res, next) {
        try {
            /*const computer_id = req.body._id;
            const session_id = req.body
            */
           const item = {
            item_id: req.body.item_id || "eewiorid",
            name: req.body.name || "namenodata",
            price: req.body.price || 232333,
            quantity: 1
           }
           /*
           if(!req.session.cart){
            req.session.cart = [];
            res.sendStatus(200);
            console.log("no session existing");
           }*/
           req.session.cart = [];
           req.session.cart.push(item);
           console.log("session", req.session.cart)
        } catch (e) {
            console.log(`Unable to post cart: ${e}}`);
            return;
        }
    }
    static async getCart(req, res, next){
        try {
            if( req.session && req.session.cart){
                const cart = req.session.cart;
                res.json(cart);
                console.log("getsession", req.session.cart)
            }else{
                res.json("empty");
                return;
            }
        } catch (e) {
            console.log(`Unable to get cart: ${e}}`);
        }
    }
    static async postCart(req, res){
        try {
            const cart = {
                item_id: req.body.item_id,
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity
            };
            req.session.cart = cart;
            res.json({message: "post success"});
        } catch (e) {
            console.log(`Unable to post post cart: ${e}}`);
        }
    }
}