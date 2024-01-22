import { HttpError } from '../errors/http-error';
import { NetworkError } from '../errors/network-error';

export const handleError = (
  err: unknown,
  baseErrorMessage: string,
) => {
  if (err instanceof HttpError) {
    return {
      ok: false,
      result: err,
    };
  }
  return {
    ok: false,
    result: new NetworkError(baseErrorMessage),
  };
};
