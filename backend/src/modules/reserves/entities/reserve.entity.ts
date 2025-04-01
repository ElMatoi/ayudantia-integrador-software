import {Column,PrimaryGeneratedColumn,Entity,ManyToOne, OneToOne, JoinColumn}  from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { Detail } from "src/modules/detail/entities/detail.entity";
@Entity()
export class Reserve {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 40 })
  description: string;

  @ManyToOne(() => User, (user) => user.reserve, {
    nullable: true,
    onDelete: "CASCADE",
  })
  user!: User;

  @OneToOne(() => Detail, (detail) => detail.reserver, { cascade: true })
  detail!: Detail;
}


