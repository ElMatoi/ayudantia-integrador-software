import {Column,PrimaryGeneratedColumn,Entity, OneToOne, JoinColumn} from 'typeorm'
import { Reserve } from 'src/modules/reserves/entities/reserve.entity';
@Entity()
export class Detail {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 35 })
  diagnostico: string;

  @OneToOne(() => Reserve, (reserve) => reserve.detail, { nullable: false })
  @JoinColumn() 
  reserver!: Reserve;
}




