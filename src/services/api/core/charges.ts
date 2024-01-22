import { config } from "@/config";
import { ChargeFile } from "@/metadata/files";
import { handleError } from "../common/handle-error";
import { ErrorTreatmentOpts } from "../common/treat-http-error";
import { treatResponse } from "../common/treat-response";
import { BasePaginationApiResponse, BasePaginationRequest, Result } from "../types";
import { asQueryParams } from "../utils/asQueryParams";

export interface GetAllChargesFilesApiResponse extends BasePaginationApiResponse {
  data: ChargeFile[];
}

export const getAllChargesFiles = async (
  params: BasePaginationRequest,
  errorTreatmentOpts: ErrorTreatmentOpts = {
    baseErrorMessage: 'Houve um erro ao buscar os arquivos de cobrança. Por favor, tente novamente mais tarde.',
  },
): Result<GetAllChargesFilesApiResponse> => {
  try {
    let url = `${config.API_BASE_URL}/charges/files`;

    const queryString = asQueryParams(params as Record<string, unknown>);
    url += `?${queryString}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    return await treatResponse(response, 'JSON', errorTreatmentOpts);
  } catch (err) {
    return handleError(err, errorTreatmentOpts.baseErrorMessage);
  }
};

export const createCharges = async (file: Blob, errorTreatmentOpts: ErrorTreatmentOpts = {
  baseErrorMessage: 'Houve um erro ao enviar o arquivo para o servidor. Por favor, tente novamente mais tarde.',
}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${config.API_BASE_URL}/charges`, {
      method: 'POST',
      body: formData,
    });

    return await treatResponse<string>(response, 'EMPTY', errorTreatmentOpts);
  } catch (err) {
    return handleError(err, errorTreatmentOpts.baseErrorMessage);
  }
}
