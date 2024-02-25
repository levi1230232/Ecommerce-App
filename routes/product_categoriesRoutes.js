import express from "express";
import { addProductToCategory, getProductsByCategoryId } from "../controllers/product_categoriesController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", requireSignIn, isAdmin, addProductToCategory);
router.get('/:categoryId', getProductsByCategoryId);

export default router;
