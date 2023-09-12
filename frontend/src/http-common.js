import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_API
    //baseURL: "https://backend-computer-webshop.vercel.app/api/v1/"
    //baseURL: "https://backend-computer-webshop-ri3m.vercel.app/api/v1"
});