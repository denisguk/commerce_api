import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

const fields = Object.freeze({
    id: 'id',
    code: 'code',
    rawRule: 'rawRule',
    title: 'title',
    description: 'description',
});

@Entity()
class Coupon {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 32})
    code: string

    @Column({length: 128})
    rawRule: string;

    @Column({length: 128})
    title: string;

    @Column({length: 255})
    description: string;
};

export {
    Coupon,
    fields,
};
