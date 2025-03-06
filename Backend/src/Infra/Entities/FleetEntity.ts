import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FleetEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;
}
