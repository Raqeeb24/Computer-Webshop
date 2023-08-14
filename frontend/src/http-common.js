import axios from 'axios';

export default axios.create({
    baseURL: "https://backend-computer-webshop.vercel.app/api/v1/"
});