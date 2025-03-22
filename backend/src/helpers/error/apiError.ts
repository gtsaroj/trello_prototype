export class APIError extends Error {
  statusCode: number;
  error?: any;
  constructor(message: string, status: number, error?: any) {
    super(message);
    this.statusCode = status;
    this.error = error;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}
