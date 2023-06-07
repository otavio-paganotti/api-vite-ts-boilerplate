export * from './users';

export interface ListResponse<T = unknown> {
  data: T[];
  pagination: {};
  message: string;
  success: boolean;
  statusCode: number;
};

export interface GetResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
};

export interface CreatePutOrDeleteResponse {
  message: string;
  success: boolean;
  statusCode: number;
};
