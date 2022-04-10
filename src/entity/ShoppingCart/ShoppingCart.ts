import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ShoppingCartItem} from "./ShoppingCartItem";
import {User} from "../User/User";

@Entity()
export class ShoppingCart {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => ShoppingCartItem, item => item.shoppingCart)
    items: ShoppingCartItem[]

}
