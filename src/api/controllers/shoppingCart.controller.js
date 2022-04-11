import {getRepository, getConnection} from "typeorm";
import {ShoppingCart} from '../../entity/ShoppingCart/ShoppingCart';
import {ProductVariant} from '../../entity/Product/ProductVariant';
import {verifyToken} from "../../middleware/auth";
import {ShoppingCartItem} from "../../entity/ShoppingCart/ShoppingCartItem";

module.exports = (router) => {

    /**
     * Create or return new shopping cart based on user
     */
    router.get('/shopping_cart/user',
        verifyToken,
        async (req, res) => {
            const {user} = req;
            const ShoppingCartRepository = getRepository(ShoppingCart);

            let shoppingCart = await ShoppingCartRepository.findOne({user: user.id});

            if (!shoppingCart) {
                shoppingCart = await ShoppingCartRepository.save({
                    user: user.id,
                });
            }

            return res.json(shoppingCart);
        });

    /**
     * Add new item to the shopping cart
     */
    router.post(
        '/shopping_cart/:id/item',
        verifyToken,
        async (req, res) => {
            const {body, user} = req;

            const ShoppingCartRepository = getRepository(ShoppingCart);
            const ShoppingCartItemRepository = getRepository(ShoppingCartItem);

            const shoppingCart = await ShoppingCartRepository.findOne({user: user.id});
            const response = await ShoppingCartItemRepository.insert({
                quantity: body.quantity,
                variant: body.variantId,
                shoppingCart: shoppingCart.id
            });

            return res
                .status(201)
                .json({
                    quantity: body.quantity,
                    variant: body.variantId,
                    shoppingCart: shoppingCart.id,
                    id: response.raw.insertId
                });
        });

    /**
     * Update item in the shopping cart
     */
    router.put(
        '/shopping_cart/:id/item/:itemId',
        verifyToken,
        async (req, res) => {
            const {body, params, user} = req;

            const ShoppingCartRepository = getRepository(ShoppingCart);
            const ShoppingCartItemRepository = getRepository(ShoppingCartItem);

            const shoppingCart = await ShoppingCartRepository.findOne({user: user.id});
            const response = await ShoppingCartItemRepository.update({
                id: params.itemId,
                shoppingCart: shoppingCart.id
            },  {
                quantity: body.quantity,
            });

            return res.status(200).json({
                success:  true,
                affected: response.affected,
            });
        });

    return router;
}



