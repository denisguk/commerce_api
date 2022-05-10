import {fields} from '../../../entity/index';
import ShoppingCartSerializer from "../shoppingCart/shoppingCart.serializer";

const OrderSerializer = {

    /**
     * Returning serialized order
     * @param object
     */
    orderToJSON: (object) => {
        return {
            [fields.Order.id]: object[fields.Order.id],
            [fields.Order.status]: object[fields.Order.status],
            [fields.Order.shoppingCart]: ShoppingCartSerializer.shoppingCartToJSON(object[fields.Order.shoppingCart]),
            [fields.Order.deliveryMethod]: object[fields.Order.deliveryMethod],
            [fields.Order.shippingAddress]: OrderSerializer.shippingAddressToJSON(object[fields.Order.shippingAddress]),
        };
    },

    /**
     *
     * @param object
     */
    shippingAddressToJSON: (object) => {
        if (!object) {
            return {};
        }

        return {
            [fields.OrderShippingAddress.id]: object[fields.OrderShippingAddress.id],
            [fields.OrderShippingAddress.city]: object[fields.OrderShippingAddress.city],
            [fields.OrderShippingAddress.suite]: object[fields.OrderShippingAddress.suite],
            [fields.OrderShippingAddress.extra]: object[fields.OrderShippingAddress.extra],
            [fields.OrderShippingAddress.zipcode]: object[fields.OrderShippingAddress.zipcode],
            [fields.OrderShippingAddress.address]: object[fields.OrderShippingAddress.address],
            [fields.OrderShippingAddress.country]: object[fields.OrderShippingAddress.country],
            [fields.OrderShippingAddress.firstName]: object[fields.OrderShippingAddress.firstName],
            [fields.OrderShippingAddress.lastName]: object[fields.OrderShippingAddress.lastName],
        };
    },
}

export default OrderSerializer;
