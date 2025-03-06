import { Vehicle } from "./Vehicle";
import { Location } from "./Location";

export class Fleet {
  private vehicles: Map<string, Vehicle> = new Map();
  private vehicleLocations: Map<string, Location> = new Map();

  constructor(public readonly id: string) {}

  registerVehicle(vehicle: Vehicle): void {
    if (this.vehicles.has(vehicle.id)) {
      throw new Error("Vehicle has already been registered into this fleet");
    }
    this.vehicles.set(vehicle.id, vehicle);
  }

  hasVehicle(vehicleId: string): boolean {
    return this.vehicles.has(vehicleId);
  }

  parkVehicle(vehicleId: string, location: Location): void {
    if (!this.hasVehicle(vehicleId)) {
      throw new Error("Vehicle is not registered in the fleet");
    }
    if (this.vehicleLocations.get(vehicleId)?.isEqual(location)) {
      throw new Error("Vehicle is already parked at this location");
    }
    this.vehicleLocations.set(vehicleId, location);
  }

  getVehicleLocation(vehicleId: string): Location | undefined {
    return this.vehicleLocations.get(vehicleId);
  }
}