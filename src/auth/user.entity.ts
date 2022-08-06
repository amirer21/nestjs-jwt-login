import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

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