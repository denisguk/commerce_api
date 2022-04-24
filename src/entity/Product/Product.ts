import {Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {ProductVariant} from './ProductVariant';
import {Comment} from "../Comment/Comment";
import {Category} from "../Category/Category";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({type: "text", nullable: true})
    description: string;

    @Column({length: 255, nullable: true})
    image: string;

    @OneToMany(() => ProductVariant, variant => variant.product)
    variants: ProductVariant[]

    @OneToMany(() => Comment, comment => comment.product)
    comments: Comment[]

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}
