import express from "express";
import authController from "../api/controllers/auth.controller";
import userController from "../api/controllers/user.controller";
import categoryController from "../api/controllers/category.controller";
import productController from "../api/controllers/product.controller";
import shoppingCartController from "../api/controllers/shoppingCart.controller";

const router = express.Router();

module.exports = app => {

    app.get("/", (req, res) => {
        res.json({message: "Welcome to eCommerce API"});
    });

    app.use('/api', authController(router));
    app.use('/api', userController(router));
    app.use('/api', categoryController(router));
    app.use('/api', productController(router));
    app.use('/api', shoppingCartController(router));
};
