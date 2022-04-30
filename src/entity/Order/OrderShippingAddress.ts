import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ShoppingCart} from "../ShoppingCart/ShoppingCart";
import {User} from "../User/User";
import {ShoppingCartItem} from "../ShoppingCart/ShoppingCartItem";


const fields = Object.freeze({
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    address: 'address',
    suite: 'suite',
    city: 'city',
    country: 'country',
    zipcode: 'zipcode',
    extra: 'extra',
});


@Entity()
class OrderShippingAddress {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 128})
    firstName: string;

    @Column({length: 128})
    lastName: string;

    @Column({length: 128})
    address: string;

    @Column({length: 128})
    suite: string;

    @Column({length: 128})
    city: string;

    @Column({length: 128})
    country: string;

    @Column({length: 16})
    zipcode: string;

    @Column({length: 255})
    extra: string;
};

export {
    OrderShippingAddress,
    fields,
};
