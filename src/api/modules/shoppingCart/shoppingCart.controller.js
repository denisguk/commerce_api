import ShoppingCartService from "./shoppingCart.service";
import shoppingCartTotal from "./shoppingCartTotal.service";
import ShoppingCartSerializer from "./shoppingCart.serializer";
import CouponService from "../coupon/coupon.service";
import {getRelations} from "../../../utils/relations";
import {fields} from "../../../entity";
import {CLIENT_ERROR_STATUSES, CLIENT_ERRORS, CLIENT_SUCCESS_STATUSES} from "../../../utils/responseCodes";


const ShoppingCartController = {

    getByUser: async (req, res) => {
        const {
            user,
            token,
            query
        } = req;

        try {
            const shoppingCart = await ShoppingCartService.findOrCreateByUser({
                relations: getRelations(query.relations),
                entity: {
                    [fields.ShoppingCart.user]: user?.id,
                    [fields.ShoppingCart.token]: token,
                },
                where: {
                    [fields.ShoppingCart.user]: user?.id,
                    [fields.ShoppingCart.token]: token,
                },
            });

            return res.send(ShoppingCartSerializer.shoppingCartToJSON(shoppingCart));
        } catch (error) {
            // TODO add correct handling for errors
            return res.send(error);
        }
    },

    addItem: async (req, res) => {
        const {
            body,
            shoppingCart
        } = req;

        const attrs = {
            [fields.ShoppingCartItem.variant]: body[fields.ShoppingCartItem.variant],
            [fields.ShoppingCartItem.quantity]: body[fields.ShoppingCartItem.quantity],
            [fields.ShoppingCartItem.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
        };

        try {
            const item = await ShoppingCartService.addItem(attrs);

            return res.send(ShoppingCartSerializer.shoppingCartItemToJSON(item))
        } catch (error) {
            // TODO add correct handling for errors
            return req.send(error);
        }
    },

    updateItem: async (req, res) => {
        const {
            body,
            params,
            shoppingCart
        } = req;

        try {
            const item = await ShoppingCartService.updateItem({
                where: {
                    [fields.ShoppingCartItem.id]: params.id,
                    [fields.ShoppingCartItem.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
                },
                entity: {
                    [fields.ShoppingCartItem.quantity]: body[fields.ShoppingCartItem.quantity]
                }
            });


            return res.send(ShoppingCartSerializer.shoppingCartItemToJSON(item))
        } catch (error) {
            // TODO add correct handling for errors
            return req.send(error);
        }
    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    removeItem: async (req, res) => {
        const {
            params,
            shoppingCart
        } = req;

        try {
            const where = {
                [fields.ShoppingCartItem.id]: params.id,
                [fields.ShoppingCartItem.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
            };

            const response = await ShoppingCartService.delete(where);

            return res
                .status(CLIENT_SUCCESS_STATUSES.NO_CONTENT)
                .json({
                    success: true,
                    affected: response.affected,
                });
        } catch (error) {
            // TODO add correct handling for errors
            return req.send(error);
        }
    },

    applyCoupon: async (req, res) => {
        const {
            params,
            shoppingCart
        } = req;

        try {
            const where = {
                [fields.Coupon.code]: params.code,
            };

            const coupon = await CouponService.findOne({
                where
            });

            const result = await shoppingCartTotal.applyCoupon(shoppingCart, coupon);

        } catch (e) {

        }
    },

    applyShipping: (req, res) => {

    },

    addTotal: (req, res) => {
    },
    updateTotal: (req, res) => {
    },
    removeTotal: (req, res) => {
    },
};

export default ShoppingCartController;

