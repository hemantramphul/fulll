import { Location } from "../../Domain/Location";

export class ParkVehicleCommand {
  constructor(
    public readonly fleetId: string,
    public readonly vehicleId: string,
    public readonly location: Location,
    public readonly altitude: number = 0
  ) {}
}
