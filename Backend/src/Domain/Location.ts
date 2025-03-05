export class Location {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number
  ) {}

  isEqual(other: Location): boolean {
    return (
      this.latitude === other.latitude && this.longitude === other.longitude
    );
  }
}
