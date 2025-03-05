import { ParkVehicleCommand } from "../Command/ParkVehicleCommand";

export class ParkVehicleHandler {
  constructor(private fleetRepository: any) {}

  execute(command: ParkVehicleCommand): void {
    const fleet = this.fleetRepository.getById(command.fleetId);
    if (!fleet) {
      throw new Error("Fleet not found");
    }

    fleet.parkVehicle(command.vehicleId, command.location);
    this.fleetRepository.save(fleet);
  }
}
