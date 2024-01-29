export default class CookiesMiddleware {
    static setCookie(res, name, value){
        res.cookie(name, value, {
            maxAge: 900000,
            withCredentials: true,
            httpOnly: false,
        });
    }
    static deleteCookie(res, name){
        res.cookie(name, "", {
            maxAge: 0,
            withCredentials: true,
            httpOnly: false,
        });
    }
}