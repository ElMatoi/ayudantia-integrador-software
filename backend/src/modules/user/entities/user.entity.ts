import {Column,PrimaryGeneratedColumn,Entity, OneToMany}  from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column({length:35})
    name!: string;
    @Column({ unique: true, nullable: false })
    rut!: string;
    
    @Column({ nullable: true })
    password!: string;
}
