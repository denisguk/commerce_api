import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductVariant} from "../Product/ProductVariant";
import { ShoppingCart } from "./ShoppingCart";

const fields = Object.freeze({
    id: 'id',
    meta: 'meta',
    variant: 'variant',
    quantity: 'quantity',
    shoppingCart: 'shoppingCart',
});

@Entity()
class ShoppingCartItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int"})
    quantity: number;

    @OneToOne(() => ProductVariant)
    @JoinColumn()
    variant: ProductVariant;

    @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.items)
    shoppingCart: ShoppingCart;

    @Column({type: "simple-json", nullable: true})
    meta: { key: string, value: string };
}

export {
    ShoppingCartItem,
    fields,
};

