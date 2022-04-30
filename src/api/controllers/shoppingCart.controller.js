import {getRepository} from "typeorm";
import {entities, fields} from '../../entity';
import {verifyToken} from "../../middleware/auth";
import {ShoppingCartItem} from "../../entity/ShoppingCart/ShoppingCartItem";
import {getRelations} from "../../utils/relations";

module.exports = (router) => {

    /**
     * Create or return new shopping cart based on user
     */
    router.get('/shopping_cart/user',
        verifyToken,
        async (req, res) => {
            let {relations} = req.query;
            const {user} = req;
            const repository = getRepository(entities.ShoppingCart);

            const conditions = {
                [fields.ShoppingCart.user]: user.id
            };

            const shoppingCart = await repository.findOne(
                conditions,
                {
                    relations: getRelations(relations),
                }
            );

            if (shoppingCart) {
                return res.json(shoppingCart);
            }

            return res.json(
                await repository.save(
                    conditions,
                    {
                        relations: getRelations(relations),
                    }
                )
            );
        });

    /**
     * Add new item to the shopping cart
     */
    router.post(
        '/shopping_cart/:shoppingCartId/item',
        verifyToken,
        async (req, res) => {
            const {
                body,
                user
            } = req;

            const repository = getRepository(entities.ShoppingCart);
            const repositoryItem = getRepository(entities.ShoppingCartItem);

            const conditions = {
                [fields.ShoppingCart.user]: user.id
            };

            const shoppingCart = await repository.findOne(conditions);

            if (!shoppingCart) {
                return res.status(404).json({
                    code: "NOT_FOUND",
                    message: "Sorry shopping cart is not found"
                });
            }

            const response = await repositoryItem.insert({
                [fields.ShoppingCartItem.quantity]: body[fields.ShoppingCartItem.quantity],
                [fields.ShoppingCartItem.variant]: body[fields.ShoppingCartItem.variant],
                [fields.ShoppingCartItem.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
            });

            return res
                .status(201)
                .json({
                    [fields.ShoppingCartItem.quantity]: body[fields.ShoppingCartItem.quantity],
                    [fields.ShoppingCartItem.variant]: body[fields.ShoppingCartItem.variant],
                    [fields.ShoppingCartItem.shoppingCart]: shoppingCart[fields.ShoppingCart.id],
                    [fields.ShoppingCartItem.id]: response.raw.insertId
                });
        });

    /**
     * Update item in the shopping cart
     */
    router.put(
        '/shopping_cart/:shoppingCartId/item/:id',
        verifyToken,
        async (req, res) => {
            const {
                body,
                params,
                user
            } = req;

            const repository = getRepository(entities.ShoppingCart);
            const repositoryItem = getRepository(entities.ShoppingCartItem);
            const conditions = {
                [fields.ShoppingCart.user]: user.id
            };

            const shoppingCart = await repository.findOne(conditions);

            if (!shoppingCart) {
                return res.status(404).json({
                    code: "NOT_FOUND",
                    message: "Sorry shopping cart is not found"
                });
            }

            const response = await repositoryItem.update({
                [fields.ShoppingCartItem.id]: params.id,
                [fields.ShoppingCartItem.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
            }, {
                [fields.ShoppingCartItem.quantity]: body[fields.ShoppingCartItem.quantity],
            });

            return res.status(200).json({
                success: true,
                affected: response.affected,
            });
        });


    /**
     * Delete Product Item from the Shopping Cart
     */
    router.delete(
        '/shopping_cart/:shoppingCartId/item/:id',
        verifyToken,
        async (req, res) => {
            const {
                params,
                user
            } = req;

            const repository = getRepository(entities.ShoppingCart);
            const repositoryItem = getRepository(entities.ShoppingCartItem);
            const conditions = {
                [fields.ShoppingCart.user]: user.id
            };

            const shoppingCart = await repository.findOne(conditions);
            const response = await repositoryItem.delete({
                [fields.ShoppingCartItem.id]: params.id,
                [fields.ShoppingCartItem.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
            });

            return res.status(200).json({
                success: true,
                affected: response.affected,
            });
        });

    return router;
}



