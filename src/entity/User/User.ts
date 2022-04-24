import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Comment} from '../Comment/Comment';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    fullname: string;

    @Column({unique: true, length: 100})
    email: string;

    @Column({length: 255})
    password: string;

    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[]

    @Column("text")
    avatar: string;

    @Column({type: "datetime"})
    birth_date: string;

    @Column({unique: true, length: 100})
    phone: string;
}
