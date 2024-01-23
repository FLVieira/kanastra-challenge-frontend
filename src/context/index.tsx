import { createContext, useContext, useEffect, useReducer } from "react";

import { FileActionType } from "@/constants";
import { GetAllChargesFilesApiResponse, createCharges, getAllChargesFiles } from "@/services/api/core/charges";
import { BasePaginationRequest } from "@/services/api/types";
import {
  FileAction,
  FileContextState,
  FileContextType,
  FileProviderProps,
} from "@/types";

export const FileContextInitialValues: FileContextState = {
  file: null,
  isLoading: false,
  error: null,
  fileList: [],
};

export const FileContext = createContext<FileContextType>({
  state: FileContextInitialValues,
  dispatch: () => null,
  uploadCharges: async () => undefined,
});

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case FileActionType.SET_UPLOAD_FILE: {
      return { ...state, file: action.payload?.file ?? null };
    }
    case FileActionType.SET_FILE_LIST: {
      return { ...state, fileList: action.payload?.fileList ?? [] };
    }
    case FileActionType.SET_IS_LOADING: {
      return { ...state, isLoading: action.payload?.isLoading ?? false };
    }
    case FileActionType.SET_ERROR: {
      return { ...state, error: action.payload?.error ?? null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(FileReducer, FileContextInitialValues);

  const loadAllFiles = async (params: BasePaginationRequest) => {
    dispatch({ type: FileActionType.SET_IS_LOADING, payload: { isLoading: true } });

    const listChargesFilesReq = await getAllChargesFiles(params);
    if (listChargesFilesReq.ok) {
      const result = listChargesFilesReq.result as GetAllChargesFilesApiResponse;
      dispatch({ type: FileActionType.SET_FILE_LIST, payload: { fileList: result.data } });
    }
    else {
      const error = listChargesFilesReq.result as Error;
      dispatch({ type: FileActionType.SET_ERROR, payload: { error } });
    }

    dispatch({ type: FileActionType.SET_IS_LOADING, payload: { isLoading: false } });
  };

  const uploadCharges = async (file: File) => {
    dispatch({ type: FileActionType.SET_IS_LOADING, payload: { isLoading: true } });

    const createChargesReq = await createCharges(file);
    if (!createChargesReq.ok) {
      const error = createChargesReq.result as Error;
      dispatch({ type: FileActionType.SET_ERROR, payload: { error } });
      return error;
    }

    dispatch({ type: FileActionType.SET_UPLOAD_FILE, payload: { file: null } });

    await loadAllFiles({});
  };

  useEffect(() => {
    loadAllFiles({});
  }, [])

  return (
    <FileContext.Provider value={{ state, dispatch, uploadCharges }}>
      {children}
    </FileContext.Provider>
  );
};

const useFileContext = () => {
  const context = useContext(FileContext);

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
};

export { FileProvider, useFileContext };
