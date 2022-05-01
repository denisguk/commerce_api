import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ShoppingCartItem} from "./ShoppingCartItem";
import {User} from "../User/User";

const fields = Object.freeze({
    id: 'id',
    user: 'user',
    token: 'token',
    items: 'items',
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

};

export {
    ShoppingCart,
    fields,
};
