import { ChargeFile } from '@/metadata/files';
import { Response, Server } from 'miragejs';

const fakeChargeFilesList: ChargeFile[] = [
  {
    id: 'any_id1',
    name: "file1.csv",
    uploadedAt: "2024-02-01"
  },
  {
    id: 'any_id2',
    name: "file2.csv",
    uploadedAt: "2024-02-15"
  },
  {
    id: 'any_id3',
    name: "file3.csv",
    uploadedAt: "2024-03-10"
  },
  {
    id: 'any_id4',
    name: "file4.csv",
    uploadedAt: "2024-03-20"
  },
  {
    id: 'any_id5',
    name: "file5.csv",
    uploadedAt: "2024-04-05"
  },
  {
    id: 'any_id6',
    name: "file6.csv",
    uploadedAt: "2024-04-12"
  },
  {
    id: 'any_id7',
    name: "file7.csv",
    uploadedAt: "2024-05-06"
  },
  {
    id: 'any_id8',
    name: "file8.csv",
    uploadedAt: "2024-05-21"
  },
  {
    id: 'any_id9',
    name: "file9.csv",
    uploadedAt: "2024-06-03"
  },
  {
    id: 'any_id10',
    name: "file10.csv",
    uploadedAt: "2024-06-17"
  }
];

export const mockChargeFilesRoutes = (server: Server) => {
  server.get('/files/charges', () => {
    return new Response(200, {}, { data: fakeChargeFilesList });
  });

  server.post('/charges', () => {
    return new Response(200, {}, '');
  });
};
