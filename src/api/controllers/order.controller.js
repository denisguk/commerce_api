import CRUDController from './crud.controller';
import {entities} from '../../entity';

module.exports = (router) => CRUDController({
    EntityModel: entities.Order,
    router: router,
});



