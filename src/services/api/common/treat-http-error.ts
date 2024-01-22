import { HttpError } from '../errors/http-error';

export type ErrorTreatmentOpts = {
  baseErrorMessage: string;
};

export const treatHttpError = async (
  response: Response,
  errorTreatmentOpts: ErrorTreatmentOpts,
) => {
  const statusCode = response.status;
  let message = errorTreatmentOpts.baseErrorMessage;

  const jsonResponse = (await response.json());
  const { errors } = jsonResponse;

  if (errors && errors.length > 0) {
    const errorsText = errors.join('; ');
    message = `${message} | Detalhes: ${errorsText}`;
  }

  throw new HttpError(statusCode, message);
};
