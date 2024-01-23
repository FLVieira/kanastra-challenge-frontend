import { FileActionType } from "@/constants";
import { useFileContext } from "@/context";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "./ui/loading";

const SingleFileUploader = () => {
  const { state: { file, error, isLoading }, dispatch, uploadCharges } = useFileContext();
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      dispatch({ type: FileActionType.SET_UPLOAD_FILE, payload: { file: files[0] } });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const result = await uploadCharges(file);
    if (!(result instanceof Error)) {
      toast.success('Uploaded file successfully!')
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          <p className="pb-6">File details:</p>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold" onClick={handleUpload}>{isLoading ? (<Loading />) : 'Upload the file'}</button>}
      {error && <span className="text-red-500 px-4 py-2 font-semibold">{error.message}</span>}
    </div>
  );
};

export { SingleFileUploader };
