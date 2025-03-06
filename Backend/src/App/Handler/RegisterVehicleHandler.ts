import { Vehicle } from "../../Domain/Vehicle";
import { RegisterVehicleCommand } from "../Command/RegisterVehicleCommand";

export class RegisterVehicleHandler {
  constructor(private fleetRepository: any) {}

  async execute(command: RegisterVehicleCommand): Promise<void> {
    const fleet = this.fleetRepository.getById(command.fleetId);
    if (!fleet) {
      throw new Error("Fleet not found");
    }

    // step 1
    // const vehicle = new Vehicle(command.plateNumber);
    // fleet.registerVehicle(vehicle);
    // this.fleetRepository.save(fleet);

    // step 2
    try {
      await this.fleetRepository.registerVehicle(
        command.fleetId,
        command.plateNumber
      );
      console.log(
        `Vehicle ${command.plateNumber} registered in fleet ${command.fleetId}`
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
    // console.log(
    //   `Vehicle ${command.plateNumber} registered in fleet ${command.fleetId}`
    // );
  }
}
