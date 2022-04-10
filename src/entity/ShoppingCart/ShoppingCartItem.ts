import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductVariant} from "../Product/ProductVariant";
import {ShoppingCart} from "./ShoppingCart";

@Entity()
export class ShoppingCartItem {

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
