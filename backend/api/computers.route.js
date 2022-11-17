import express  from "express";
import ComputersCtrl from './computers.controller.js'
import ComponentsCtrl from './components.controller.js'
import ReviewsCtrl from "./reviews.controller.js";


const router = express.Router();

router.route("/").get(ComputersCtrl.apiGetComputers);
router.route("/id/:id").get(ComputersCtrl.apiGetComputerById);
router.route("/cpu").get(ComputersCtrl.apiGetComputerByCpu);

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    //.put(ComponentsCtrl.apiUpdateComponent)
    //.delete(ComponentsCtrl.apiDeleteComponent)


export default router;