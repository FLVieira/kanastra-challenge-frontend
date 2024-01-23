import { FileProvider } from '@/context';
import { makeServer } from '@/mock/makeServer';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { Server } from 'miragejs';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Upload } from '.';

const renderScreen = () => {
  render(
    <BrowserRouter>
      <FileProvider>
        <Upload />
        <ToastContainer />
      </FileProvider>
    </BrowserRouter>
  );
};

let server: Server;

beforeEach(() => {
  server = makeServer({ environment: 'test' });
});

afterEach(() => {
  server.shutdown();
});

describe('Upload Component', () => {
  test('Should render the component', () => {
    renderScreen();
    expect(screen.getByText('Upload')).toBeTruthy();
  });

  test('Should allow a file to be selected', async () => {
    // Arrange
    renderScreen();
    const fakeCsvFile = new File(['(⌐□_□)'], 'any_name', {
      type: 'text/csv',
    });
    const input = screen.getAllByLabelText('Choose a file')[0];

    // Act
    await act(async () => {
      fireEvent.change(input, { target: { files: [fakeCsvFile] } });
    });

    // Assert
    await waitFor(() => {
      expect(screen.getByText(fakeCsvFile.name, { exact: false })).toBeTruthy();
      expect(screen.getByText(fakeCsvFile.type, { exact: false })).toBeTruthy();
    });
  });

  test('Should handle upload button click', async () => {
    // Arrange
    renderScreen();
    const fakeCsvFile = new File(['(⌐□_□)'], 'any_name', {
      type: 'text/csv',
    });
    const input = screen.getAllByLabelText('Choose a file')[0];
    await act(async () => {
      fireEvent.change(input, { target: { files: [fakeCsvFile] } });
    });

    // Act
    const uploadButton = screen.getAllByText('Upload the file');
    fireEvent.click(uploadButton[0]);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Uploaded file successfully!')).toBeTruthy();
    });
  });
});
