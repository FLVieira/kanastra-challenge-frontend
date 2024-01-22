import { ReactNode } from "react";

import { FileActionType } from "@/constants";
import { ChargeFile } from "@/metadata/files";

export type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

export type FileContextState = {
  isLoading: boolean;
  file: File | null;
  error: Error | null;
  fileList: ChargeFile[];
};

export type FileAction = ReducerAction<
  FileActionType,
  Partial<FileContextState>
>;

export type FileDispatch = ({ type, payload }: FileAction) => void;

export type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
  uploadCharges: (file: File) => Promise<Error | undefined>;
};

export type FileProviderProps = { children: ReactNode };
