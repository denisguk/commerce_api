import OrderService from "./order.service";
import {fields} from "../../../entity";
import OrderSerializer from "./order.serializer";
import ShoppingCartService from "../shoppingCart/shoppingCart.service";
import {CLIENT_ERROR_STATUSES} from "../../../utils/responseCodes";


const OrderController = {

    /**
     * Returning order by user or token
     * @param req
     * @param res
     */
    getByUser: async (req, res) => {
        const {
            user,
            token,
            query
        } = req;

        try {
            const shoppingCart = await ShoppingCartService.findByUser({
                user,
                token
            });

            const order = await OrderService.findOrCreate({
                relations: query.relations,
                entity: {
                    [fields.Order.shoppingCart]: shoppingCart[fields.ShoppingCart.id],
                },
                where: {
                    [fields.Order.shoppingCart]: shoppingCart[fields.ShoppingCart.id],
                },
            });

            return res.send(OrderSerializer.orderToJSON(order));
        } catch (error) {
            return res
                .status(CLIENT_ERROR_STATUSES.SERVER_ERROR)
                .send({
                    message: error.toString(),
                    stack: error.stack
                });
        }
    },

    /**
     * Add new shipping address to order based on token or user
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    addShippingAddress: async (req, res) => {
        const {
            user,
            token,
            query,
            body
        } = req;

        try {
            const shoppingCart = await ShoppingCartService.findByUser({
                user,
                token
            });

            const result = await OrderService.addShippingAddress({
                relations: query.relations,
                where: {
                    [fields.Order.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
                },
                shippingAddress: {
                    [fields.OrderShippingAddress.firstName]: body[fields.OrderShippingAddress.firstName],
                    [fields.OrderShippingAddress.lastName]: body[fields.OrderShippingAddress.lastName],
                    [fields.OrderShippingAddress.zipcode]: body[fields.OrderShippingAddress.zipcode],
                    [fields.OrderShippingAddress.address]: body[fields.OrderShippingAddress.address],
                    [fields.OrderShippingAddress.country]: body[fields.OrderShippingAddress.country],
                    [fields.OrderShippingAddress.extra]: body[fields.OrderShippingAddress.extra],
                    [fields.OrderShippingAddress.city]: body[fields.OrderShippingAddress.city],
                    [fields.OrderShippingAddress.suite]: body[fields.OrderShippingAddress.suite],
                }
            });

            return res.send(OrderSerializer.orderToJSON(result));
        } catch (error) {
            return res
                .status(CLIENT_ERROR_STATUSES.SERVER_ERROR)
                .send({
                    message: error.toString(),
                    stack: error.stack
                });
        }
    },

    addDeliveryMethod: async (req, res) => {
        const {
            user,
            token,
            query,
            body
        } = req;


        try {
            const shoppingCart = await ShoppingCartService.findByUser({
                user,
                token
            });

            const result = await OrderService.addDeliveryMethod({
                relations: query.relations,
                method: {
                    [fields.Delivery.code]: body[fields.Delivery.code],
                },
                where: {
                    [fields.Order.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
                }
            });

            return res.send(OrderSerializer.orderToJSON(result));
        } catch (error) {
            res
                .status(CLIENT_ERROR_STATUSES.SERVER_ERROR)
                .send({
                    message: error.toString(),
                    stack: error.stack
                });
        }
    },

    /**
     *
     */
    update: async (req, res) => {
        res.send('Method is not implemented yet');
    },
};

export default OrderController;

