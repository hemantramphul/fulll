import { ParkVehicleCommand } from "../Command/ParkVehicleCommand";
import { FleetRepository } from "../../Infra/FleetRepository";

export class ParkVehicleHandler {
  constructor(private readonly fleetRepository: FleetRepository) {}

  async execute(command: ParkVehicleCommand): Promise<void> {
    await this.fleetRepository.updateVehicleLocation(
      command.fleetId,
      command.vehicleId, // plateNumber
      command.location.latitude,
      command.location.longitude,
      command.altitude
    );
  }
}
