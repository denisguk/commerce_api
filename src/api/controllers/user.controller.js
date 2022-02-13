import CRUDController from './crud.controller';
import {User} from '../../entity/User';

module.exports = (router) => CRUDController({
    EntityModel: User,
    router: router
});



