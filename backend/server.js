import express from 'express'
import cors from 'cors'
import computers from './api/computers.route.js'
import ProductCtrl from './api/product.controller.js'

const app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());

app.use("/api/v1/computers", computers);
app.use("*", (req, res) => res.status(404).json({ error: "not found!!!"}));

app
    .route("/computer")
    .post(ProductCtrl.apiPostProduct)

export default app;