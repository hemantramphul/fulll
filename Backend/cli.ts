import { Command } from "commander";
import { AppDataSource } from "./src/Infra/Database";
import { FleetRepository } from "./src/Infra/FleetRepository";
import { RegisterVehicleCommand } from "./src/App/Command/RegisterVehicleCommand";
import { RegisterVehicleHandler } from "./src/App/Handler/RegisterVehicleHandler";
import { ParkVehicleCommand } from "./src/App/Command/ParkVehicleCommand";
import { ParkVehicleHandler } from "./src/App/Handler/ParkVehicleHandler";
import { Location } from "./src/Domain/Location";

const program = new Command();

// initialized db before any CLI commands
async function init() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    // console.log("Database initialized!");
  }
}

init().then(() => {
  const fleetRepository = new FleetRepository();

  /**
   * Command: create a fleet
   * CLI: ./fleet create <userId>
   */
  program
    .command("create <userId>")
    .description("Create a new fleet and return its ID")
    .action(async (userId) => {
      try {
        // console.log("Creating fleet for user:", userId);
        const fleet = await fleetRepository.createFleet(userId);
        console.log(`Fleet created with ID: ${fleet.id}`);
      } catch (err) {
        console.error("Error:", err.message);
      }
    });

  /**
   * Command: register a vehicle
   * CLI: ./fleet register-vehicle <fleetId> <vehiclePlateNumber>
   */
  program
    .command("register-vehicle <fleetId> <vehiclePlateNumber>")
    .description("Register a vehicle into a fleet")
    .action(async (fleetId, vehiclePlateNumber) => {
      try {
        const handler = new RegisterVehicleHandler(fleetRepository);
        await handler.execute(
          new RegisterVehicleCommand(fleetId, vehiclePlateNumber)
        );
      } catch (err) {
        console.error("Error:", err.message);
      }
    });

  /**
   * Command: localize a vehicle
   * CLI: ./fleet localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]
   */
  program
    .command("localize-vehicle <fleetId> <plateNumber> <lat> <lng> [alt]")
    .description("Localize (park) a vehicle at a specific location")
    .action(async (fleetId, plateNumber, lat, lng, alt = "0") => {
      try {
        const handler = new ParkVehicleHandler(fleetRepository);
        const location = new Location(parseFloat(lat), parseFloat(lng));
        await handler.execute(
          new ParkVehicleCommand(
            fleetId,
            plateNumber,
            location,
            parseFloat(alt)
          )
        );
        // console.log(
        //   `Vehicle ${plateNumber} parked at (${lat}, ${lng}, ${alt})`
        // );
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    });

  program.parse(process.argv);
});
