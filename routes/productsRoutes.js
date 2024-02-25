import express from "express";
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById} from "../controllers/productController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', requireSignIn, isAdmin, createProduct);
router.put('/products/:id', requireSignIn, isAdmin, updateProduct);
router.delete('/products/:id', requireSignIn, isAdmin, deleteProduct);

export default router;
