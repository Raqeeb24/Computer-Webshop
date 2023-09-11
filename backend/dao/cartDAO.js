import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let cart;

export default class CartDAO {
    static async injectDB(conn) {
        if (cart){
            return;
        }
        try {
            cart = await conn.db(process.env.RESTREVIEWS_NS).collection("cart");
        } catch (e) {
            console.error(`Unable to establish collection handles in cartDAO: ${e}`);
        }
    }
    static async addToCart(computerId, user, quantity){
        try {
            const cartDoc = {
                computer_id: computerId,
                session_id: user,
                quantity: quantity
            }
            return await cart.insertOne(cartDoc);
        } catch (e) {
            console.error(`Unable to post addToCart: ${e}`);
            return {error: e};
        }
    }
}