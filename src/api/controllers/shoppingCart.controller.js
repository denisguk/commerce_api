import {getRepository} from "typeorm";
import {entities, fields} from '../../entity';
import * as validators from '../modules/shoppingCart/shoppingCart.validator';
import {verifyNonAuthUser} from "../../middleware/auth";
import {getRelations} from "../../utils/relations";
import {CLIENT_ERROR_STATUSES, CLIENT_ERRORS, CLIENT_SUCCESS_STATUSES} from '../../utils/responseCodes';
import {validate} from "../../middleware/validation-result";

module.exports = (router) => {

    /**
     * Create or return new shopping cart based on user
     */
    router.get('/shopping_cart/user',
        verifyNonAuthUser,
        async (req, res) => {
            let {relations} = req.query;
            const {user, token} = req;
            const repository = getRepository(entities.ShoppingCart);
            const conditions = getUserConditions(user, token);

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
        verifyNonAuthUser,
        validate(validators.getShoppingCartItemAdd),
        async (req, res) => {
            const {
                body,
                user,
                token
            } = req;

            const repository = getRepository(entities.ShoppingCart);
            const repositoryItem = getRepository(entities.ShoppingCartItem);
            const conditions = getUserConditions(user, token);

            const shoppingCart = await repository.findOne(conditions, {
                relations: [
                    fields.ShoppingCart.items,
                    `${fields.ShoppingCart.items}.${fields.ShoppingCartItem.variant}`
                ]
            });

            if (!shoppingCart) {
                return res
                    .status(CLIENT_ERROR_STATUSES.NOT_FOUND)
                    .json(CLIENT_ERRORS[CLIENT_ERROR_STATUSES.NOT_FOUND](entities.ShoppingCart));
            }

            const hasConflict = shoppingCart.items.some((item) => {
                return (item.variant?.id === body[fields.ShoppingCartItem.variant])
            });

            if (hasConflict) {
                return res
                    .status(CLIENT_ERROR_STATUSES.CONFLICT)
                    .json(CLIENT_ERRORS[CLIENT_ERROR_STATUSES.CONFLICT](entities.ShoppingCartItem));
            }

            const response = await repositoryItem.insert({
                [fields.ShoppingCartItem.quantity]: body[fields.ShoppingCartItem.quantity],
                [fields.ShoppingCartItem.variant]: body[fields.ShoppingCartItem.variant],
                [fields.ShoppingCartItem.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
            });

            return res
                .status(CLIENT_SUCCESS_STATUSES.CREATED)
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
        verifyNonAuthUser,
        validate(validators.getShoppingCartItemUpdate),
        async (req, res) => {
            const {
                body,
                params,
                user
            } = req;

            const repository = getRepository(entities.ShoppingCart);
            const repositoryItem = getRepository(entities.ShoppingCartItem);
            const conditions = getUserConditions(user, token);

            const shoppingCart = await repository.findOne(conditions);

            if (!shoppingCart) {
                return res
                    .status(CLIENT_ERROR_STATUSES.NOT_FOUND)
                    .json(CLIENT_ERRORS[CLIENT_ERROR_STATUSES.NOT_FOUND](entities.ShoppingCart));
            }

            const response = await repositoryItem.update({
                [fields.ShoppingCartItem.id]: params.id,
                [fields.ShoppingCartItem.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
            }, {
                [fields.ShoppingCartItem.quantity]: body[fields.ShoppingCartItem.quantity],
            });

            return res
                .status(CLIENT_SUCCESS_STATUSES.SUCCESS)
                .json({
                    success: true,
                    affected: response.affected,
                });
        });


    /**
     * Delete Product Item from the Shopping Cart
     */
    router.delete(
        '/shopping_cart/:shoppingCartId/item/:id',
        verifyNonAuthUser,
        validate(validators.getShoppingCartItemDelete),
        async (req, res) => {
            const {
                token,
                params,
                user
            } = req;

            const repository = getRepository(entities.ShoppingCart);
            const repositoryItem = getRepository(entities.ShoppingCartItem);
            const conditions = getUserConditions(user, token);

            const shoppingCart = await repository.findOne(conditions);

            if (!shoppingCart) {
                return res
                    .status(CLIENT_ERROR_STATUSES.NOT_FOUND)
                    .json(CLIENT_ERRORS[CLIENT_ERROR_STATUSES.NOT_FOUND](entities.ShoppingCart));
            }

            const response = await repositoryItem.delete({
                [fields.ShoppingCartItem.id]: params.id,
                [fields.ShoppingCartItem.shoppingCart]: shoppingCart[fields.ShoppingCart.id]
            });

            return res
                .status(CLIENT_SUCCESS_STATUSES.NO_CONTENT)
                .json({
                    success: true,
                    affected: response.affected,
                });
        });

    return router;
}


function getUserConditions(user, token) {
    return (user)
        ? { [fields.ShoppingCart.user]: user.id }
        : { [fields.ShoppingCart.token]: token }
}



