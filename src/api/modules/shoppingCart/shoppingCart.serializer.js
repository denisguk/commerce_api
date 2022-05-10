import {fields} from '../../../entity/index';

const ShoppingCartSerializer = {

    /**
     * Returning serialized shopping cart
     * @param object
     * @returns {{[p: string]: *}}
     */
    shoppingCartToJSON: (object = {}) => {
        return {
            [fields.ShoppingCart.id]: object[fields.ShoppingCart.id],
            [fields.ShoppingCart.user]: object[fields.ShoppingCart.user],
            [fields.ShoppingCart.token]: object[fields.ShoppingCart.token],
            [fields.ShoppingCart.items]: ShoppingCartSerializer.shoppingCartItemsToJSON(object[fields.ShoppingCart.items]),
            [fields.ShoppingCart.totals]: ShoppingCartSerializer.shoppingCartTotalsToJSON(object[fields.ShoppingCart.totals]),
        };
    },

    /**
     *
     * @param item
     * @returns {{[p: string]: *}}
     */
    shoppingCartItemToJSON: (item) => {
        return {
            [fields.ShoppingCartItem.id]: item[fields.ShoppingCartItem.id],
            [fields.ShoppingCartItem.meta]: item[fields.ShoppingCartItem.meta],
            [fields.ShoppingCartItem.variant]: item[fields.ShoppingCartItem.variant],
            [fields.ShoppingCartItem.quantity]: item[fields.ShoppingCartItem.quantity],
            [fields.ShoppingCartItem.shoppingCart]: item[fields.ShoppingCartItem.shoppingCart],
        };
    },

    /**
     * TODO add serializer to variant
     * @param items
     * @returns {*}
     */
    shoppingCartItemsToJSON: (items = []) =>  {
        return items.map(ShoppingCartSerializer.shoppingCartItemToJSON);
    },

    shoppingCartTotalsToJSON: (totals = []) =>  {
        return totals.map((total) => ({
            [fields.ShoppingCartTotal.id]: total[fields.ShoppingCartTotal.id],
            [fields.ShoppingCartTotal.name]: total[fields.ShoppingCartTotal.name],
            [fields.ShoppingCartTotal.value]: total[fields.ShoppingCartTotal.value],
            [fields.ShoppingCartTotal.rawValue]: total[fields.ShoppingCartTotal.rawValue],
            [fields.ShoppingCartTotal.shoppingCart]: total[fields.ShoppingCartTotal.shoppingCart],
        }))
    },
}

export default ShoppingCartSerializer;
