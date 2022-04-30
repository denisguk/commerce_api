import * as ShoppingCartModel from "./ShoppingCart/ShoppingCart";
import * as ShoppingCartItemModel from "./ShoppingCart/ShoppingCartItem";
import * as DeliveryModel from "./Delivery/Delivery";
import * as CouponModel from "./Coupon/Coupon"
import * as OrderModel from "./Order/Order"
import * as OrderShippingAddressModel from "./Order/OrderShippingAddress"

const entities = {
    // Shopping cart entities
    ShoppingCart: ShoppingCartModel.ShoppingCart,
    ShoppingCartItem: ShoppingCartItemModel.ShoppingCartItemModel,

    // Info entities
    Delivery: DeliveryModel.Delivery,
    Coupon: CouponModel.Coupon,

    // Order entities
    Order: OrderModel.Order,
    OrderShippingAddress: OrderShippingAddressModel.OrderShippingAddress
};


const fields = {
    // Shopping cart entities
    ShoppingCart: ShoppingCartModel.fields,
    ShoppingCartItem: ShoppingCartItemModel.fields,

    // Info entities
    Delivery: DeliveryModel.fields,
    Coupon: CouponModel.fields,

    // Order entities
    Order: OrderModel.fields,
    OrderShippingAddress: OrderShippingAddressModel.fields
};

export {
    entities,
    fields
}
