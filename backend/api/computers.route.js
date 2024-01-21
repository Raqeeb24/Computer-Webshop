import express from "express";
import ComputersCtrl from './computers.controller.js'
import ReviewsCtrl from "./reviews.controller.js";
import CartController from "./cart.controller.js";

const router = express.Router();

router.route("/").get(ComputersCtrl.apiGetComputers);
router.route("/id/:id").get(ComputersCtrl.apiGetComputerById);
router.route("/cpu").get(ComputersCtrl.apiGetComputerByCpu);

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview);
    //.put(ReviewsCtrl.apiUpdateComponent)
    //.delete(ReviewsCtrl.apiDeleteComponent)

router
    .route("/computer")
    .post(ComputersCtrl.apiPostComputer);

router
    .route("/cart")
    .get(CartController.apiGetCart)
    .post(CartController.apiPostCart)
    .put(CartController.apiUpdateCart)
    .delete(CartController.apiDeleteCart);

export default router;