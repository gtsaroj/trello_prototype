/* eslint-disable @typescript-eslint/no-explicit-any */
class ApiError extends Error {
  public statusCode: number;
  public error?: any;
  public data?: any;
  public success: boolean;

  constructor(
    statusCode: number,
    message?: string,
    error?: any,
    data: any = null,
    success: boolean = false
  ) {
    super(message);
    this.statusCode = statusCode > 399 ? statusCode : 400;
    this.error = error;
    this.message = message || "Something went wrong";
    this.data = data;
    this.success = success;
  }
}

export { ApiError };
