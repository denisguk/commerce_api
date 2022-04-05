import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    parent_id: number;

    @Column({length: 100})
    name: string;

    @Column({type: "text", nullable: true})
    description: string;

    @Column({ length: 255, nullable: true })
    image: string;
}
