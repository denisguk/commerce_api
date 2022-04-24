import CRUDController from './crud.controller';
import {Comment} from '../../entity/Comment/Comment';

module.exports = (router) => CRUDController({
    EntityModel: Comment,
    router: router,
});



