import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { FleetEntity } from "./FleetEntity";

@Entity()
export class VehicleEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  plateNumber: string;

  @ManyToOne(() => FleetEntity, (fleet) => fleet.id)
  fleet: FleetEntity;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

  @Column({ nullable: true, default: 0 }) // optional
  altitude: number;
}
