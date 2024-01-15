import UsersDAO from '../dao/usersDAO.js';

export default class UsersController {
    static async apiPostSignUp(req, res) {
        try {
            const {email, password} = req.body;

            const existingUser = await UsersDAO.signup(
                email,
                password
            );
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiPostLogin(req, res) {
        try {
            
        } catch (e) {
            
        }
    }
}