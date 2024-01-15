import express from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import AuthController from "./authentication.controller.js";

const router = express.Router();

router.route("/signup").post(AuthController.apiPostSignup);
router.route("/login").post(AuthController.apiPostLogin);

router.route("/").post(AuthMiddleware.userVerification);

export default router;