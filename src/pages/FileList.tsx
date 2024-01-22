import dayjs from "dayjs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFileContext } from "@/context";
import { ReactElement } from "react";

function FileList(): ReactElement {
  const { state: { fileList } } = useFileContext();

  return (
    <>
      <h1 className="text-2xl font-bold pt-5 text-green-800">File List</h1>

      <Table>
        <TableCaption>A list of your files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Upload Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fileList.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">{file.name}</TableCell>
              <TableCell>{dayjs(file.uploadedAt).format('MM/DD/YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export { FileList };
