import * as ShoppingCartModel from "./ShoppingCart/ShoppingCart";
import * as ShoppingCartItemModel from "./ShoppingCart/ShoppingCartItem";

const entities = {
    ShoppingCart: ShoppingCartModel.ShoppingCart,
    ShoppingCartItem: ShoppingCartItemModel.ShoppingCartItemModel,
};


const fields = {
    ShoppingCart: ShoppingCartModel.fields,
    ShoppingCartItem: ShoppingCartItemModel.fields,
};

export {
    entities,
    fields
}
