import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ShoppingCart} from "../ShoppingCart/ShoppingCart";
import {User} from "../User/User";
import {OrderShippingAddress} from "./OrderShippingAddress";
import {Delivery} from "../Delivery/Delivery";


const fields = Object.freeze({
    id: 'id',
    user: 'user',
    status: 'status',
    shoppingCart: 'shoppingCart',
    deliveryMethod: 'deliveryMethod',
    shippingAddress: 'shippingAddress',
});

const STATUS_TYPES = {
    STARTED: 'start',
    ORDERED: 'ordered',
    PAYMENT_PROCESSED: 'payment_processed',
    PAYMENT_REJECTED: 'payment_rejected',
    CANCELED: 'canceled',
    REFUNDED: 'refunded',
}

const enumTypes = {
    [fields.status]: Object.values(STATUS_TYPES)
}

@Entity()
class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => ShoppingCart)
    @JoinColumn()
    shoppingCart: ShoppingCart;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToOne(() => OrderShippingAddress)
    shippingAddress: OrderShippingAddress;

    @OneToOne(() => Delivery)
    deliveryMethod: Delivery;

    @Column({type: 'enum', enum: enumTypes[fields.status], default: enumTypes[fields.status][0]})
    status: []
};

export {
    Order,
    fields,
};
