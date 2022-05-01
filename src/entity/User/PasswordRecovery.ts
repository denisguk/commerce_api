import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from "typeorm";
import {User} from "./User";


const fields = Object.freeze({
    id: 'id',
    user: 'user',
    hash: 'hash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});

@Entity()
class PasswordRecovery {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ unique: true, length: 255 })
    hash: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export {
    PasswordRecovery,
    fields,
};
