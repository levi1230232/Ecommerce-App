import express from "express";
import { addToCart, removeFromCart, getCartItems, checkout} from "../controllers/cart_productController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", requireSignIn, addToCart);
router.delete("/remove/:product_id", requireSignIn, removeFromCart);
router.delete("/checkout", requireSignIn, checkout);
router.get('/cart_items', requireSignIn, getCartItems);



export default router;
