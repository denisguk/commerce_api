import {Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductVariant} from "../Product/ProductVariant";

@Entity()
export class ShoppingCart {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => ProductVariant)
    @JoinTable()
    items: ProductVariant[];


}
