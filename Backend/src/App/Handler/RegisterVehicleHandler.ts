import { Vehicle } from "../../Domain/Vehicle";
import { RegisterVehicleCommand } from "../Command/RegisterVehicleCommand";

export class RegisterVehicleHandler {
  constructor(private fleetRepository: any) {}

  execute(command: RegisterVehicleCommand): void {
    const fleet = this.fleetRepository.getById(command.fleetId);
    if (!fleet) {
      throw new Error("Fleet not found");
    }

    const vehicle = new Vehicle(command.vehicleId);
    fleet.registerVehicle(vehicle);
    this.fleetRepository.save(fleet);
  }
}
