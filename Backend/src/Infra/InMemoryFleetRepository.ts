import { Fleet } from "../Domain/Fleet";

export class InMemoryFleetRepository {
  private fleets: Map<string, Fleet> = new Map();

  getById(fleetId: string): Fleet | undefined {
    return this.fleets.get(fleetId);
  }

  save(fleet: Fleet): void {
    this.fleets.set(fleet.id, fleet);
  }
}
