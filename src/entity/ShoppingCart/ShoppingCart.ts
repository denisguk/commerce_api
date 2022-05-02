import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ShoppingCartItem} from "./ShoppingCartItem";
import {User} from "../User/User";
import {ShoppingCartTotal} from "./ShoppingCartTotal";

const fields = Object.freeze({
    id: 'id',
    user: 'user',
    token: 'token',
    items: 'items',
    totals: 'totals',
});


@Entity()
class ShoppingCart {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({length: 255, nullable: true})
    token: string;

    @OneToMany(() => ShoppingCartItem, item => item.shoppingCart)
    items: ShoppingCartItem[]

    @OneToMany(() => ShoppingCartTotal, total => total.shoppingCart)
    totals: ShoppingCartTotal[]

};

export {
    ShoppingCart,
    fields,
};
