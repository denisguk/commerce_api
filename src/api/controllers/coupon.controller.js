import CRUDController from './crud.controller';
import {entities} from '../../entity';

module.exports = (router) => CRUDController({
    EntityModel: entities.Coupon,
    router: router,
});



