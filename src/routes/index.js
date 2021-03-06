import express from "express";
import authController from "../api/controllers/auth.controller";
import userController from "../api/controllers/user.controller";
import categoryController from "../api/controllers/category.controller";
import commentController from "../api/controllers/comment.controller";
import productController from "../api/controllers/product.controller";
import shoppingCartController from "../api/controllers/shoppingCart.controller";
import deliveryController from "../api/controllers/delivery.controller";
import couponController from "../api/controllers/coupon.controller";
import orderRouter from '../api/modules/order/order.router';

const router = express.Router();

module.exports = app => {

    app.get("/", (req, res) => {
        res.json({message: "Welcome to eCommerce API"});
    });

    app.use('/api', authController(router));
    app.use('/api', userController(router));
    app.use('/api', categoryController(router));
    app.use('/api', commentController(router));
    app.use('/api', productController(router));
    app.use('/api', shoppingCartController(router));
    app.use('/api', orderRouter)
 //   app.use('/api', orderController(router));
 //   app.use('/api', orderShippingAddressController(router));
    app.use('/api', deliveryController(router));
    app.use('/api', couponController(router));
};
