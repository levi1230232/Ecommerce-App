import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrders, updateOrder, getAll} from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/create", requireSignIn, createOrder)
router.get("/getall", requireSignIn, getAllOrders);
router.get("/all", getAll);
router.put("/:id", requireSignIn, isAdmin, updateOrder);

export default router;
