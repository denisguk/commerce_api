import {getRepository, getConnection} from "typeorm";
import {ShoppingCart} from '../../entity/ShoppingCart';
import {ProductVariant} from '../../entity/ProductVariant';

module.exports = (router) => {

    router.get('/shopping_cart/:id', async (req, res) => {
        const ShoppingCartRepository = getRepository(ShoppingCart);
        const shoppingCart = await ShoppingCartRepository.findOne(req.params);

        if (!shoppingCart) {
            return res.status(404).json({
                code: "NOT_FOUND",
                message: "Shopping cart doesn't exist"
            });
        }

        return res.json(shoppingCart);
    });

    router.post('/shopping_cart/:id/item', async (req, res) => {
        const ShoppingCartRepository = getRepository(ShoppingCart);
        const shoppingCart = await ShoppingCartRepository.findOne({where: {id: req.params.id}, relations: ['items']});
        const connection = getConnection();

        let item = new ProductVariant();

        item.id = req.body.id;

        shoppingCart.items = [
            item,
            ...shoppingCart.items
        ];

        await connection.manager.save(shoppingCart);
    });

    return router;
}



