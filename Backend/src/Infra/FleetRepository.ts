import { Repository } from "typeorm";
import { FleetEntity } from "./Entities/FleetEntity";
import { VehicleEntity } from "./Entities/VehicleEntity";
import { AppDataSource } from "./Database";
import { Fleet } from "../Domain/Fleet";

export class FleetRepository {
  private fleetRepo: Repository<FleetEntity>;
  private vehicleRepo: Repository<VehicleEntity>;

  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Database is not initialized.");
    }
    this.fleetRepo = AppDataSource.getRepository(FleetEntity);
    this.vehicleRepo = AppDataSource.getRepository(VehicleEntity);
  }

  async createFleet(userId: string): Promise<FleetEntity> {
    // console.log("Creating fleet entity in the database...");
    const fleet = this.fleetRepo.create({ userId });
    const savedFleet = await this.fleetRepo.save(fleet);
    // console.log("Fleet saved:", savedFleet);
    return savedFleet;
  }

  async getById(fleetId: string): Promise<Fleet | null> {
    const fleetEntity = await this.fleetRepo.findOne({
      where: { id: fleetId },
    });
    if (!fleetEntity) return null;

    return new Fleet(fleetEntity.id);
  }

  async registerVehicle(fleetId: string, plateNumber: string): Promise<void> {
    const fleet = await this.getById(fleetId);
    if (!fleet) {
      throw new Error("Fleet not found");
    }

    // check if already exists in the fleet
    const existingVehicle = await this.vehicleRepo.findOne({
      where: { plateNumber, fleet: { id: fleetId } },
    });

    if (existingVehicle) {
      throw new Error(
        `Vehicle ${plateNumber} is already registered in fleet ${fleetId}`
      );
    }

    const vehicle = this.vehicleRepo.create({ plateNumber, fleet });
    await this.vehicleRepo.save(vehicle);
  }

  async save(fleet: Fleet): Promise<void> {
    for (const [vehicleId, location] of fleet["vehicleLocations"].entries()) {
      await this.vehicleRepo.update(vehicleId, {
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }

  async updateVehicleLocation(
    fleetId: string,
    plateNumber: string,
    latitude: number,
    longitude: number,
    altitude: number = 0 // default value if not provided: [alt] optional
  ): Promise<void> {
    const vehicle = await this.vehicleRepo.findOne({
      where: { plateNumber, fleet: { id: fleetId } },
    });

    if (!vehicle) {
      throw new Error(
        `Vehicle ${plateNumber} is not registered in fleet ${fleetId}`
      );
    }

    await this.vehicleRepo.update(vehicle.id, {
      latitude,
      longitude,
      altitude,
    });

    console.log(
      `Vehicle ${plateNumber} is now parked at (${latitude}, ${longitude}, ${altitude})`
    );
  }
}
