import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Comment} from '../Comment/Comment';


const fields = Object.freeze({
    id: 'id',
    email: 'email',
    phone: 'phone',
    avatar: 'avatar',
    fullName: 'fullName',
    password: 'password',
    comments: 'comments',
    birthDate: 'birthDate',
});


@Entity()
class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    fullName: string;

    @Column({unique: true, length: 100})
    email: string;

    @Column({length: 255})
    password: string;

    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[]

    @Column({ type:"text", nullable: true})
    avatar: string;

    @Column({type: "datetime"})
    birthDate: string;

    @Column({unique: true, length: 100})
    phone: string;
}


export {
    User,
    fields,
};
