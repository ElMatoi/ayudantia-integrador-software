import {Column,PrimaryGeneratedColumn,Entity, OneToMany}  from "typeorm";
import { Reserve } from "src/modules/reserves/entities/reserve.entity";
@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column({length:35})
    name!: string;
    @Column({ unique: true, nullable: false })
    rut!: string;
    @OneToMany(()=>  Reserve, (reserve)=>reserve.user,{
        nullable: true,
        onDelete: "CASCADE",
    })
    reserve: Reserve[];

}
