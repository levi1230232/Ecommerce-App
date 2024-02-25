import express from "express";
import { registerControllers, loginController, getUser } from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerControllers);
router.post("/login", loginController);
router.get('/userinfo', requireSignIn,getUser);

export default router;
