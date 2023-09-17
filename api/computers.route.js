import express from "express";
import ComputersCtrl from './computers.controller.js'
import ComponentsCtrl from './components.controller.js'
import ReviewsCtrl from "./reviews.controller.js";
import CartController from "./cart.controller.js";


const router = express.Router();

router.route("/computers/").get(ComputersCtrl.apiGetComputers);
router.route("/computers/id/:id").get(ComputersCtrl.apiGetComputerById);
router.route("/cpu").get(ComputersCtrl.apiGetComputerByCpu);
router.route("/addToCart").post(CartController.postCart);

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview);
    //.put(ComponentsCtrl.apiUpdateComponent)
    //.delete(ComponentsCtrl.apiDeleteComponent)

router
    .route("/computer")
    .post(ComputersCtrl.apiPostComputer);

router
    .route("/cart")
    .get(CartController.getCart)
    .post(CartController.apiPostCart);

export default router;