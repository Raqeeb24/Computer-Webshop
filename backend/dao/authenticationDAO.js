import { ObjectId } from "mongodb";

let authentication

export default class AuthenticationDAO {
  static async injectDB(conn) {
    if (authentication) {
      console.log("data loaded")
      return
    }
    try {
      authentication = await conn.db(process.env.RESTREVIEWS_NS).collection("users");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in authenticationDAO.js: ${e}`,
      )
    }
  }
  static async verifyUser(id){
    try {
      return await authentication.findOne({ _id: new ObjectId(id) });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal Server Error at findUser" });
    }
  }
  static async findUser(email){
    try {
      return await authentication.findOne({ email });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal Server Error at findUser" });
    }
  }
  static async addUser(user){
    try {
      return await authentication.insertOne(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal Server Error at addUser" });
    }
  }
}