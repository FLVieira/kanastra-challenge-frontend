import { Result } from '../types';
import { ErrorTreatmentOpts, treatHttpError } from './treat-http-error';

export const treatResponse = async <T>(
  response: Response,
  responseType: 'JSON' | 'TEXT' | 'EMPTY',
  errorTreatmentOpts: ErrorTreatmentOpts,
): Result<T> => {
  if (!response.ok) {
    await treatHttpError(response, errorTreatmentOpts);
  }

  let payload;
  if (responseType !== 'EMPTY') {
    payload =
      responseType === 'JSON'
        ? ((await response.json()) as T)
        : ((await response.text()) as unknown as T);
  } else {
    payload = {} as T;
  }

  return {
    ok: true,
    result: payload,
  };
};
