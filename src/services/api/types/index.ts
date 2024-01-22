import { HttpError } from '../errors/http-error';
import { NetworkError } from '../errors/network-error';

export interface BasePaginationApiResponse {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface BasePaginationRequest {
  _page?: number;
  _size?: number;
  _order?: string;
}

export type Result<T> = Promise<{
  ok: boolean;
  result: T | NetworkError | HttpError;
}>;

export type ApiError = {
  type: string;
  error: string;
};

export type ApiErroredResponse = {
  errors: ApiError[];
};
