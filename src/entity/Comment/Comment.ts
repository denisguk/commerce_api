import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne
} from "typeorm";
import {User} from "../User/User";
import {Product} from "../Product/Product";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    title: string;

    @Column({type: "text", nullable: true})
    comment: string;

    @Column({type: 'enum', enum: [1, 2, 3, 4, 5], default: 5})
    rating: [1, 2, 3, 4, 5];

    @OneToOne(() => User)
    @JoinColumn()
    author: User;

    @ManyToOne(() => Product, product => product.comments)
    product: Product;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
