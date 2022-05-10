import express from 'express';
import {verifyNonAuthUser} from "../../../middleware/auth";
import ShoppingCartController from "./shoppingCart.controller";


const router = express.Router({mergeParams: true});

router.get(
    'v2/shopping_cart/user',
    verifyNonAuthUser,
    ShoppingCartController.getByUser
);

router.get(
    'v2/shopping_cart/user',
    verifyNonAuthUser,
    ShoppingCartController.getByUser
);


module.exports = router;
