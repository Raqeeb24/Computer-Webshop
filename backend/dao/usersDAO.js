import mongodb from 'mongodb';
import bcrypt from 'bcrypt';
let user

export default class UsersDAO {
    static async injectDB(conn) {
        if (user) {
            return
        }
        try {
            user = await conn.db(process.env.RESTREVIEWS_NS).collection("users");
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in usersDAO: ${e}`,
            )
        }
    }

    static async signup(email, password) {
        try {
            const hashedPassword = bcrypt.hash(password, 10);

            return await user.insertOne({email, password: hashedPassword});
        } catch (e) {
            console.error(`Unable to post signup: ${e}`)
            return { error: e }
        }
    }
}