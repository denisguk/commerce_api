import {getRepository} from "typeorm";

/**
 * This is basic generic CRUD controller that can apply to any entity-model
 *
 */
module.exports = ({EntityModel, router, middlewares = []}) => {
    const namespace = EntityModel.name.toLocaleLowerCase();
    const CRUD = new CRUDController({EntityModel});

    router.post(`/${namespace}/`, ...middlewares, CRUD.create);
    router.get(`/${namespace}/`, ...middlewares, CRUD.find);
    router.get(`/${namespace}/:id`, ...middlewares, CRUD.findOne);
    router.put(`/${namespace}/:id`, ...middlewares, CRUD.update);
    router.delete(`/${namespace}/:id`, ...middlewares, CRUD.delete);

    return router;
}


function CRUDController({EntityModel}) {
    return {
        findOne: async (req, res) => {
            try {
                let {relations} = req.query;

                if (relations && !Array.isArray(relations)) {
                    relations = [relations];
                }

                const EntityRepository = getRepository(EntityModel);
                const response = await EntityRepository.findOne(req.params, {relations});

                res.json(response);
            } catch (err) {
                return res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            }
        },

        find: async (req, res) => {
            try {
                let {
                    query,
                    relations,
                    order = {id: "desc"},
                    skip = 0,
                    take = 50,
                } = req.query;

                const EntityRepository = getRepository(EntityModel);

                if (relations && !Array.isArray(relations)) {
                    relations = [relations];
                }

                if (order) {
                    try {
                        order = JSON.parse(decodeURIComponent(order));
                    } catch (e) {
                        order = {id: "desc"}
                    }
                }

                if (query) {
                    try {
                        query = JSON.parse(decodeURIComponent(query));
                    } catch (e) {
                        query = undefined
                    }
                }

                const response = await EntityRepository.find({relations, order, where: query, skip, take});

                return res.json(response);
            } catch (err) {
                return res.status(400).send({
                    message: err.message || "Some error occurred while retrieving tutorials."
                });
            }
        },

        create: async (req, res) => {
            try {
                const EntityRepository = getRepository(EntityModel);
                const response = await EntityRepository.insert(req.body);

                return res.status(201).json({
                    ...req.body,
                    id: response.raw.insertId
                });
            } catch (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while retrieving tutorials."
                });
            }
        },

        update: async (req, res) => {
            try {
                const EntityRepository = getRepository(EntityModel);
                const response = await EntityRepository.update(req.params, req.body);

                return res.status(204).json({
                    success: true,
                    affected: response.raw.affected,
                });
            } catch (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while retrieving tutorials."
                });
            }
        },

        delete: async (req, res) => {
            try {
                const EntityRepository = getRepository(EntityModel);
                const response = await EntityRepository.delete(req.params);

                return res.json(response);
            } catch (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while retrieving tutorials."
                });
            }
        },

    };
};
