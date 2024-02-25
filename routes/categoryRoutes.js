import express from "express";
import { createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById} from "../controllers/categoryControllers.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/categories', getAllCategories); 
router.get('/category/:id', getCategoryById);
router.post('/createCategory', requireSignIn, isAdmin, createCategory);
router.put('/updateCategory/:id', requireSignIn, isAdmin, updateCategory);
router.delete('/deleteCategory/:id', requireSignIn, isAdmin, deleteCategory);

export default router;