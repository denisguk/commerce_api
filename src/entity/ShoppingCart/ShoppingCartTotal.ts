import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { ShoppingCart } from "./ShoppingCart";

const fields = Object.freeze({
    id: 'id',
    name: 'name',
    value: 'value',
    rawValue: 'rawValue',
    shoppingCart: 'shoppingCart',
});

@Entity()
class ShoppingCartTotal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 128})
    name: string;

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

