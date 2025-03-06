import { DataSource } from "typeorm";
import { FleetEntity } from "./Entities/FleetEntity";
import { VehicleEntity } from "./Entities/VehicleEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "fleet_management.sqlite",
  entities: [FleetEntity, VehicleEntity],
  synchronize: false,
  migrations: ["src/Infra/Migrations/*.ts"], // migrations path
  logging: false,
});

// Initialize database
AppDataSource.initialize()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));
