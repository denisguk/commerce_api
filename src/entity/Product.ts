import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {ProductVariant} from './ProductVariant';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({type: "text", nullable: true})
    description: string;

    @Column({ length: 255, nullable: true })
    image: string;

    @OneToMany(() => ProductVariant, variant => variant.product)
    variants: ProductVariant[]
}
