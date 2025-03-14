/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Api {
  interface Response<T> {
    success: boolean;
    data: T;
    message: string;
    status: number;
  }
  interface ApiError {
    code: number;
    name?: string;
    response: Response<Response<any>>;
  }
}
