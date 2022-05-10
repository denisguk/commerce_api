import {param, body} from "express-validator";
import {fields} from '../../../entity';

const getShoppingCartItemAdd = [
    body(fields.ShoppingCartItem.variant).isInt().notEmpty(),
    body(fields.ShoppingCartItem.quantity).isNumeric().notEmpty(),
];

const getShoppingCartItemUpdate = [
    param(fields.ShoppingCartItem.id).isInt().notEmpty(),
    body(fields.ShoppingCartItem.quantity).isNumeric().notEmpty(),
];

const getShoppingCartItemDelete = [
    param(fields.ShoppingCartItem.id).isInt().notEmpty(),
];

export {
    getShoppingCartItemAdd,
    getShoppingCartItemUpdate,
    getShoppingCartItemDelete
};
