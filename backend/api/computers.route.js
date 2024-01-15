import express from "express";
import ComputersCtrl from './computers.controller.js'
import ComponentsCtrl from './components.controller.js'
import ReviewsCtrl from "./reviews.controller.js";
import CartController from "./cart.controller.js";
import UsersController from "./users.controller.js";


const router = express.Router();

router.route("/").get(ComputersCtrl.apiGetComputers);
router.route("/id/:id").get(ComputersCtrl.apiGetComputerById);
router.route("/cpu").get(ComputersCtrl.apiGetComputerByCpu);
router.route("/signup").post(UsersController.apiPostSignUp);
router.route("/login").post(UsersController.apiPostLogin);

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
    .get(CartController.apiGetCart)
    .post(CartController.apiPostCart)
    .put(CartController.apiUpdateCart)
    .delete(CartController.apiDeleteCart);

export default router;