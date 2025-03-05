import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { Fleet } from "../Domain/Fleet";
import { Vehicle } from "../Domain/Vehicle";
import { Location } from "../Domain/Location";
import { RegisterVehicleCommand } from "../App/Command/RegisterVehicleCommand";
import { RegisterVehicleHandler } from "../App/Handler/RegisterVehicleHandler";
import { ParkVehicleCommand } from "../App/Command/ParkVehicleCommand";
import { ParkVehicleHandler } from "../App/Handler/ParkVehicleHandler";

let fleet: Fleet;
let anotherFleet: Fleet;
let vehicle: Vehicle;
let location: Location;
let error: Error | null = null;

Given("my fleet", function () {
  fleet = new Fleet("fleet1");
});

Given("the fleet of another user", function () {
  anotherFleet = new Fleet("fleet2");
});

Given("a vehicle", function () {
  vehicle = new Vehicle("V-1234-56");
});

Given("a location", function () {
  location = new Location(40.9966, 20.3322);
});

Given("I have registered this vehicle into my fleet", function () {
  const handler = new RegisterVehicleHandler({
    getById: () => fleet,
    save: () => {},
  });
  handler.execute(new RegisterVehicleCommand(fleet.id, vehicle.id));
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    const handler = new RegisterVehicleHandler({
      getById: () => anotherFleet,
      save: () => {},
    });
    handler.execute(new RegisterVehicleCommand(anotherFleet.id, vehicle.id));
  }
);

Given("my vehicle has been parked into this location", function () {
  const handler = new ParkVehicleHandler({
    getById: () => fleet,
    save: () => {},
  });
  handler.execute(new ParkVehicleCommand(fleet.id, vehicle.id, location));
});

When("I register this vehicle into my fleet", function () {
  const handler = new RegisterVehicleHandler({
    getById: () => fleet,
    save: () => {},
  });
  handler.execute(new RegisterVehicleCommand(fleet.id, vehicle.id));
});

When("I try to register this vehicle into my fleet", function () {
  try {
    const handler = new RegisterVehicleHandler({
      getById: () => fleet,
      save: () => {},
    });
    handler.execute(new RegisterVehicleCommand(fleet.id, vehicle.id));
  } catch (err) {
    error = err as Error;
  }
});

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function () {
    assert.ok(error);
    assert.strictEqual(
      error?.message,
      "Vehicle has already been registered into this fleet"
    );
  }
);

When("I park my vehicle at this location", function () {
  const handler = new ParkVehicleHandler({
    getById: () => fleet,
    save: () => {},
  });
  handler.execute(new ParkVehicleCommand(fleet.id, vehicle.id, location));
});

When("I try to park my vehicle at this location", function () {
  try {
    const handler = new ParkVehicleHandler({
      getById: () => fleet,
      save: () => {},
    });
    handler.execute(new ParkVehicleCommand(fleet.id, vehicle.id, location));
  } catch (err) {
    error = err as Error;
  }
});

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    assert.ok(error);
    assert.strictEqual(
      error?.message,
      "Vehicle is already parked at this location"
    );
  }
);

Then(
  "the known location of my vehicle should verify this location",
  function () {
    assert.deepStrictEqual(fleet.getVehicleLocation(vehicle.id), location);
  }
);

Then("this vehicle should be part of my vehicle fleet", function () {
  assert.ok(fleet.hasVehicle(vehicle.id));
});
