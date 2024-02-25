import db from "../models/db.js";

export const addProductToCategory = async (req, res) => {
    try {
        const { productId, categoryId } = req.body;
        const productExists = await db.query("SELECT * FROM products WHERE id = $1", [productId]);
        const categoryExists = await db.query("SELECT * FROM categories WHERE id = $1", [categoryId]);

        if (productExists.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (categoryExists.rows.length === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        const existingProductCategory = await db.query("SELECT * FROM product_categories WHERE product_id = $1 AND category_id = $2", [productId, categoryId]);
        if (existingProductCategory.rows.length > 0) {
            return res.status(400).json({ error: "Product already exists in the category" });
        }
        await db.query("INSERT INTO product_categories (product_id, category_id) VALUES ($1, $2)", [productId, categoryId]);

        res.status(201).json({ message: "Product added to category successfully" });
    } catch (error) {
        console.error("Error adding product to category:", error);
        res.status(500).json({ error: "An error occurred while adding product to category" });
    }
};

export const removeProductFromCategory = async (req, res) => {
    try {
        const { productId, categoryId } = req.body;
        const productExists = await db.query("SELECT * FROM products WHERE id = $1", [productId]);
        const categoryExists = await db.query("SELECT * FROM categories WHERE id = $1", [categoryId]);

        if (productExists.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (categoryExists.rows.length === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        await db.query("DELETE FROM product_categories WHERE product_id = $1 AND category_id = $2", [productId, categoryId]);

        res.status(200).json({ message: "Product removed from category successfully" });
    } catch (error) {
        console.error("Error removing product from category:", error);
        res.status(500).json({ error: "An error occurred while removing product from category" });
    }
};


export const getProductsByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await db.query(
            `SELECT p.*
            FROM products p
            INNER JOIN product_categories pc ON p.id = pc.product_id
            WHERE pc.category_id = $1`,
            [categoryId]
        );

        res.status(200).json({ products: products.rows });
    } catch (error) {
        console.error("Error getting products by category:", error);
        res.status(500).json({ error: "An error occurred while getting products by category" });
    }
};