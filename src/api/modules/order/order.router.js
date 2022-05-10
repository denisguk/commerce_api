import express from 'express';
import {verifyNonAuthUser} from "../../../middleware/auth";
import OrderController from "./order.controller";


const router = express.Router({mergeParams: true});


/**
 * Get or create order by user or user token
 */
router.get('/order/user',
    verifyNonAuthUser,
    OrderController.getByUser
);

/**
 * Doesnt' work
 */
router.put('/order/:id',
    verifyNonAuthUser,
    OrderController.update
);

/**
 * Adding shipping address to the order
 */
router.post('/order/:id/shippingAddress',
    verifyNonAuthUser,
    OrderController.addShippingAddress
);

/**
 * Adding Delivery method by delivery core to the order
 */
router.post('/order/:id/deliveryMethod',
    verifyNonAuthUser,
    OrderController.addDeliveryMethod
);

export default router;
