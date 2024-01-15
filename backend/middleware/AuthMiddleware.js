import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import AuthenticationDAO from "../dao/authenticationDAO.js";

dotenv.config();

export default class AuthMiddleware {

  static async userVerification(req, res) {
    const token = req.cookies.token
    if (!token) {
      return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.json({ status: false })
      } else {
        const user = await AuthenticationDAO.verifyUser(data.id);
        console.log("user: ", user);
        if (user) {
          return res.json({ status: true, user: user.username })
        } else {
          return res.json({ status: false })
        }
      }
    })
  }
}