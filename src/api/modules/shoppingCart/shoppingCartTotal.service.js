import {entities} from "../../../entity";

const ShoppingCartTotalService = {

    applyCoupon: (shoppingCart, coupon) => {
        const total =  new entities.ShoppingCartTotal();

        shoppingCart.totals.push(total);


    },
};

export default ShoppingCartTotalService;
