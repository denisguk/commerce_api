import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";


const fields = Object.freeze({
    id: 'id',
    code: 'code',
    title: 'title',
    description: 'description',
});

const CODE_TYPES = {
    PICKUP: 'pickup',
    UPS_SUPERPOST: 'ups_superpost',
    UPS_GROUND: 'ups_ground',
    DHL: 'dhl',
}

const enumTypes = {
    [fields.code]: Object.values(CODE_TYPES)
}


@Entity()
class Delivery {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'enum', enum: enumTypes[fields.code], default: enumTypes[fields.code][0]})
    code: []

    @Column({length: 128})
    title: string;

    @Column({length: 255})
    description: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    amount: number;
};

export {
    Delivery,
    fields,
    enumTypes
};
