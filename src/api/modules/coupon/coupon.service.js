import {getRepository} from "typeorm";
import {entities, fields} from "../../../entity";
import {getRelations} from "../../../utils/relations";

const CouponService = {

    findOne: async (params) => {
        const {
            where,
            select = [...fields.Coupon],
            relations
        } = params;

        const repository = getRepository(entities.ShoppingCart);
        const coupon = await repository.findOne(
            where,
            {
                relations: getRelations(relations),
                select
            }
        );

        if (!coupon) {
            throw new Error("Coupon is not found");
        }

        coupon.rule = CouponService.parseRule(coupon.rawRule);

        return coupon;
    },


    /**
     * Parsing rule and return back a formula
     * @example '15.%.itm.itm_lvl'
     * @param {String} rawRule
     */
    parseRule: (rawRule = '') => {
        const [
            value,
            method,
            target,
            applyLevel
        ] = rawRule.split('.');

        return {
            value,
            method,
            target,
            applyLevel
        };
    },
};

export default CouponService;
