import db from "../models/db.js";

export const createProduct = async (req, res) => {
    try{
        const { name, price, image, short_description, long_description, rating_count } = req.body;
        if (!name || !price || !image) {
            return res.status(400).json({ error: "Name, price, and image are required" });
        }
        const newProduct = await db.query(
            'INSERT INTO products (name, price, image, short_description, long_description, rating_count) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, price, image, short_description, long_description, rating_count]
        );
        return res.status(201).json({messaage: "Product create successfully", product: newProduct.rows[0]});
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error creating product:", error);
        res.status(500).json({ error: "An error occurred while creating product" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, image, short_description, long_description, rating_count } = req.body;

        // Xây dựng một object chứa các trường dữ liệu cần cập nhật
        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (price) updatedFields.price = price;
        if (image) updatedFields.image = image;
        if (short_description) updatedFields.short_description = short_description;
        if (long_description) updatedFields.long_description = long_description;
        if (rating_count) updatedFields.rating_count = rating_count;

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ error: "No fields provided for update" });
        }

        const updatedProduct = await db.query(
            'UPDATE products SET name = COALESCE($1, name), price = COALESCE($2, price), image = COALESCE($3, image), short_description = COALESCE($4, short_description), long_description = COALESCE($5, long_description), rating_count = COALESCE($6, rating_count) WHERE id = $7 RETURNING *',
            [updatedFields.name, updatedFields.price, updatedFields.image, updatedFields.short_description, updatedFields.long_description, updatedFields.rating_count, productId]
        );

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct.rows[0] });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "An error occurred while updating product" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await db.query('DELETE FROM products WHERE id = $1', [productId]);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "An error occurred while deleting product" });
    }
};


export const getAllProducts = async (req, res) => {
    try{
        const products = await db.query("SELECT * FROM products");
        return res.status(200).json({ product: products.rows });
    }
    catch(error){
        console.log("Error getting all products", error);
        return res.status(500).json({ error: "An error occurred while getting all products" });
    }
};

export const getProductById = async (req, res) => {
    try{
        const id = req.params.id;
        const product = await db.query("SELECT * FROM products where id = $1", [id]);
        if (product.rows.length === 0) {
            return res.status(404).json({ error: "product not found" });
        }

        res.status(200).json({ product: product.rows[0] });
    }
    catch (error) {
        console.error("Error getting product by ID:", error);
        res.status(500).json({ error: "An error occurred while getting product by ID" });
    }

};