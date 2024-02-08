const node_env = process.env.NODE_ENV;

export default class CookiesMiddleware {
    static setCookie(res, name, value) {
        res.cookie(name, value, {
            maxAge: 900000,
            withCredentials: true,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true
        });
    }
    static deleteCookie(res, name) {
        console.log("node_env", node_env);
        res.cookie(name, "", {
            maxAge: 0,
            withCredentials: true,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true
        });
    }
}