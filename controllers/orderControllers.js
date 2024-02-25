import db from "../models/db.js";

export const createOrder = async (req, res) => {
    try {
        const { total_cost, description } = req.body;
        const { user_id } = req.query;
        const newOrder = await db.query('INSERT INTO orders (user_id, total_cost, status, description) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, total_cost, 'pending', description]);         res.status(201).json({ message: "Order created successfully", order: newOrder.rows[0] });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "An error occurred while creating order" });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const { user_id } = req.query;
        const orders = await db.query("SELECT * FROM orders WHERE user_id = $1", [user_id]);
        res.status(200).json({ orders: orders.rows });
    } catch (error) {
        console.error("Error getting orders for user:", error);
        res.status(500).json({ error: "An error occurred while getting orders for user" });
    }
};
export const getAll = async (req, res) => {
    try {
        const orders = await db.query("SELECT * FROM orders");
        res.status(200).json({ orders: orders.rows });
    } catch (error) {
        console.error("Error getting orders for user:", error);
        res.status(500).json({ error: "An error occurred while getting orders for user" });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const updatedOrder = await db.query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [status, orderId]);
        res.status(200).json({ message: "Order updated successfully", order: updatedOrder.rows[0] });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "An error occurred while updating order" });
    }
};

