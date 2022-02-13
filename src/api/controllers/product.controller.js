import CRUDController from './crud.controller';
import {Product} from '../../entity/Product';

module.exports = (router) => CRUDController({
    EntityModel: Product,
    router: router,
});



