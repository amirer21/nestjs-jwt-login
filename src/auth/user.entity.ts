import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    serial: number;

    @Column()
    id: string;

    @Column()
    password: string;

    @Column()
    email: string;
}