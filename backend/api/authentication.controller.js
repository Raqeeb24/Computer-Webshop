import AuthenticationDAO from "../dao/authenticationDAO.js";
import CartDAO from "../dao/cartDAO.js";
import CookiesMiddleware from "../middleware/CookiesMiddleware.js";
import createSecretToken from "../util/SecretToken.js";
import bcrypt from 'bcrypt';

export default class AuthController {
    static async apiPostSignup(req, res, next) {
        try {
            const { email, password, username } = req.body;
            const existingUser = await AuthenticationDAO.findUser(email);
            if (existingUser) {
                return res.json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = {
                email,
                password: hashedPassword,
                username,
                createdAt: new Date(),
            };
            await AuthenticationDAO.addUser(user);
            const token = createSecretToken(user._id);
            const cart = req.session.cart
            req.session.regenerate((err) => {
                if (err) {
                    console.error('Failed to regenerate session:', err);
                } else {
                    console.log({ message: 'Session regenerated' });
                }
            });
            req.session.user_id = user._id;
            if(cart){
                cart.forEach(async (item) => {
                    item.user_id = user._id;
                    await CartDAO.addToCart(item, user._id);
                });
            }
            CookiesMiddleware.setCookie(res, "token", token);
            CookiesMiddleware.setCookie(res, "user", user.username);
            res.status(201).json({
                message: "User signed in successfully",
                success: true,
                user: {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    createdAt: user.createdAt,
                },
            });
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async apiPostLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.json({ message: 'All fields are required' })
            }
            const user = await AuthenticationDAO.findUser(email);
            if (!user) {
                return res.json({ message: 'Incorrect password or email' })
            }
            const auth = await bcrypt.compare(password, user.password)
            if (!auth) {
                return res.json({ message: 'Incorrect password or email' })
            }
            const token = createSecretToken(user._id);
            const cart = req.session.cart;
            req.session.regenerate((err) => {
                if (err) {
                    console.error('Failed to regenerate session:', err);
                } else {
                    console.log({ message: 'Session regenerated' });
                }
            });
            req.session.user_id = user._id;
            if(cart){
                cart.forEach(async (item) => {
                    item.user_id = user._id;
                    await CartDAO.addToCart(item, user._id);
                });
            }
            CookiesMiddleware.setCookie(res, "token", token);
            res.status(201).json({ 
                message: "User logged in successfully", 
                success: true,
                username: user.username
            });
            next();
        } catch (error) {
            console.error(error);
        }
    }

    static async apiPostLogout(req, res) {
        try {
            CookiesMiddleware.deleteCookie(res, "token");
            req.session.destroy((err) => {
                if (err) {
                    console.error('Failed to destroy session:', err);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    res.status(204).json({ 
                        message: "Session destroyed successfully", 
                        success: true,
                    });
                }
            });
        } catch (error) {
            console.error('Error during session destruction:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}