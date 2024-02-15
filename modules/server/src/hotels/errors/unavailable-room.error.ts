export class UnavailableRoomError extends Error {
  constructor(
    private id: string,
    private roomType: string,
    private from: Date,
    private to: Date,
  ) {
    super(
      `unavailable room for id: "${id}"; roomType: "${roomType}"; from: "${from}"; to: "${to}"`,
    );
  }
}
