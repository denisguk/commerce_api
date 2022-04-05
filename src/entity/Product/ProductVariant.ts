import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Product} from "./Product";

@Entity()
export class ProductVariant {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({ type: "int"})
    price: number;

    @Column({ type: "int"})
    quantity: number;

    @Column({type: "text", nullable: true})
    description: string;

    @Column("simple-array")
    images: string[];

    @Column({type: "json"})
    attributes: { property: string, value: string };

    @ManyToOne(() => Product, product => product.variants)
    product: Product;
}
