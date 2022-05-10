import {getRelations} from "../../../utils/relations";
import {getRepository} from "typeorm";
import {entities, fields} from "../../../entity";

const ShoppingCartService = {

    /**
     *
     * @param params
     * @returns {Promise<ShoppingCart|undefined>}
     */
    findOrCreateByUser: async (params) => {
        const {
            where,
            entity,
            relations,
        } = params;

        const shoppingCart = await ShoppingCartService.findOne({
            select: [fields.ShoppingCart.id],
            where: where,
        });

        if (!shoppingCart) {
            await ShoppingCartService.save(entity)
        }

        return ShoppingCartService.findOne({
            where: where,
            relations: relations,
        });
    },

    /**
     *
     * @param params
     * @returns {Promise<ShoppingCart | undefined>}
     */
    findByUser: (params) => {
        const {
            user,
            token,
            select = Object.values(fields.ShoppingCart),
            relations
        } = params;

        const repository = getRepository(entities.ShoppingCart);

        return repository.findOne(
            getUserConditions(user, token),
            {
                relations: getRelations(relations),
                select
            }
        );
    },

    /**
     *
     * @param params
     * @returns {Promise<ShoppingCart | undefined>}
     */
    findOne(params) {
        const {
            where,
            select = Object.values(fields.ShoppingCart),
            relations
        } = params;

        const repository = getRepository(entities.ShoppingCart);

        return repository.findOne(
            {...where},
            {
                relations: getRelations(relations),
                select
            }
        );
    },

    /**
     *
     * @param params
     * @returns {Promise<(DeepPartial<ShoppingCart> & ShoppingCart)[]>}
     */
    save(params) {
        const {
            entity
        } = params;

        const repository = getRepository(entities.ShoppingCart);

        return repository.save(entity)
    },


    /**
     *
     * @param params
     * @returns {Promise<(DeepPartial<ShoppingCartItem> & ShoppingCartItem)[]>}
     */
    addItem: async (params) => {
        const {
            entity,
            shoppingCart,
        } = params;

        if (shoppingCart.items.some(isConflicted)) {
            throw new Error("This item is already exist");
        }

        const repository = getRepository(entities.ShoppingCartItem);

        return repository.save(entity);

        function isConflicted(item) {
            return item[fields.ShoppingCartItem.variant]?.[fields.ProductVariant.id] === entity[fields.ShoppingCartItem.variant]
        }
    },

    updateItem: async (params) => {
        const {
            entity,
            where,
        } = params;

        const repository = getRepository(entities.ShoppingCartItem);

        const response = await repository.update(where, entity);
    },

    deleteItem: (where) => {
        const repository = getRepository(entities.ShoppingCartItem);

       return repository.delete(where);
    },

    addTotal: (params) => {
        const {
            entity,
            shoppingCart,
        } = params;

        if (shoppingCart.totals.some(isConflicted)) {
            throw new Error("This item is already exist");
        }

        const repository = getRepository(entities.ShoppingCartItem);

        return repository.save(entity);

        function isConflicted(item) {
            return item[fields.ShoppingCartTotal.code] === entity[fields.ShoppingCartTotal.code]
        }
    },

    updateTotal: async (params)  => {
        const {
            entity,
            where,
        } = params;


        const repository = getRepository(entities.ShoppingCartTotal);
        const response = await repository.update(where, entity);
    },

    removeTotal: (where) => {
        const repository = getRepository(entities.ShoppingCartTotal);

        return repository.delete(where);
    },
};

function getUserConditions(user, token) {
    return (user)
        ? { [fields.ShoppingCart.user]: user.id }
        : { [fields.ShoppingCart.token]: token }
}

export default ShoppingCartService;
