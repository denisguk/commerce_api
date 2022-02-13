import CRUDController from './crud.controller';
import {Category} from '../../entity/Category';

module.exports = (router) => CRUDController({
    EntityModel: Category,
    router: router,
});



