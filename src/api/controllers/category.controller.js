import CRUDController from './crud.controller';
import {Category} from '../../entity/Category/Category';

module.exports = (router) => CRUDController({
    EntityModel: Category,
    router: router,
});



