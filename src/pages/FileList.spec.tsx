import { FileProvider } from "@/context";
import { fakeChargeFilesList } from "@/mock/files";
import { makeServer } from "@/mock/makeServer";
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { Server } from "miragejs";
import { FileList } from ".";

const renderScreen = (
) =>
  render(
    <FileProvider>
      <FileList />
    </FileProvider>
  );

let server: Server;

beforeEach(() => {
  server = makeServer({ environment: 'test' });
});

afterEach(() => {
  server.shutdown();
});

describe('FileList Component', () => {
  test('Should list every file when request is resolved', async () => {
    // Arrange
    renderScreen();

    // Assert
    await waitFor(() => {
      fakeChargeFilesList.forEach(file => {
        expect(screen.getByText(file.name)).toBeTruthy();
      })
    })
  });
})
