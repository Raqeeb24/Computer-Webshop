import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import ComputersDAO from'./backend/dao/computersDAO.js'; 
import ReviewsDAO from './backend/dao/reviewsDAO.js';
import CartDAO from './backend/dao/cartDAO.js';
import AuthenticationDAO from './backend/dao/authenticationDAO.js';

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true,
    }
)
    .catch(err => {
        console.log("catch")
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ComputersDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        await CartDAO.injectDB(client)
        await AuthenticationDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })