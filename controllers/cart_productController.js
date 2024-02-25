import db from "../models/db.js";

export const addToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        const existingCartItem = await db.query("SELECT * FROM cart_products WHERE user_id = $1 AND product_id = $2", [user_id, product_id]);
        
        if (existingCartItem.rows.length > 0) {
            const updatedQuantity = existingCartItem.rows[0].quantity + quantity;
            await db.query("UPDATE cart_products SET quantity = $1 WHERE user_id = $2 AND product_id = $3", [updatedQuantity, user_id, product_id]);
            return res.status(200).json({ message: "Product quantity updated in cart" });
        } else {
            await db.query("INSERT INTO cart_products (user_id, product_id, quantity) VALUES ($1, $2, $3)", [user_id, product_id, quantity]);
            return res.status(201).json({ message: "Product added to cart" });
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ error: "An error occurred while adding product to cart" });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { user_id } = req.query; 
        const { product_id } = req.params;
        await db.query("DELETE FROM cart_products WHERE user_id = $1 AND product_id = $2", [user_id, product_id]);
        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ error: "An error occurred while removing product from cart" });
    }
};

export const getCartItems = async (req, res) => {
    try {
        const { user_id } = req.query;
        const cartItems = await db.query(`
            SELECT cp.*, p.name AS product_name, p.price AS product_price, p.image AS product_image
            FROM cart_products AS cp
            JOIN products AS p ON cp.product_id = p.id
            WHERE cp.user_id = $1
        `, [user_id]);

        res.status(200).json({ cartItems: cartItems.rows });
    } catch (error) {
        console.error("Error getting cart items:", error);
        res.status(500).json({ error: "An error occurred while getting cart items" });
    }
};

export const checkout = async (req, res) => {
    try {
      const { user_id } = req.query;
      await db.query("DELETE FROM cart_products WHERE user_id = $1", [user_id]);
  
      res.status(200).json({ message: "Checkout successful. All items removed from cart." });
    } catch (error) {
      console.error("Error during checkout:", error);
      res.status(500).json({ error: "An error occurred during checkout" });
    }
  };