import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ShoppingCartItem} from "./ShoppingCartItem";
import {User} from "../User/User";

const fields = Object.freeze({
    id: 'id',
    user: 'user',
    items: 'items',
});


@Entity()
class ShoppingCart {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => ShoppingCartItem, item => item.shoppingCart)
    items: ShoppingCartItem[]

};

export {
    ShoppingCart,
    fields,
};
