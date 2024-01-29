import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let cart;

export default class CartDAO {
    static async injectDB(conn) {
        if (cart) {
            return;
        }
        try {
            cart = await conn.db(process.env.RESTREVIEWS_NS).collection("cart");
        } catch (e) {
            console.error(`Unable to establish collection handles in cartDAO: ${e}`);
        }
    }
    static async getCart(user_id) {
        try {
            const cartListFromDB = await cart.find({ user_id: user_id }).toArray();

            const formattedCartList = cartListFromDB.map(cartItem => {
                return {
                    item_id: cartItem.item_id,
                    user_id: cartItem.user_id,
                    name: cartItem.name,
                    price: cartItem.price,
                    quantity: parseInt(cartItem.quantity)
                };
            });

            return { cart: formattedCartList };
        } catch (e) {
            console.error(`Unable to fetch cart for user: ${e}`);
            return { error: e };
        }
    }

    static async addToCart(item, user_id) {
        try {
            const existingCartItem = await cart.findOne({
                user_id: user_id,
                item_id: item.item_id
            });

            if (existingCartItem) {
                await cart.updateOne({
                    user_id: user_id,
                    item_id: item.item_id
                },
                {
                    $inc: { quantity: item.quantity }
                });
                res.json("added existing item for user");
            } else {
                return await cart.insertOne(item);
            }
        } catch (e) {
            console.error(`Unable to post addToCart: ${e}`);
            return { error: e };
        }
    }

    static async updateCart(item, user_id) {
        try {
            await cart.updateOne({
                user_id: user_id,
                item_id: item.item_id
            },
            {
                $set: { quantity: item.quantity }
            });
        } catch (e) {
            console.error(`Unable to update cart: ${e}`);
            return { error: e };
        }
    }

    static async removeItem(item_id, user_id){
        try {
            await cart.deleteOne({
                user_id: user_id,
                item_id: item_id
            });
        } catch (e) {
            console.error(`Unable to remove item: ${e}`);
            return { error: e };
        }
    }

    static async clearCart(user_id) {
        try {
            await cart.deleteMany({
                user_id: user_id,
            });
        } catch (e) {
            console.error(`Unable to clear cart: ${e}`);
            return { error: e };
        }
    }
}