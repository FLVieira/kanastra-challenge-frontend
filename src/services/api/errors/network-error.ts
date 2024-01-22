export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
