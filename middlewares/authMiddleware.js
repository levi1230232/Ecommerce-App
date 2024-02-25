import jwt from "jsonwebtoken";
import db from "../models/db.js";

export const requireSignIn = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: "Unauthorized Access: Token is missing" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ success: false, error: "Unauthorized Access: Invalid token" });
  }
};

export const isAdmin = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1]; 
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      const user = await db.query("SELECT role FROM users WHERE id = $1", [userId]);
      if (user.rows[0].role !== 1) {
        return res.status(401).json({ success: false, message: "Unauthorized Access" });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false, message: "Unauthorized Access" });
    }
  };
