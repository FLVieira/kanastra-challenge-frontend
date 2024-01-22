import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout, NoMatch } from "./components";
import { FileList, Upload } from "./pages";

import 'react-toastify/dist/ReactToastify.css';
import { makeServer } from "./mock/makeServer";

if (process.env.NODE_ENV !== "production") {
  makeServer();
}

export function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FileList />} />
        <Route path="upload" element={<Upload />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
