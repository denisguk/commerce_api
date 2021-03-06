import * as ShoppingCartModel from "./ShoppingCart/ShoppingCart";
import * as ShoppingCartItemModel from "./ShoppingCart/ShoppingCartItem";
import * as ShoppingCartTotalModel from "./ShoppingCart/ShoppingCartTotal";
import * as DeliveryModel from "./Delivery/Delivery";
import * as CouponModel from "./Coupon/Coupon"
import * as OrderModel from "./Order/Order"
import * as OrderShippingAddressModel from "./Order/OrderShippingAddress"
import * as UserModel from "./User/User"
import * as PasswordRecoveryModel from "./User/PasswordRecovery"
import * as ProductVariantModel from "./Product/ProductVariant"

const entities = {
    // User entities
    User: UserModel.User,
    PasswordRecovery: PasswordRecoveryModel.PasswordRecovery,

    // Product entities
    ProductVariant: ProductVariantModel.ProductVariant,

    // Shopping cart entities
    ShoppingCart: ShoppingCartModel.ShoppingCart,
    ShoppingCartItem: ShoppingCartItemModel.ShoppingCartItem,
    ShoppingCartTotal: ShoppingCartTotalModel.ShoppingCartTotal,

    // Info entities
    Delivery: DeliveryModel.Delivery,
    Coupon: CouponModel.Coupon,

    // Order entities
    Order: OrderModel.Order,
    OrderShippingAddress: OrderShippingAddressModel.OrderShippingAddress
};

const fields = {
    // User entities
    User: UserModel.fields,
    PasswordRecovery: PasswordRecoveryModel.fields,

    // Product entities
    ProductVariant: ProductVariantModel.fields,

    // Shopping cart entities
    ShoppingCart: ShoppingCartModel.fields,
    ShoppingCartItem: ShoppingCartItemModel.fields,
    ShoppingCartTotal: ShoppingCartTotalModel.fields,

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
