import express from "express";
import session from "express-session";
import morgan from "morgan";
import color from "colors";
import dotenv from "dotenv";
import passport from "passport";
import authRouter from "./routes/authRoute.js"; 
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import product_categoriesRoutes from "./routes/product_categoriesRoutes.js";
import cart_productsRoutes from "./routes/cart_productRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import cors from "cors"
dotenv.config();
const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/products_categories", product_categoriesRoutes);
app.use("/cart_products", cart_productsRoutes);
app.use("/orders", ordersRoutes);
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Ecommerce app</h1>")
})
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`.bgCyan.white)
})
