import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    fullname: string;

    @Column({ unique: true, length: 100 })
    email: string;

    @Column({length: 255})
    password: string;

    @Column("text")
    avatar: string;

    @Column({type: "datetime"})
    birth_date: string;

    @Column({ unique: true, length: 100 })
    phone: string;
}
