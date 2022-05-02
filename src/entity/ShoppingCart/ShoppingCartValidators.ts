import * as ShoppingCartItem from "./ShoppingCartItem";
import {param, body} from "express-validator";

const getShoppingCartItemAdd = [
    body(ShoppingCartItem.fields.variant).isInt().notEmpty(),
    body(ShoppingCartItem.fields.quantity).isNumeric().notEmpty(),
];

const getShoppingCartItemUpdate = [
    param(ShoppingCartItem.fields.id).isInt().notEmpty(),
    body(ShoppingCartItem.fields.quantity).isNumeric().notEmpty(),
];

const getShoppingCartItemDelete = [
    param(ShoppingCartItem.fields.id).isInt().notEmpty(),
];

export {
    getShoppingCartItemAdd,
    getShoppingCartItemUpdate,
    getShoppingCartItemDelete
};
