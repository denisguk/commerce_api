import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { ShoppingCart } from "./ShoppingCart";

const fields = Object.freeze({
    id: 'id',
    name: 'name',
    code: 'code',
    value: 'value',
    rawValue: 'rawValue',
    shoppingCart: 'shoppingCart',
});

const CODE_TYPES = {
    SUB_TOTAL: 'sub_total',
    COUPON: 'coupon',
    SHIPPING: 'shipping',
    GRAND_TOTAL: 'grand_total',
};

const enumTypes = {
    [fields.code]: Object.values(CODE_TYPES)
};

@Entity()
class ShoppingCartTotal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 128})
    name: string;

    @Column({type: 'enum', enum: enumTypes[fields.code], default: enumTypes[fields.code][0]})
    code: []

    @Column({length: 128})
    value: string;

    @Column("decimal", { precision: 5, scale: 2 })
    rawValue: number;

    @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.items)
    shoppingCart: ShoppingCart;
}

export {
    ShoppingCartTotal,
    fields,
};

