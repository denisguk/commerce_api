import {getRelations} from "../../../utils/relations";
import {getRepository} from "typeorm";
import {entities, fields} from "../../../entity";

const OrderService = {

    /**
     *
     * @param params
     * @returns {Promise<ShoppingCart|undefined>}
     */
    findOrCreate: async (params) => {
        const repository = getRepository(entities.Order);
        const {
            where,
            entity,
            relations,
        } = params;

        const order = await repository.findOne(
            where,
            {
                select: [fields.Order.id],
            }
        );


        if (!order) {
            await repository.save(entity);
        }

        return repository.findOne(
            where,
            {
                relations: getRelations(relations)
            }
        );
    },

    /**
     *
     * @param params
     * @returns {Promise<Order | undefined>}
     */
    findOne(params) {
        const {
            where,
            select = Object.values(fields.Order),
            relations
        } = params;

        const repository = getRepository(entities.Order);

        return repository.findOne(
            where,
            {
                relations,
                select
            }
        );
    },

    /**
     *
     * @param params
     */
    addShippingAddress: async (params) => {
        const {
            where,
            relations,
            shippingAddress
        } = params;

        const repository = getRepository(entities.Order);
        const order = await repository.findOne(
            where,
            {
                relations: getRelations([
                    fields.Order.shippingAddress,
                    fields.Order.deliveryMethod,
                ])
            }
        );

        if (!order) {
            throw new Error('Shipping method cannot be added for current order');
        }

        order.shippingAddress = {
            ...order.shippingAddress,
            ...shippingAddress
        };

        return repository.save(order);
    },

    /**
     *
     * @param params
     * @returns {Promise<void>}
     */
    addDeliveryMethod: async (params) => {
        const deliveryRepository = getRepository(entities.Delivery);
        const repository = getRepository(entities.Order);

        const {
            where,
            method,
            relations,
        } = params;


        const deliveryMethod = await deliveryRepository.findOne(method);
        const order = await repository.findOne(
            where,
            {
                relations: getRelations(relations)
            }
        );

        if (!deliveryMethod || !order) {
            throw new Error('Shipping method cannot be added for current order');
        }

        order.deliveryMethod = deliveryMethod;

        return repository.save(order);
    }
};

export default OrderService;
