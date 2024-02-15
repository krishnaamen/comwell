export class InvalidRoomTypeError extends Error {
  constructor(private type: string) {
    super(`invalid room type: "${type}"`);
  }
}
